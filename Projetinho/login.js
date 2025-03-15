// Função de verificação de login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verifica se as credenciais são para o admin (palolita)
    if (username === "palolita" && password === "2404") {
        // Redireciona para o painel de administração
        window.location.href = "admin.html";
    } else {
        // Redireciona para a página de agendamento de consultas
        window.location.href = "agendar.html";
    }

    // Exibe erro se o login falhar (opcional)
    // document.getElementById('error-message').style.display = 'block';
});
