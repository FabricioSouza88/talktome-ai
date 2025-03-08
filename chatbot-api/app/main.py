from openai import BaseModel
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.services.chat_service import ChatService

# Inicializar FastAPI e ChatService
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:7000", "https://fabriciosouza88.github.io"],
    allow_credentials=True,
    allow_methods=["POST", "GET", "OPTIONS", "HEAD"],
    allow_headers=["*"],
)
chat_service = ChatService()

class QuestionRequest(BaseModel):
    question: str

@app.post("/chat")
async def chat(request: QuestionRequest):
    """Receive a question and returns a response based on embeddings."""
    try:
        response = chat_service.get_response(request.question)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
