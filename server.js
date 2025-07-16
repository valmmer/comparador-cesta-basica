// importa a biblioteca Express
const express = require("express");

// cria uma instância do Express
const app = express();

// define a porta em que o servidor vai rodar
const PORT = 3000;

// inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// serve os arquivos estáticos da pasta "public"
app.use(express.static("public"));

// permite que o servidor entenda JSON nas requisições
app.use(express.json());

// dados simulados com preços por cidade
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

// rota para receber a cidade e responder com os preços formatados
app.post("/buscar-precos", (req, res) => {
  const { cidade } = req.body;

  console.log("Cidade recebida no backend:", cidade);

  const produtos = precosCesta[cidade];

  // valida se a cidade existe
  if (!produtos) {
    return res.status(404).json({ erro: "Cidade não encontrada." });
  }

  // monta HTML com os dados da cesta básica
  let html = `<h2>Cesta básica em <span style="text-transform: capitalize;">${cidade}</span>:</h2>`;

  produtos.forEach((item, index) => {
    html += `<p><strong>${
      item.produto
    }:</strong> ${item.preco.toLocaleString()} Gs</p>`;
    if (index < produtos.length - 1) {
      html += `<hr>`;
    }
  });

  // responde com o HTML como mensagem
  res.json({ mensagem: html });
});
