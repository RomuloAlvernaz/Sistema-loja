const URL = 'http://localhost:3400/produtos';

let modoEdicao = false;

let listaProdutos = [];

let btnAdicionar = document.getElementById('btn-adicionar');
let tabelaProduto = document.querySelector('table>tbody');
let modalProduto = new bootstrap.Modal(document.getElementById("modal-produto"), {});
let tituloModal = document.querySelector('h4.modal-title');

let btnSalvar = document.getElementById('btn-salvar');
let btnCancelar = document.getElementById('btn-cancelar');

let formModal = {
    nome: document.getElementById('nome'),
    valor: document.getElementById('valor'),
    quantidade: document.getElementById('quantidade'),
    observacao: document.getElementById('observacao'),
}

btnAdicionar.addEventListener('click', () => {
    modoEdicao = false;
    tituloModal.textContent = "Adicionar produto";
    limparModalProduto();
    modalProduto.show();
});


btnSalvar.addEventListener('click', () => {

    let produto = obterProdutoDoModal();

    if (!produto.nome || !produto.valor) {
        alert("Nome e valor são obrigatórios!")
        return;
    }

    (modoEdicao) ? atualizarProdutoBackEnd(produto) : adicionarProdutoBackEnd(produto);

});


btnCancelar.addEventListener('click', () => {
    modalProduto.hide();
});


function obterProdutoDoModal() {


    return new Produto({

        nome: formModal.nome.value,
        valor: formModal.valor.value,
        quantidadeEstoque: formModal.quantidade.value,
        observacao: formModal.observacao.value,

    });
}

function obterProdutos() {

    fetch(URL, {
        method: 'GET',
        headers: {
            'Authorization': obterToken()
        }
    })
        .then(response => response.json())
        .then(produtos => {
            listaProdutos = produtos;
            popularTabela(produtos);
        })
        .catch()
}

function editarProduto(nome) {
    modoEdicao = true;
    tituloModal.textContent = "Editar produto";

    let produto = listaProdutos.find(produto => produto.nome == nome);

    atualizarModalProduto(produto);

    modalProduto.show();
}

function atualizarModalProduto(produto) {

    formModal.nome.value = produto.nome;
    formModal.valor.value = produto.valor;
    formModal.quantidade.value = produto.quantidadeEstoque;
    formModal.observacao.value = produto.observacao;
}

function limparModalProduto() {

    formModal.nome.value = "";
    formModal.valor.value = "";
    formModal.quantidade.value = "";
    formModal.observacao.value = "";
}

function deletarProduto(nome) {

    let produto = listaProdutos.find(c => c.nome == nome);

    if (confirm("Tem certeza que deseja deletar o produto " + produto.nome + "?")) {
        deletarProdutoBackEnd(produto);

    }
}

function criarLinhaNaTabela(produto) {
    let tr = document.createElement('tr');

    let tdNome = document.createElement('td');
    let tdValor = document.createElement('td');
    let tdQuantidade = document.createElement('td');
    let tdObservacao = document.createElement('td');
    let tdAcoes = document.createElement('td');


    tdNome.textContent = produto.nome;
    tdValor.textContent = produto.valor;
    tdQuantidade.textContent = produto.quantidadeEstoque;
    tdObservacao.textContent = produto.observacao;


    tdAcoes.innerHTML = `<button onclick="editarProduto(${produto.id})" class="btn btn-outline-primary btn-sm mr3">
                                    Editar
                                </button>
                                <button onclick="deletarProduto(${produto.id})" class="btn btn-outline-danger btn-sm mr3">
                                    Deletar
                                </button>`;

    tr.appendChild(tdNome);
    tr.appendChild(tdValor);
    tr.appendChild(tdQuantidade);
    tr.appendChild(tdObservacao);
    tr.appendChild(tdAcoes);

    tabelaProduto.appendChild(tr);
}

function popularTabela(produtos) {

    tabelaProduto.textContent = "";

    produtos.forEach(produto => {
        criarLinhaNaTabela(produto);
    });
}

function adicionarProdutoBackEnd(produto) {

    fetch(URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': obterToken()
        },
        body: JSON.stringify(produto)
    })
        .then(response => response.json())
        .then(response => {

            let novoProduto = new Produto(response);
            listaProdutos.push(novoProduto);

            popularTabela(listaProdutos);

            modalProduto.hide();

            Swal.fire({
                icon: 'success',
                text: 'Produto cadastrado com sucesso',
                showConfirmButton: false,
                timer: 2000,
            });

        })
        .catch(error => {
            console.log(error)
        })
}

function atualizarProdutoBackEnd(produto) {

    fetch(`${URL}/${produto.nome}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': obterToken()
        },
        body: JSON.stringify(produto)
    })
        .then(response => response.json())
        .then(() => {

            atualizarProdutoNaLista(produto, false);
            modalProduto.hide();

            Swal.fire({
                icon: 'success',
                text: 'Produto atualizado com sucesso',
                showConfirmButton: false,
                timer: 2000,
            });

        })
        .catch(error => {
            console.log(error)
        })
}

function deletarProdutoBackEnd(produto) {

    fetch(`${URL}/${produto.nome}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': obterToken()
        }
    })
        .then(response => response.json())
        .then(() => {

            atualizarProdutoNaLista(produto, true);
            modalProduto.hide();

            Swal.fire({
                icon: 'success',
                text: 'Produto deletado com sucesso',
                showConfirmButton: false,
                timer: 2000,
            });

        })
        .catch(error => {
            console.log(error)
        })
}

function atualizarProdutoNaLista(produto, deletarProduto) {

    let indice = listaProdutos.findIndex((c) => c.nome == produto.nome);

    (deletarProduto)
        ? listaProdutos.splice(indice, 1)
        : listaProdutos.splice(indice, 1, cliente);

    popularTabela(listaProdutos);
}




obterProdutos();

const inputPesquisa = document.getElementById('input-pesquisa');

inputPesquisa.addEventListener('input', () => {
    const termoPesquisa = inputPesquisa.value;
    filtrarProdutosPorTermo(termoPesquisa);
});


