import React from 'react'
import Todo from './components/Todo'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div className='bg-amber-500 grid py-4 place-items-center min-h-screen'>
      <ToastContainer/>
      <Todo />
    </div>
  )
}

export default App
