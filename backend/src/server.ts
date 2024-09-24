import express from 'express';
import multer from 'multer';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const apiKey = process.env.API_KEY_CHATGPT;
const app = express();
const upload = multer({ dest: 'uploads/' });

// Função para chamar a API do ChatGPT
const chatGPTRequest = async (prompt: string): Promise<string> => {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo-16k',
        prompt: prompt,
        max_tokens: 500,
    }, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    });

    return response.data.choices[0].text;
};

// Rota para upload de arquivos
app.post('/upload', upload.single('file'), async (req, res) => { // Adicione req e res aqui
    const file = req.file;
    if (!file) {
        return res.status(400).send("Nenhum arquivo enviado.");
    }

    // Chama o serviço de processamento de arquivos Python
    try {
        const response = await axios.post('http://file-processor:5000/process-file', {
            filePath: file.path,
            fileType: file.mimetype
        });

        const fileContent = response.data.content;  // conteúdo do arquivo processado
        
        // Chama a API do ChatGPT com o conteúdo do arquivo
        const chatGPTResponse = await chatGPTRequest(fileContent);

        // Retorna o conteúdo do arquivo e a resposta do ChatGPT
        res.send({
            content: fileContent,
            response: chatGPTResponse
        });
        
    } catch (error) {
        console.error("Erro ao processar o arquivo: ", error);
        res.status(500).send("Erro ao processar o arquivo.");
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
