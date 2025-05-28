"use strict";
var _a;
const addButton = document.getElementById('addBtn');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const emptyMessage = document.createElement('p');
emptyMessage.classList.add('empty-message');
emptyMessage.textContent = 'Chưa có công việc nào! Hãy thêm công việc vào danh sách.';
(_a = document.querySelector('.container')) === null || _a === void 0 ? void 0 : _a.appendChild(emptyMessage);
// Lấy danh sách công việc từ localStorage nếu có
const getTodosFromLocalStorage = () => {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
};
// Lưu danh sách công việc vào localStorage
const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
};
// Hiển thị tất cả các công việc trong danh sách
const renderTodos = () => {
    const todos = getTodosFromLocalStorage();
    todoList.innerHTML = ''; // Xóa danh sách hiện tại
    if (todos.length === 0) {
        emptyMessage.style.display = 'block';
    }
    else {
        emptyMessage.style.display = 'none';
    }
    todos.forEach((todoText, index) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        // HTML của mỗi công việc
        li.innerHTML = `
            <span class="todo-text">${todoText}</span>
            <div class="actions">
                <button class="dots-btn">...</button>
                <div class="action-menu">
                    <button class="editBtn">Sửa</button>
                    <button class="deleteBtn">Xóa</button>
                </div>
            </div>
        `;
        // Lấy các nút xóa và sửa
        const deleteBtn = li.querySelector('.deleteBtn');
        const editBtn = li.querySelector('.editBtn');
        const dotsBtn = li.querySelector('.dots-btn');
        const actionMenu = li.querySelector('.action-menu');
        // Toggle menu khi nhấn vào dấu ba chấm
        dotsBtn.addEventListener('click', () => {
            actionMenu.classList.toggle('show');
        });
        // Xóa công việc
        deleteBtn.addEventListener('click', () => {
            const todos = getTodosFromLocalStorage();
            todos.splice(index, 1); // Xóa công việc khỏi mảng
            saveTodosToLocalStorage(todos); // Lưu lại vào localStorage
            renderTodos(); // Cập nhật lại giao diện
        });
        // Sửa công việc
        editBtn.addEventListener('click', () => {
            todoInput.value = todoText; // Đưa công việc vào input để chỉnh sửa
            const todos = getTodosFromLocalStorage();
            todos.splice(index, 1); // Xóa công việc đang chỉnh sửa khỏi mảng
            saveTodosToLocalStorage(todos); // Lưu lại vào localStorage
            renderTodos(); // Cập nhật lại giao diện
        });
        // Thêm công việc vào danh sách
        todoList.appendChild(li);
    });
};
// Hàm để thêm công việc mới vào danh sách
const addTodo = () => {
    const todoText = todoInput.value.trim();
    if (todoText) {
        const todos = getTodosFromLocalStorage();
        todos.push(todoText); // Thêm công việc vào mảng
        saveTodosToLocalStorage(todos); // Lưu lại vào localStorage
        todoInput.value = ''; // Xóa giá trị input sau khi thêm
        renderTodos(); // Cập nhật lại giao diện
    }
    else {
        alert('Vui lòng nhập công việc!');
    }
};
// Lắng nghe sự kiện click vào nút "Thêm"
addButton.addEventListener('click', addTodo);
// Lắng nghe sự kiện nhấn Enter khi nhập công việc
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});
