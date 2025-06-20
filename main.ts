const addTaskButton = document.getElementById('add-task') as HTMLButtonElement;
const taskInput = document.getElementById('new-task') as HTMLInputElement;
const taskList = document.getElementById('task-list') as HTMLUListElement;
//TU ĐU LÍT NHA MẠY
function addTask(   ) {
    const taskText=taskInput.value.trim();
    if(taskText !==''){
        const taskElement = document.createElement(taskText);
        taskList.appendChild(taskElement);
        taskInput.value = '';
    }
}

function createTaskElement() {
    const taskText: string = taskInput.value.trim();

    if (taskText !== '') {
        const li: HTMLLIElement = document.createElement('li');
        li.className='todo-item';
        const span: HTMLSpanElement = document.createElement('span');
        span.className = 'task-text';
        span.textContent = taskText;

        const actions = document.createElement('div');
        actions.className = 'actions';

        const dotsBtn = document.createElement('button');
        dotsBtn.className = 'dots-btn';
        dotsBtn.textContent = '...';

        const actionMenu = document.createElement('div');
        actionMenu.className = 'action-menu';

        const editBtn= document.createElement('button');
        editBtn.className = 'editBtn';
        editBtn.textContent = 'Edit';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'deleteBtn';
        deleteBtn.textContent = 'Delete';

        const addDateBtn = document.createElement('button');
        addDateBtn.className = 'addDateBtn';
        addDateBtn.textContent = 'Add Date';

        addDateBtn.addEventListener('click', () => {
            const dateInput = document.createElement('input');
            dateInput.type = 'date';
            dateInput.className = 'task-date';
            dateInput.style.marginTop = '8px';

            dateInput.addEventListener('change', () => {
                const dateValue = dateInput.value;
                if (dateValue) {
                    const dateSpan = document.createElement('span');
                    dateSpan.className = 'date-display';
                    dateSpan.textContent = ` ${dateValue}`;
                    dateSpan.style.marginLeft = '10px';
                    dateSpan.style.fontSize = '14px';
                    dateSpan.style.color = '#666';

                    li.appendChild(dateSpan);
                    dateInput.remove();
                }
            });
            li.appendChild(dateInput);
        });

        actionMenu.appendChild(editBtn);
        actionMenu.appendChild(deleteBtn);
        actionMenu.appendChild(addDateBtn);
        actions.appendChild(dotsBtn);
        actions.appendChild(actionMenu);

        li.appendChild(span);
        li.appendChild(actions);

        taskList.appendChild(li);

        taskInput.value = '';

        dotsBtn.addEventListener('click', () => {
            actionMenu.classList.toggle('show');
        })

        deleteBtn.addEventListener('click', () => {
            li.remove();
        })

        editBtn.addEventListener('click', () => {
            taskInput.value = span.textContent || '';
            li.remove();
        })

    }
}
addTaskButton.addEventListener('click', createTaskElement);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        createTaskElement();
    }
});


//NAVIGATION BAR NHA MAY
const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', (e: Event) => {
        e.preventDefault();

        const target = e.target as HTMLAnchorElement;
        const sectionId = target.getAttribute('data-section');
        if (!sectionId) return;


        const allSections = document.querySelectorAll('section');
        allSections.forEach(section => {
            (section as HTMLElement).style.display = 'none';
        });


        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.style.display = 'block';
        }
    });
});


//CALENDAR NHA MẠY

const yearSelect = document.getElementById('year-select') as HTMLSelectElement;
const calendarContainer = document.getElementById('calendar-container') as HTMLDivElement;


for (let y = 1900; y <= 2100; y++) {
    const option = document.createElement('option');
    option.value = y.toString();
    option.textContent = y.toString();
    yearSelect.appendChild(option);
}


const currentYear = new Date().getFullYear();
yearSelect.value = currentYear.toString();
generateCalendar(currentYear);


yearSelect.addEventListener('change', () => {
    const year = parseInt(yearSelect.value);
    generateCalendar(year);
});

function generateCalendar(year: number) {
    calendarContainer.innerHTML = ''; // clear
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];

    for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday

        const monthDiv = document.createElement('div');
        monthDiv.className = 'month';

        const title = document.createElement('h3');
        title.textContent = monthNames[month];
        monthDiv.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'calendar-grid';

        const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        dayNames.forEach(day => {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day-header';
            dayDiv.textContent = day;
            grid.appendChild(dayDiv);
        });


        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement('div');
            grid.appendChild(empty);
        }


        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            dayDiv.textContent = day.toString();
            grid.appendChild(dayDiv);
        }

        monthDiv.appendChild(grid);
        calendarContainer.appendChild(monthDiv);
    }
}
