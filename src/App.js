import React, { useEffect, useState } from 'react';
import TodoList from './components/Todolist'
import Header from './components/Header'
import Footer from './components/Footer'

import './css/Todo.css'

const filterByStatus = (listTodos = [], status = '', id) => {
  switch (status) {
    case 'ACTIVE':
      return listTodos.filter(item => !item.isCompleted)
    case 'COMPLETED':
      return listTodos.filter(item => item.isCompleted)
    // case 'REMOVE':
    //   return listTodos.filter(item => item.id !== id)
    default:
      return listTodos
  }
}

const filterTodosLeft = (listTodos = []) => {
  return listTodos.filter(item => !item.isCompleted)
}

const App = () => {
  const [listTodos, setList] = useState([])
  const [isCheckedAll, setisCheckedAll] = useState(false)
  const [status, setStatus] = useState('ALL')
  const [todoEditingId, setEdit] = useState('')
  // state = {
  //   listTodos: [],
  //   isCheckedAll: false,
  //   status: 'ALL',
  //   todoEditingId: ''
  // }

  useEffect( () => {
    const listTodos = localStorage.getItem("todos")
    if (listTodos) {
      const savedlistTodos = JSON.parse(listTodos)
      setList(savedlistTodos)
    } else {
      console.log("Empty")
    }
  },[])

  useEffect( () =>{
    if (status === 'ALL') {
      if (listTodos.length === 0) {
        localStorage.removeItem("todos")
      } else localStorage.setItem("todos", JSON.stringify(listTodos))
    }
  }, [listTodos])

  const addTodos = (todo) => {
      setList ([...listTodos, todo])
   
  }

  const markCompleted = (id = '') => {
    // const { listTodos } = this.state
    let isCheckedAll = true
    const updatedListTodos = listTodos.map(item => {
      if ((!item.isCompleted && item.id !== id) || (item.isCompleted && item.id === id)) {
        isCheckedAll = false
      }
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted }
      }
      return item
    })
    // this.setState({
    //   isCheckedAll,
    //   listTodos: updatedListTodos
    // })
    setList(updatedListTodos)
  }

  const checkAll = () => {
    // const { listTodos, isCheckedAll } = this.state
    const updatedListTodos = listTodos.map(item => ({ ...item, isCompleted: !isCheckedAll }))
    // this.setState(preState => ({
    //   isCheckedAll: !preState.isCheckedAll,
    //   listTodos: updatedListTodos
    // }))
    setisCheckedAll(!isCheckedAll)
    setList(updatedListTodos)
  }

  const clearCompleted = () => {
    // this.setState(preState => ({
    //   listTodos: filterTodosLeft(preState.listTodos)
    // }))
    const updatedListTodos = [...listTodos].filter(todo => !todo.isCompleted)
    setList(updatedListTodos)
  }

  const getEditTodo = (id = '') => {
    // this.setState({
    //   todoEditingId: id
    // })
    const todoEditingId = id
    setEdit (todoEditingId)
  }

  const editTodo = (todo, index) => {
    // const { listTodos } = this.state
    // listTodos.splice(index, 1, todo)
    // this.setState({ listTodos })
    listTodos.splice(index, 1, todo)
    setList(listTodos)
  }

  const removeTodo = (id = '') => {
    // this.setState(prevState => ({
    //   listTodos: filterByStatus(prevState.listTodos, 'REMOVE', id)
    // }))
    const updatedListTodos = [...listTodos].filter(todo => todo.id !== id)
    setList(updatedListTodos)
  }

  const setStatusFilter = (s) => {
    setStatus(s)
  }
  // render() {
    // const { listTodos, isCheckedAll, status, todoEditingId } = this.state
    return (
      <div className="todoapp">
        <Header
          addTodo={addTodos}
        />
        <TodoList
          listTodos={filterByStatus(listTodos, status)}
          markCompleted={markCompleted}
          checkAll={checkAll}
          isCheckedAll={isCheckedAll}
          todoEditingId={todoEditingId}
          getEditTodo={getEditTodo}
          editTodo={editTodo}
          removeTodo={removeTodo}
        />
        <Footer
          activeButton={status}
          setStatusFilter={setStatusFilter}
          clearCompleted={clearCompleted}
          numOfTodosLeft={filterTodosLeft(listTodos).length}
          numOfTodos={listTodos.length}
        />
      </div>
    )

  // }
}

export default App;
