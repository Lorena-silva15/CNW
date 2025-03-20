let currentMonth = new Date().getMonth(); // Mês atual
let currentYear = new Date().getFullYear(); // Ano atual
let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || []; // Carregar agendamentos do localStorage

// Função para carregar os horários disponíveis para um dia específico
function loadHorarios(day) {
    const horariosLista = document.getElementById('horarios-lista');
    horariosLista.innerHTML = ''; // Limpa a lista de horários

    // Horários disponíveis (das 7h às 17h com intervalo de meia hora)
    for (let hour = 7; hour <= 17; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            let time = `${hour}:${minute === 0 ? '00' : '30'}`;
            let listItem = document.createElement('li');
            listItem.innerText = time;

            // Verifica se o horário já foi agendado
            const horariosIndisponiveis = agendamentos.filter(agendamento => agendamento.day === day && agendamento.time === time);
            if (horariosIndisponiveis.length > 0) {
                listItem.classList.add('disabled');
                listItem.style.cursor = 'not-allowed'; // Desabilita o clique
            } else {
                listItem.onclick = () => bookAppointment(day, time); // Permite agendar se o horário não estiver ocupado
            }

            horariosLista.appendChild(listItem);
        }
    }
}

// Função para agendar um horário
function bookAppointment(day, time) {
    const cpf = prompt("Digite seu CPF para confirmar o agendamento:");

    if (cpf) {
        // Salva o agendamento no localStorage
        agendamentos.push({ day, time, cpf });
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

        alert(`Agendamento confirmado para o dia ${day} às ${time}.`);

        // Atualiza a lista de horários disponíveis
        loadHorarios(day);
    }
}

// Função para carregar o calendário do mês atual
function loadCalendar() {
    const daysContainer = document.getElementById('days-container');
    const monthName = document.getElementById('month-name');
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    monthName.innerText = monthNames[currentMonth];

    daysContainer.innerHTML = ''; // Limpa o conteúdo dos dias do calendário

    // Preenche os dias da semana (DOM, SEG, TER, etc.)
    const dayLabels = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
    dayLabels.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day-label');
        dayElement.innerText = day;
        daysContainer.appendChild(dayElement);
    });

    // Preenche os dias do mês
    const numDays = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay(); // Dia da semana do primeiro dia do mês

    // Coloca os espaços em branco antes do primeiro dia do mês
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.classList.add('day');
        daysContainer.appendChild(emptyDay);
    }

    // Preenche os dias do mês
    for (let i = 1; i <= numDays; i++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.innerText = i;

        // Verifica se o dia é passado
        const date = new Date(currentYear, currentMonth, i);
        if (date < new Date()) {
            dayElement.classList.add('disabled'); // Desabilita dias passados
        }

        // Ao clicar no dia, carrega os horários
        dayElement.onclick = () => {
            if (!dayElement.classList.contains('disabled')) {
                loadHorarios(i);
            }
        };

        daysContainer.appendChild(dayElement);
    }
}

// Carrega o calendário ao iniciar
window.onload = loadCalendar;
