class Produto {
    constructor(obj) {
        obj = obj || {};

        this.nome = obj.nome;
        this.valor = obj.valor;
        this.quantidadeEstoque = obj.quantidadeEstoque;
        this.observacao = obj.observacao;
    }
}