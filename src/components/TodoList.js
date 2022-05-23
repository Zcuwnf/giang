import React, {  } from 'react'
import Todo from './Todo'
import {connect} from "react-redux"
import { checkAll } from '../store/actions'
import { filterByStatus } from '../helper/helper'

const TodoList = (props => {
    const { listTodos, checkAll, isCheckedAll } = props
    return (
        <section className="main">
            <input
                className="toggle-all"
                type="checkbox"
                onChange={() => {
                    console.log('mmark done')
                    checkAll()
                }}
                checked={isCheckedAll}
            />
            <label htmlFor="toggle-all" onClick={checkAll} ></label>
            <ul className="todo-list">
                {
                    listTodos.map((todo, index) => <Todo index={index} key={todo.id} todo={todo} {...props} />)
                }
            </ul>

        </section>
    )
})

const mapStateToProps = (state) =>{
    return {
        listTodos: filterByStatus(state.todos.listTodos, state.todos.status),
        isCheckedAll: state.todos.isCheckedAll
    }
}

const mapDispatchToProps = {
    checkAll
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
