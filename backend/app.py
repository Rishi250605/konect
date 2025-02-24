from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from database import store_data_from_markdown, retrieve_relevant_docs, load_all_markdown_files
from ollama_chat import generate_response
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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

DOCUMENTS_FOLDER = "documents"
os.makedirs(DOCUMENTS_FOLDER, exist_ok=True)

load_all_markdown_files()

# ... rest of your code ... 