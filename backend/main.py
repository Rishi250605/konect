from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import store_data_from_markdown, retrieve_relevant_docs, load_all_markdown_files
from ollama_chat import generate_response
from typing import Optional, List
import os
import logging
from fastapi.responses import JSONResponse

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Konect AI Assistant API",
    description="API for the Konect AI Assistant using RAG model",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    query: str

class ChatResponse(BaseModel):
    response: str
    context_used: bool
    relevant_docs_count: int

DOCUMENTS_FOLDER = "documents"
os.makedirs(DOCUMENTS_FOLDER, exist_ok=True)

@app.on_event("startup")
async def startup_event():
    """Initialize the application on startup."""
    try:
        load_all_markdown_files()
        logger.info("Successfully loaded markdown files")
    except Exception as e:
        logger.error(f"Error loading markdown files: {str(e)}")
        raise

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    """Uploads a markdown file and stores its content in ChromaDB."""
    try:
        if not file.filename.endswith('.md'):
            raise HTTPException(
                status_code=400,
                detail="Only markdown files (.md) are allowed"
            )

        file_path = os.path.join(DOCUMENTS_FOLDER, file.filename)

        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)

        store_data_from_markdown(file_path)
        logger.info(f"Successfully uploaded and stored file: {file.filename}")
        
        return JSONResponse(
            status_code=200,
            content={
                "message": "File uploaded and stored successfully",
                "filename": file.filename
            }
        )
    except Exception as e:
        logger.error(f"Error uploading file: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error uploading file: {str(e)}"
        )

@app.post("/chat/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Fetches relevant Markdown content and generates response using RAG model."""
    try:
        if not request.query.strip():
            raise HTTPException(
                status_code=400,
                detail="Query cannot be empty"
            )

        relevant_docs = retrieve_relevant_docs(request.query)
        has_context = bool(relevant_docs)
        context = "\n".join(relevant_docs) if relevant_docs else "No relevant context found."

        # Improved prompt engineering
        prompt = f"""
        You are Nova, an AI assistant for the Konect platform. Answer the query based on the following information:

        CONTEXT:
        {context}

        QUERY:
        {request.query}

        Provide a concise, accurate, and helpful answer. If the context doesn't contain relevant information,
        provide a general response based on your knowledge about social platforms and community engagement.
        """

        response = generate_response(prompt, context)
        
        logger.info(f"Successfully generated response for query: {request.query[:50]}...")
        
        return ChatResponse(
            response=response,
            context_used=has_context,
            relevant_docs_count=len(relevant_docs)
        )

    except Exception as e:
        logger.error(f"Error processing chat request: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error generating response: {str(e)}"
        )

@app.get("/health")
async def health_check():
    """Check if the API is running and ready to accept requests."""
    try:
        # You might want to add more checks here (e.g., database connection)
        return {
            "status": "healthy",
            "documents_loaded": True,
            "api_version": "1.0.0"
        }
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        raise HTTPException(
            status_code=503,
            detail="Service unhealthy"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 