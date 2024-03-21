import './style.css'
import './utils/bling'


function app(){
  let state = { id: 0, todos: []}
  let ui = {
    input: $('input'),
    form: $('form')
  }
  return mk('div', { id: "app" }, [
    mk('h1', null, ['Todo App: My version']),
    ( ui.form = mk('form', { id: 'form' }, [
      ( ui.input = mk('input', { className: 'todo', type: 'text', id: 'todo', placeholder: 'Enter a todo' })),
      mk('button', { type: 'submit', id: 'submit', onclick: add }, ['Add Todo'])
    ])),
    (ui.todos = mk('ul', { id: 'todos', className: 'todos'}))
  ]);

  function createTodo(todo) {
    let text, item

    item = mk('li', { className: 'todo-item', id: `${todo.id}` }, [
      ( text = mk('span', {}, [todo.text])),
      mk('button', { className: "todoBtn edit_btn", id: `${todo.id}`, onclick: editTodo }, ['Edit']),
      mk('button', { className: "todoBtn", id: `${todo.id}`, onclick: deleteTodo }, ['Delete'])
    ])
    return item
  }

  function add(event) {
    event.preventDefault()

    const text = ui?.input.value

    if(!text) return

    const todo = { text, completed: false, id: Date.now() }
    console.log(todo)

    // ui.input.value = '';
    state.id = todo.id
    state.todos.push(todo)

    ui?.todos.prepend(createTodo(todo))
    console.log(state.todos)

  }


  function editTodo() {
    const editBtn = this
    let item = this.parentNode
    let itemId = item.id
    const taskToEdit = item.childNodes[0]
    // console.log(editBtn)
    const targetItem = state.todos.find((entries) => entries.id === parseInt(itemId))
    if(targetItem.completed === false) {
      taskToEdit.contentEditable = true
      taskToEdit.focus()
      editBtn.textContent = 'Save'
    }

    taskToEdit.addEventListener("blur", function() {
      // e.preventDefault()
      // taskToEdit.contentEditable = false
      editBtn.textContent = 'Edit'
      targetItem.text = taskToEdit.textContent
      console.log(state.todos)
    })
  }

  function deleteTodo(e) {
    e.preventDefault()
    let item = this.parentNode
    let itemId = item.id
    const targetIndex = state.todos.findIndex((entries) => entries.id === parseInt(itemId))
    if (targetIndex === -1){
      return console.log('item not found in state')
    }
    // console.log(targetIndex)
    state.todos.splice(targetIndex, 1)
    item.remove()
    console.log(state.todos)
    // return console.log(ui.todos)
  }

  
}

function render() {
  document.body.prepend(app())
}

render()