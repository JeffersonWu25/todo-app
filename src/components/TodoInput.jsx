import { useState } from 'react'

export function TodoInput(props) {
    const { handleAddTodo } = props
    const [ inputValue, setInputValue ] = useState('')

    return (
        <form onSubmit={(e) => {
            e.preventDefault()

            if (!inputValue) {
                return
            }
            handleAddTodo(inputValue)
            setInputValue('')
        }}>
            <div className="input-container">
                <input value={inputValue} 
                    onChange={(e) => {setInputValue(e.target.value)}}
                    placeholder="Add Task" />
                <button type="submit">
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
        </form>
    )
}