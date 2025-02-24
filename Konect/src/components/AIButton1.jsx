import React from 'react';
import styled from 'styled-components';

const AIButton1 = ({ children, onClick, className }) => {
    return (
        <StyledWrapper className={className}>
            <button className="button" onClick={onClick}>
                {children}
            </button>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .button {
        background: linear-gradient(140.14deg, #ec540e 15.05%, #d6361f 114.99%)
            padding-box,
            linear-gradient(142.51deg, #ff9465 8.65%, #af1905 88.82%) border-box;
        border-radius: 7px;
        border: 2px solid transparent;

        text-shadow: 1px 1px 1px #00000040;
        box-shadow: 8px 8px 20px 0px #45090059;

        padding: 10px 40px;
        line-height: 20px;
        cursor: pointer;
        transition: all 0.3s;
        color: white;
        font-size: 18px;
        font-weight: 500;
    }

    .button:hover {
        box-shadow: none;
        opacity: 80%;
    }
`;

export default AIButton1; 