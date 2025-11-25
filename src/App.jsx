import { EditModal } from "./components/EditModal"
import { Header } from "./components/Header"
import { Tabs } from "./components/Tabs"
import { TodoCard } from "./components/TodoCard"
import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"
import { useState, useEffect } from "react"


function App() {
//   const todos = [
//     { input: 'Hello! Add your first todo!', complete: true },
//     { input: 'Get the groceries!', complete: false },
//     { input: 'Learn how to web design', complete: false },
//     { input: 'Say hi to gran gran', complete: true },
//   ]
    const [ todos, setTodos ] = useState([{ input: 'Hello! Add your first todo!', complete: true }])
    const [ selectedTab, setSelectedTab ] = useState("Open")
    const [ editingIndex, setEditingIndex ] = useState(null)
    const [ editingValue, setEditingValue ] = useState('')
    
    function handleAddTodo(newTodo) {
        const newTodoList = [... todos, {input: newTodo, complete: false}]
        setTodos(newTodoList)
        handleSaveData(newTodoList)
    }
    
    function handleCompleteTodo(index) {
        let newTodoList = [...todos]
        newTodoList[index] = {...todos[index], complete: true }
        setTodos(newTodoList)
        handleSaveData(newTodoList)
    }

    function handleDeleteTodo(index) {
        let newTodoList = todos.filter((val, valIndex) => {
            return valIndex !== index
        })
        setTodos(newTodoList)
        handleSaveData(newTodoList)
    }

    function handleStartEdit(index) {
        setEditingIndex(index)
        setEditingValue(todos[index].input)
    }

    function handleCancelEdit() {
        setEditingIndex(null)
        setEditingValue('')
    }

    function handleSubmitEdit(index, newInput) {
        let newTodoList = [...todos]
        newTodoList[index] = {...todos[index], input: newInput}
        setTodos(newTodoList)
        setEditingIndex(null)
        setEditingValue('')
        console.log(newTodoList)
        handleSaveData(newTodoList)
    }

    function handleSaveData(currTodos){
        localStorage.setItem('todo-app', JSON.stringify({ todos: currTodos }))
    }

    useEffect(()=> {
        if (!localStorage || !localStorage.getItem('todo-app')) { return }
        let db = JSON.parse(localStorage.getItem('todo-app'))
        setTodos(db.todos)
    }, [])

    return (
        <>
            <Header todos={todos}/>
            <Tabs todos={todos} selectedTab= {selectedTab} setSelectedTab={setSelectedTab}/>
            <TodoList handleDeleteTodo={handleDeleteTodo} handleCompleteTodo={handleCompleteTodo} handleStartEdit={handleStartEdit} todos={todos} selectedTab= {selectedTab}/>
            <TodoInput handleAddTodo={handleAddTodo}/> 
            {editingIndex !== null && <EditModal value={editingValue} onChange={setEditingValue} handleCancelEdit={handleCancelEdit} handleSubmitEdit={handleSubmitEdit} editingIndex={editingIndex} />}
        </>
    )
}

export default App
