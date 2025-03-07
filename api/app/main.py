from openai import BaseModel
from fastapi import FastAPI, HTTPException
from app.services.chat_service import ChatService

# Inicializar FastAPI e ChatService
app = FastAPI()
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
