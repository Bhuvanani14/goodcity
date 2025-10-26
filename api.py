"""
City AI Assistant API - Telangana/Hyderabad
FastAPI server with predefined responses for city issues
No external AI API needed - uses static knowledge base
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import uvicorn

# Import our knowledge base
from city_knowledge_base import get_response, get_all_contacts

app = FastAPI(title="City AI Assistant - Telangana/Hyderabad")

# Configure CORS to allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Data schemas
class ChatRequest(BaseModel):
    input: str = Field(..., description="User message", max_length=1024)


class ChatResponse(BaseModel):
    reply: str
    model: str = "City Knowledge Base - Telangana/Hyderabad"


@app.get("/")
async def root():
    """Health endpoint"""
    return {
        "status": "ok",
        "service": "City AI Assistant",
        "model": "Static Knowledge Base - Telangana/Hyderabad",
        "location": "Ameerpet, Hyderabad",
        "version": "2.0-Static"
    }


@app.get("/contacts")
async def contacts():
    """Get all important contacts"""
    return {
        "contacts": get_all_contacts()
    }


@app.post("/api/ai", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    AI Chat endpoint - receives user input and returns helpful guidance
    Uses static knowledge base with Telangana/Hyderabad-specific information
    
    Example queries:
    - "There is a pothole on my street"
    - "Broken streetlight"
    - "Water supply issue"
    - "Garbage not collected"
    """
    # Validate input
    if not request.input or len(request.input.strip()) == 0:
        raise HTTPException(status_code=400, detail="Input cannot be empty")
    
    try:
        print(f"📝 Received query: {request.input[:50]}...")
        
        # Get response from knowledge base
        response_text = get_response(request.input)
        
        print(f"✅ Found matching response ({len(response_text)} chars)")
        
        return ChatResponse(
            reply=response_text,
            model="City Knowledge Base - Telangana/Hyderabad"
        )
        
    except Exception as e:
        print(f"❌ Error processing request: {e}")
        # Return a fallback response
        return ChatResponse(
            reply=get_response(""),  # This will return the general response
            model="City Knowledge Base - Telangana/Hyderabad"
        )


if __name__ == "__main__":
    print("🚀 Starting City AI Assistant API...")
    print("📍 Location: Telangana/Hyderabad")
    print("📌 Endpoint: http://localhost:8000")
    print("📝 Documentation: http://localhost:8000/docs")
    print("💡 Using Static Knowledge Base (No external AI API needed)")
    uvicorn.run(app, host="0.0.0.0", port=8000)
