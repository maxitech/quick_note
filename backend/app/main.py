from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import sticky_note_router, notebook_router, settings_router

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sticky_note_router)
app.include_router(notebook_router)
app.include_router(settings_router)

if __name__ == '__main__': 
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000)
