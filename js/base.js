

function salvarToken(token){
    localStorage.setItem('token', token);
}

function salvarUsuario(usuario){
    localStorage.setItem('usuario', JSON.stringify(usuario));
}
 
function obterToken(){
    return localStorage.getItem("token");
}

function obterUsuario(){
    return localStorage.getItem("usuario") || "{}";
}

function sairSistema(){
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    direcionarTelaDeLogin();
}

function direcionarTelaDeLogin(){
    window.open('login.html', '_self');
}

function usuarioEstaLogado(){
    let token = obterToken();

    return !!token;
}

function validarUsuarioAutenticado(){

    let logado = usuarioEstaLogado();

    if(window.location.pathname == "/login.html"){
        if(logado){
            window.open("controle-cliente.html", '_self')
        }
    }else if(!logado && window.location.pathname == "/controle-cliente.html"){
        direcionarTelaDeLogin(); 
    }
    
}

validarUsuarioAutenticado(); 


function filtrarClientesPorTermo(termo) {
    const termoPesquisa = termo.toLowerCase();

    const clientesFiltrados = listaClientes.filter(cliente => {
        return (
            cliente.nome.toLowerCase().includes(termoPesquisa) ||
            cliente.cpfOuCnpj.includes(termoPesquisa) ||
            cliente.email.toLowerCase().includes(termoPesquisa) ||
            cliente.telefone.toLowerCase().includes(termoPesquisa) ||
            cliente.id.toString().includes(termoPesquisa)
        );
    });

    popularTabela(clientesFiltrados);
}

function filtrarProdutosPorTermo(termo) {
    const termoPesquisa = termo.toLowerCase();

    const produtosFiltrados = listaProdutos.filter(produto => {
        return (
            produto.nome.toLowerCase().includes(termoPesquisa) ||
            (typeof produto.valor === 'string' && produto.valor.includes(termoPesquisa)) ||
            (typeof produto.quantidade === 'string' && produto.quantidade.includes(termoPesquisa)) ||
            produto.observacao.toLowerCase().includes(termoPesquisa)
          
        );
    });

    popularTabela(produtosFiltrados);
}