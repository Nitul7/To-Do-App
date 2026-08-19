import { useEffect, useRef, useState } from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from './TodoItems'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Todo = () => {

    const inputref = useRef();

    const [todolist, setTodos] = useState(localStorage.getItem('todolist') ? JSON.parse(localStorage.getItem('todolist')) : []);

    const add = (e) => {
        e.preventDefault();

        const inputValue = inputref.current.value.trim();

        if (inputValue === '') {
            toast.warning('Please enter a task!');
            return;
        }
        const newTodo = {
            id: Date.now(),
            text: inputValue,
            isComplete: false
        };

        setTodos((prev) => [...prev, newTodo]);


        inputref.current.value = '';
    }

    const deleteTodo = (id) => {
        setTodos((prvTodos) => {
            return prvTodos.filter((todo) => todo.id !== id);
        });
    };

    const toggle = (id) => {
        setTodos((prvTodos) => {
            return prvTodos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, isComplete: !todo.isComplete };
                }
                return todo;
            });
        });
    };

    useEffect(() => {
        localStorage.setItem('todolist', JSON.stringify(todolist));
    }, [todolist]);

    return (
        <div className='bg-white self-center w-11/12 max-w-md flex flex-col p-7 min-h-137.5 rounded-xl'>

            {/* Title */}
            <div className='flex items-center mt-7 gap-3'>
                <img className='w-8' src={todo_icon} alt="Todo Icon" />

                <div className='px-4 py-2 rounded-lg bg-gray-100
                    shadow-[inset_3px_3px_6px_#cbd5e1,inset_-3px_-3px_6px_#ffffff]'>
                    <h1 className='text-3xl font-bold text-gray-900'>
                        My Todo List
                    </h1>
                </div>
            </div>

            {/* Input Field */}
            <form onSubmit={add} className='flex items-center gap-2 mt-7'>
                <input ref={inputref} className='w-full border-2 border-gray-350 rounded-md p-2 focus:outline-none focus:border-blue-500' type="text" placeholder='Add a new task...' />
                <button className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-900 cursor-pointer active:scale-85'>ADD</button>
            </form>

            {/* Todo List */}
            <div className='mt-3'>
                {todolist.map((item) => (
                    <div key={item.id} className=' border-b-2 border-gray-400'>
                        <TodoItems
                            text={item.text}
                            isComplete={item.isComplete}
                            id={item.id}
                            deleteTodo={deleteTodo}
                            toggle={toggle}
                        />
                    </div>
                ))}
            </div>

            {/* Footer */}
            <footer className='mt-auto pt-6 text-center border-t border-gray-200'>
                <p className='text-sm text-gray-500'>
                    © 2026 My Todo List. Developed By Nitul Tako.
                </p>
            </footer>

        </div>
    )
}

export default Todo;