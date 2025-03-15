// Função para gerar o calendário
function generateCalendar(month, year) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay(); // dia da semana do primeiro dia do mês
    const calendar = document.querySelector('.days');
    const monthName = document.querySelector('.month h2');
    
    // Limpar o calendário antes de preencher
    calendar.innerHTML = '';

    // Preencher os dias da semana
    const dayLabels = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
    dayLabels.forEach(label => {
        const dayLabel = document.createElement('div');
        dayLabel.classList.add('day-label');
        dayLabel.textContent = label;
        calendar.appendChild(dayLabel);
    });

    // Preencher os dias do mês
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day', 'disabled');
        calendar.appendChild(emptyDay);
    }

    // Gerar os dias do mês e verificar se são sábado, domingo ou agendados
    const today = new Date().getDate();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');

        const currentDate = new Date(year, month, day);
        const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6; // Sábado ou Domingo
        const isPast = currentDate < new Date(); // Verifica se é um dia no passado

        // Definir o texto do dia
        dayElement.textContent = day;

        // Marcar o dia com estilo diferente caso seja fim de semana ou já tenha passado
        if (isWeekend || isPast) {
            dayElement.classList.add('disabled');
        }

        // Adicionar evento de clique apenas para dias disponíveis
        if (!isWeekend && !isPast) {
            dayElement.addEventListener('click', function () {
                selectDay(day);
            });
        }

        calendar.appendChild(dayElement);
    }

    monthName.textContent = getMonthName(month);
}

// Função para selecionar o dia
function selectDay(day) {
    const days = document.querySelectorAll('.day');
    days.forEach(d => d.classList.remove('selected'));

    const selectedDay = Array.from(days).find(d => d.textContent == day);

    // Verifica se o dia está disponível para ser selecionado
    if (selectedDay.classList.contains('disabled')) {
        displayErrorMessage("Este dia não pode ser selecionado.");
        return;
    }

    selectedDay.classList.add('selected');
    
    // Exibir os horários disponíveis
    showAvailableTimes(day);
}

// Função para mostrar os horários disponíveis
function showAvailableTimes(day) {
    const horariosLista = document.getElementById('horarios-lista');
    horariosLista.innerHTML = ''; // Limpar lista

    const availableTimes = ['07:00', '07:30', '08:00', '08:30','09:00', '09:30', '10:00', '10:30','11:00', '11:30', '12:00', '12:30','13:00', '13:30', '14:00', '14:30','15:00', '15:30', '16:00', '16:30','17:00']; // Exemplos de horários
    availableTimes.forEach(time => {
        const li = document.createElement('li');
        li.textContent = `Dia ${day} - ${time}`;
        li.addEventListener('click', function () {
            selectTime(day, time); // Seleciona o horário
        });
        horariosLista.appendChild(li);
    });
}

// Função para selecionar o horário
function selectTime(day, time) {
    const user = JSON.parse(localStorage.getItem('user')) || {}; // Assumindo que o usuário foi armazenado no localStorage
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

    // Criar o objeto de agendamento
    const agendamento = {
        cpf: user.cpf, // Associando o agendamento ao usuário
        data: `${day}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`, // Formato dd/mm/aaaa
        hora: time
    };

    // Salvar o agendamento
    agendamentos.push(agendamento);
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

    alert(`Agendamento confirmado para o dia ${day}/${new Date().getMonth() + 1} às ${time}.`);

   
}

// Função para exibir mensagem de erro
function displayErrorMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;
    document.querySelector('.container').appendChild(messageElement);

    // Remover a mensagem após 5 segundos
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Gerar o calendário para o mês atual
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
generateCalendar(currentMonth, currentYear);
