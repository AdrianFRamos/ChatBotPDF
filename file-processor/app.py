from flask import Flask, request, jsonify
from docx import Document # type: ignore
from pdfminer.high_level import extract_text # type: ignore

app = Flask(__name__)

# Processamento de arquivo
@app.route('/process-file', methods=['POST'])
def process_file():
    data = request.get_json()
    file_path = data['filePath']
    file_type = data['fileType']

    # Extração de texto
    if 'pdf' in file_type:
        text = extract_text(file_path)
    elif 'word' in file_type:
        doc = Document(file_path)
        text = '\n'.join([para.text for para in doc.paragraphs])
    else:
        return jsonify({"error": "Formato de arquivo não suportado."}), 400

    return jsonify({"content": text})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
