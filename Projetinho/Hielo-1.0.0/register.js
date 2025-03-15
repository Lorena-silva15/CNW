document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtendo os valores do formulário
    const fullName = document.getElementById('full-name').value;  // Adicionando o nome completo
    const cpf = document.getElementById('cpf').value;
    const password = document.getElementById('password').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificando se o CPF já está registrado
    const userExists = users.some(user => user.cpf === cpf);

    if (userExists) {
        // Se o CPF já existir, exibe a mensagem de erro
        alert("Este CPF já está registrado!");
    } else {
        // Caso contrário, registra o novo usuário
        users.push({
            fullName,  // Armazenando o nome completo
            cpf,
            password,
            age,
            gender,
            phone,
            address
        });
        localStorage.setItem('users', JSON.stringify(users));

        // Exibe uma confirmação e redireciona para o login
        alert('Usuário cadastrado com sucesso!');
        window.location.href = 'login.html';  // Redireciona para a página de login
    }
    
});
