// script.js

// Seleciona o formulário pelo id "formulario-cidade" e adiciona um ouvinte para o evento de submit
document
  .getElementById("formulario-cidade")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário (recarregar a página)

    // Pega o valor selecionado no select com id "cidade"
    const cidadeSelecionada = document.getElementById("cidade").value;

    // Se nenhum valor foi selecionado, exibe alerta e interrompe
    if (!cidadeSelecionada) {
      alert("Por favor, selecione uma cidade.");
      return;
    }

    console.log("Cidade enviada:", cidadeSelecionada);

    // Envia a requisição POST para o backend
    fetch("/buscar-precos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indica que o corpo é JSON
      },
      body: JSON.stringify({ cidade: cidadeSelecionada }), // Converte o objeto JS para JSON
    })
      .then((response) => response.json()) // Converte a resposta em JSON
      .then((data) => {
        console.log("Resposta do backend:", data);

        if (data.erro) {
          // Se o backend retornou um erro, exibe a mensagem de erro
          document.getElementById("resultado").innerText = data.erro;
          return;
        }

        // Monta a string para exibir a lista de produtos e preços
        let saida = `Cesta básica em ${data.cidade}:\n`;

        data.produtos.forEach((item) => {
          saida += `- ${item.produto}: ${item.preco} Gs\n`;
        });

        // Atualiza a div "resultado" com o texto formatado
        document.getElementById("resultado").innerText = saida;
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
        document.getElementById("resultado").innerText =
          "Erro ao buscar os preços.";
      });
  });
