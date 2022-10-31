
const addToDo = document.querySelector('#addToDo');
const todoInput = document.querySelector('input');
const todoList = document.querySelector('#todo-list');
const todoContainer = document.querySelector('#todo-container');


addToDo.addEventListener('click', (e) => {
    e.preventDefault();
    let todoText = todoInput.value;

    if (todoText === '') {
        alert("add a task ya lazy dawg")
        console.log('no tekst inserted');
        return;
    } else {
        postData(todoText);
    }
    setTodoList();

    todoInput.value = '';
});

const setTodoList = async () => {
    todoList.innerHTML = '';
    try {
        const todoItems = await getData();
        todoItems.forEach((item) => {
            let newItem = {
                description: item.description,
                id: item._id,
                done: item.done,
            };

            const newTodo = document.createElement('div');
            newTodo.classList.add('todo');

            const todoContent = document.createElement('div');
            todoContent.classList.add('todo-item');

            newTodo.appendChild(todoContent);

            const todoTextInput = document.createElement('input');
            todoTextInput.classList.add('text');
            todoTextInput.type = 'text';
            todoTextInput.value = newItem.description;
            todoTextInput.setAttribute('readonly', 'readonly');

            todoContent.appendChild(todoTextInput);

            const buttons = document.createElement('div');
            buttons.classList.add('buttons');

            const changeButton = document.createElement('button');
            changeButton.innerHTML =
                '<i class="fa-sharp fa-solid fa-pen-to-square"></i>';
            changeButton.className = 'change-btn';
            const completedButton = document.createElement('button');
            completedButton.innerHTML = '<i class="fas fa-thumbs-up"></i>';
            completedButton.className = 'complete-btn';
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
            deleteButton.className = 'delete-btn';
            buttons.appendChild(changeButton);
            buttons.appendChild(completedButton);
            buttons.appendChild(deleteButton);

            newTodo.appendChild(buttons);

            todoList.appendChild(newTodo);

            changeButton.addEventListener('click', () => {
                if (
                    changeButton.innerHTML ===
                    '<i class="fa-sharp fa-solid fa-pen-to-square"></i>'
                ) {
                    todoTextInput.removeAttribute('readonly');
                    todoTextInput.focus();
                    changeButton.innerHTML = '<i class="fa-solid fa-floppy-disk"></i>';
                } else if (
                    changeButton.innerHTML === '<i class="fa-solid fa-floppy-disk"></i>'
                ) {
                    let changeText = todoTextInput.value;
                    let id = item._id;
                    changeData(changeText, id);
                    todoTextInput.setAttribute('readonly', 'readonly');
                    changeButton.innerHTML =
                        '<i class="fa-sharp fa-solid fa-pen-to-square"></i>';
                }
            });

            completedButton.addEventListener('click', () => {
                if (newItem.done === false) {
                    todoTextInput.classList.toggle('completed');
                    id = item._id;
                    done = item.done;
                    console.log(id, done);
                    completeData(done, id);
                } else if (newItem.done === true) {
                    todoTextInput.classList.toggle('completed');
                    id = item._id;
                    done = item.done;
                    newItem.done = false;
                    console.log(id, done);
                }
            });

            deleteButton.addEventListener('click', () => {
                deleteData(newItem.id);
                todoList.removeChild(newTodo);
            });
        });
    } catch (error) {
        console.log(error);
    }
};
document.addEventListener('DOMContentLoaded', setTodoList);