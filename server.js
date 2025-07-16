// importa a biblioteca Express para dentro do seu arquivo.
const express = require("express");

// instância do Express, que chamamos de app
const app = express();

// servidor vai rodar na porta 3000.
const PORT = 3000;

// inicia o servidor escutando na porta definida.
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// serve os arquivos estáticos da pasta "public"
app.use(express.static("public"));

// permite que o Express entenda JSON no corpo das requisições
app.use(express.json());

// dados simulados de preços da cesta básica por cidade
const precosCesta = {
  assuncao: [
    { produto: "Arroz", preco: 8000 },
    { produto: "Feijão", preco: 7500 },
    { produto: "Óleo", preco: 12000 },
    { produto: "Leite", preco: 8500 },
  ],
  "ciudad-del-este": [
    { produto: "Arroz", preco: 7900 },
    { produto: "Feijão", preco: 7600 },
    { produto: "Óleo", preco: 11800 },
    { produto: "Leite", preco: 8700 },
  ],
  encarnacion: [
    { produto: "Arroz", preco: 8200 },
    { produto: "Feijão", preco: 7400 },
    { produto: "Óleo", preco: 12500 },
    { produto: "Leite", preco: 8600 },
  ],
};

// Rota POST para receber a cidade do frontend
app.post("/buscar-precos", (req, res) => {
  const { cidade } = req.body;

  console.log("Cidade recebida no backend:", cidade);

  const produtos = precosCesta[cidade];

  // Verifica se a cidade existe no objeto de preços
  if (!produtos) {
    return res.status(404).json({ erro: "Cidade não encontrada" });
  }

  // Responde com os produtos e cidade
  res.json({ cidade, produtos });
});
