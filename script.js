const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

let todos = [];

todoForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const text = todoInput.value.trim();

  if (!text) return;

  const task = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  todos.push(task);
  renderTodo(task);
  saveTodos();
  todoInput.value = '';
});

function renderTodo(task) {
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.dataset.id = task.id;

  // Чекбокс + текст
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;

  const span = document.createElement('span');
  span.textContent = task.text;

  if (task.completed) {
    span.classList.add('completed');
  }

  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    span.classList.toggle('completed', task.completed);
    saveTodos();
  });

  label.appendChild(checkbox);
  label.appendChild(span);
  li.appendChild(label);

  // Кнопка удаления
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '❌';

  deleteButton.addEventListener('click', () => {
    todos = todos.filter(t => t.id !== task.id);
    li.remove();
    saveTodos();
  });

  li.appendChild(deleteButton);

  // Добавляем задачу в список
  todoList.appendChild(li);
}

