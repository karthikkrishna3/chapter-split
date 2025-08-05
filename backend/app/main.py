from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from .split import split_docx

app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

# ✅ NEW: serve files
app.mount("/output", StaticFiles(directory="output"), name="output")

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    filename = file.filename
    contents = await file.read()
    os.makedirs("output", exist_ok=True)
    with open(f"output/{filename}", "wb") as f:
        f.write(contents)
    output_dir = split_docx(f"output/{filename}")
    chapter_files = [f"{output_dir}/{f}" for f in os.listdir(output_dir)]
    return {"chapter_files": chapter_files}

