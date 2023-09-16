let email = document.getElementById('email');
let senha = document.getElementById('senha');
let btnEntrar = document.getElementById('btn-entrar');

const emailBanco = "admin@admin.com";
const senhaBanco = "123321";


btnEntrar.addEventListener('click', () => {

    let userEmail = email.value;
    let userSenha = senha.value;

    if (!userEmail || !userSenha){

       alert("Os campos de e-mail e senha são obrigatórios");
       return;
    }

    autenticar(userEmail, userSenha);

});

function autenticar(email, senha){
    const urlBase = `http://localhost:3400`;

    fetch(`${urlBase}/login`, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, senha})
    })
    .then(response => response = response.json())
    .then(response => {
        if (!!response.mensagem){
            alert(response.mensagem);
            return;
        }else{

            salvarToken(response.token);
            salvarUsuario(response.usuario);
            
            window.open('controle-cliente.html', '_self');
            
        }
    });
}

function salvarToken(token){
    localStorage.setItem('token', token);
}

function salvarUsuario(usuario){
    localStorage.setItem('usuario', JSON.stringify(usuario));
}