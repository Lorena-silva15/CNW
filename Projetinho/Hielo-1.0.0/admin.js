window.onload = function() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

    // Exibe a lista de pacientes registrados
    let userListHTML = '<ul>';
    users.forEach((user, index) => {
        userListHTML += `
            <li>
                <strong>Nome:</strong> ${user.fullName} - ${user.cpf}<br> 
                <strong>Telefone:</strong> ${user.phone}<br>
                <strong>Endereço:</strong> ${user.address}<br>
                <strong>Agendamentos:</strong><br>
                <ul>`;

        const userAgendamentos = agendamentos.filter(agendamento => agendamento.cpf === user.cpf);

        if (userAgendamentos.length > 0) {
            userAgendamentos.forEach(agendamento => {
                userListHTML += `
                    <li>Data: ${agendamento.data} - Hora: ${agendamento.hora}</li>`;
            });
        } else {
            userListHTML += "<li>Não há consultas agendadas.</li>";
        }

        // Botões para editar e excluir o usuário
        userListHTML += `
            <button onclick="editarUsuario(${index})">Editar</button>
            <button onclick="excluirUsuario(${index})">Excluir</button>
            </ul></li>`;
    });
    userListHTML += '</ul>';
    document.getElementById('user-list').innerHTML = userListHTML;
};

// Função para editar as informações do usuário
function editarUsuario(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users[index];

    const novoNome = prompt("Novo nome:", user.fullName);
    const novoTelefone = prompt("Novo telefone:", user.phone);
    const novoEndereco = prompt("Novo endereço:", user.address);

    if (novoNome && novoTelefone && novoEndereco) {
        users[index].fullName = novoNome;
        users[index].phone = novoTelefone;
        users[index].address = novoEndereco;

        localStorage.setItem('users', JSON.stringify(users));
        alert("Informações atualizadas com sucesso!");
        window.location.reload();
    }
}

// Função para excluir o usuário
function excluirUsuario(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

    // Exclui o usuário e seus agendamentos
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));

    const cpfUsuario = users[index].cpf;
    const novosAgendamentos = agendamentos.filter(agendamento => agendamento.cpf !== cpfUsuario);
    localStorage.setItem('agendamentos', JSON.stringify(novosAgendamentos));

    alert("Usuário excluído com sucesso!");
    window.location.reload();
}
