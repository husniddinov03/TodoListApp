import React, { useState } from 'react'
import "./Todos.css"
// import { useState } from 'react'

const Todos = () => {
    const [editId, setEditId] = useState(null)
    const [editAccess, setEditAccess] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [erorMassage, setErorMassage] =useState("")

    const [todos, setTodos] = useState(
        JSON.parse(localStorage.getItem('todos')) || []
    )

    let compTodo = todos.filter(todo => todo.isComplated === true).length

    const complatedPrasent = (compTodo / todos.length ) * 100
        const delComplated = () =>{
          let thisComplated =  todos.filter(todo => todo.isComplated !== true)
            setTodos(thisComplated)
            localStorage.setItem('todos', JSON.stringify(thisComplated))
        }

    const complatedTodos = (id) => {
        let todo = todos.find(todo => todo.id === id)
        todo.isComplated = !todo.isComplated
        setTodos([...todos])
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    const handleInput = (e) => {
        setInputValue(e.target.value);
    }

    const addTodo = (e) => {
        e.preventDefault()

        if (inputValue !== '') {
            let newId = todos.length > 0 ? todos[0].id + 1 : 1
            let newTodo = {
                id: newId,
                content: inputValue,
                isComplated: false
            }
            setTodos([newTodo, ...todos])
            localStorage.setItem('todos', JSON.stringify([newTodo, ...todos]))
            setInputValue("")

        } else {
            setErorMassage( "iltimos todo kiriting")
            setTimeout(() => {
                setErorMassage("")
            }, 3000);
        }
    }

    let filteredTodo = (id) => {
        let filteredArray = todos.filter(todo =>
            todo.id !== id);
        setTodos(filteredArray)
        localStorage.setItem('todos', JSON.stringify(filteredArray))
    };

    const editTodo = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Bunda qatorni qayta yuborishni oldini olamiz
            let todo = todos.find(todo => todo.id === editId);
            todo.content = e.target.textContent;
            setTodos([...todos]);
            localStorage.setItem('todos', JSON.stringify(todos));
            setEditAccess(false);
        }
    };
    

    return (
        <div className='todos-box'>
            <form onSubmit={addTodo} action="" className="todo-form">
                <input onChange={handleInput} type="text" value={inputValue} name='content' className="todo-input" placeholder='Write your todo...✍️' />
                <button className="todo-btn">+ </button>
            </form>


            <ul className="todo-list">
                {
                    todos.length > 0 ? todos.map((todo, i) => {
                        return (

                            <li className="todo-item" key={todo.id}>
                                <div>
                                    <input onChange={() => complatedTodos(todo.id)} checked={todo.isComplated} className='todo-check' type="checkbox" />
                                    <span onKeyDown={editTodo}  contentEditable={editAccess} className={todo.isComplated ? "todo-content complated" : "todo-complated"}>{todo.content} </span>
                                </div>
                                <div className="btn-box">
                                  {
                                    todo.isComplated !== false && <p className='ptichka'>✅</p>
                                  }  
                                    <button className='btn edit-btn' onClick={() => {
                                        setEditAccess(true)
                                        setEditId(todo.id)

                                        setErorMassage('Todo ustiga bosib o`zgartirishingiz mumkin...✍️')

                                        setTimeout(() => {
                                            setErorMassage('')
                                        }, 3000);
                                    }}> </button>
                                    <button className='btn del-btn' onClick={() => filteredTodo(todo.id)}></button>
                                </div>
                            </li>
                        )
                    })
                        : <h3 className='massage'>Hali todo qo'shilmagan ☹️</h3>
                }
            </ul>

            <div className="todos-bottom-box">
                <p style={{'--indicatorCount' : `${complatedPrasent}%`}} className="indicator">
                    {compTodo} of {todos.length } tasks done
                </p>

                <button onClick={delComplated} className="delete-complate-btn">
                    Remove checked X
                </button>
            </div><br /><br />
            <span className='eror-massage'>{erorMassage}</span>

        </div>
    )
}
export default Todos