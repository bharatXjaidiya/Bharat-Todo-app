import { use, useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid'; // including for the unique id's


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false);


  useEffect(() => {
      const todoString = localStorage.getItem("todos");
      const todo = JSON.parse(todoString);
      setTodos(todo);
      setHasLoaded(true); //  mark as loaded
  }, []);

  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    console.log(todos)
  }, [todos, hasLoaded]);



  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleAdd = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, { id: uuidv4(), todo: todo, isComplete: false }]);
      setTodo("");
    }
  }
  const handleCheck = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return id === item.id
    })
    let newTodos = [...todos];
    if (newTodos[index].isComplete) {
      newTodos[index].isComplete = false;
    }
    else {
      newTodos[index].isComplete = true;
    }
    setTodos(newTodos);
  }

  const handleEdit = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => item.id === id);
    let todoToEdit = todos[index].todo; //  Store this before state update

    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    setTodo(todoToEdit);
  };


  const handleDelete = (e) => {
    let id = e.target.name;
    let newTodos = todos.filter((item) => {
      return item.id != id;
    })
    setTodos(newTodos)
  }
  const handleShow = (e) => {
    setShowAll(showAll ? false : true)
  }
  return (
    <><div className="container flex justify-center flex-col items-center box-border max-w-none">

      <Navbar></Navbar>

      <div className="todo w-full sm:w-xl border-2 sm:h-150 h-[100vh] rounded-2xl my-5 p-5">
        <span className="font-bold text-xl text-center my-1">Bharat Todo App -</span>
        <span className="text-xl my-1" > Manage your Todo's at one place</span>
        <div className='sm:font-semibold sm:text-left text-xl my-3 text-center font-bold' >Add a Todo</div>
        <input className='w-full sm:w-[420px] rounded-2xl p-2 outline-none bg-amber-100' onChange={handleChange} value={todo} type="text" placeholder='Enter your Todo' />
        <button className='bg-fuchsia-600 sm:py-2 py-1 rounded-lg mt-2 px-7 sm:rounded-3xl font-semibold sm:ml-4 sm:w-auto w-[70%] block sm:inline mx-auto ' onClick={handleAdd}>Add</button>
        <div className='font-semibold text-xl my-3'>Your Todos</div>

        <input onChange={handleShow} checked={showAll} type="checkbox" /> <span>Show Finished</span>
        <hr className='mb-3' />
        {todos.length === 0 && <p className='text-gray-500'>No todos yet!</p>}
        {todos.map((item) => {
          return (showAll || item.isComplete == false) && (
            <div key={item.id} className='sm:flex sm:justify-between mb-2'>
              <div className="flex justify-center items-center">
                <input onChange={handleCheck} type="checkbox" checked={item.isComplete ? true : false}  name={item.id} />
                <div className={item.isComplete ? 'line-through ml-2 text-[17px] sm:max-w-[350px] w-full  whitespace-normal break-words' : ' ml-2 text-[17px] sm:max-w-[350px] w-full whitespace-normal break-words' } >{item.todo}</div>
              </div>
              <div>
                <button onClick={handleEdit} name={item.id} className='bg-fuchsia-600 mx-2 px-3 py-1 rounded-sm'>Edit</button>
                <button onClick={handleDelete} name={item.id} className='bg-fuchsia-600 mx-2 px-3 py-1 rounded-sm'>Delete</button>
              </div>
            </div>
          )

        })}
      </div>
    </div>
    </>
  )
}

export default App
