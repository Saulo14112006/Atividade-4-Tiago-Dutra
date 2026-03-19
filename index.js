const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Nosso "Banco de Dados" de Filmes
let filmes = [];

// 1. Endpoint de Boas-vindas
app.get('/', (req, res) => {
    res.json({ mensagem: 'API de Filmes - Trabalho Aula 04' });
});

// 2. Endpoint GET: Listar todos os filmes
app.get('/filmes', (req, res) => {
    res.status(200).json(filmes);
});

// 3. Endpoint POST: Cadastrar filme (O CORAÇÃO DO TRABALHO)
app.post('/filmes', (req, res) => {
    const { titulo, diretor, ano } = req.body;

    // --- VALIDAÇÕES COMPLETAS ---
    if (!titulo || !diretor || !ano) {
        return res.status(400).json({ 
            erro: "Dados incompletos", 
            mensagem: "Título, Diretor e Ano são obrigatórios!" 
        });
    }

    if (isNaN(ano) || ano < 1895) {
        return res.status(400).json({ 
            erro: "Ano inválido", 
            mensagem: "O ano deve ser um número válido após 1895." 
        });
    }

    // Criando o recurso
    const novoFilme = {
        id: filmes.length + 1,
        titulo,
        diretor,
        ano
    };

    filmes.push(novoFilme);

    // Resposta 201 Created
    res.status(201).json(novoFilme);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});