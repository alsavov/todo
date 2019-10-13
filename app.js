class TodoList {
  constructor () {
    this.todos = new Map();
    this.todoContainer = document.querySelector('todo-body');
    this.todoList = document.querySelector('.todo-list');
    this.todoInput = document.querySelector('.todoInput');
    this.removeButton = document.querySelector('.removeText');
    this.bindEvents();
  }

  bindEvents () {
    this.todoInput.onkeyup = (e) => {
      if (e.keyCode === 13) {
        this.addTodo(e.target.value);
        this.todoInput.value = "";
      }
    }

    this.todoList.onmouseup = (e) => {
      if (e.target.checked !== undefined) {
        let id = e.target.getAttribute('data-key');
        this.markTodo(id, e.target.checked);
      }
    }

    this.removeButton.onclick = this.clean.bind(this);
  }

  markTodo(id, isChecked) {
    let obj = this.todos.get(id);
    obj.checked = !isChecked;
    this.todos.set(id, obj);
    this.render();
  }

  addTodo(text = "Blank Task") {
    let id = Date.now() + "";
    this.todos.set(id, {
      id: id,
      text: text,
      checked: false
    });
    this.render();
  }

  clean() {
    this.todos.forEach((todo, key) => {
      if (todo.checked) {
        this.todos.delete(key)
      }
    });
    this.render();
  }

  template(item, id) {
    return (`<li class="todo-item ${(item.checked ? "checked" : "")}"
    data-key="${id}"><input type="checkbox" data-key="${id}" ${(item.checked ?
    "checked" : "")}/> ${ item.text } </li>`)
  }

  render() {
    let todoElements = [];
    this.todos.forEach((item, key) => {
      todoElements.push(this.template(item, key))
    });
    this.todoList.innerHTML = todoElements.join(" ")
  }
}

if (document.readyState === "complete" || document.addEventListener) {
  const List = new TodoList();
}