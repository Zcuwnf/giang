import React, { } from 'react'
import { connect } from 'react-redux'
import { filterByStatus } from '../helper/helper'
import { setStatusFilter, clearCompleted } from '../store/actions'

const Footer = ((props) => {
    const { setStatusFilter, activeButton, clearCompleted, numOfTodosLeft, numOfTodos } = props
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{numOfTodosLeft}</strong>
                <span> </span>
                <span>{numOfTodosLeft > 1 ? 'items' : 'item'}</span>
                <span> left</span>
            </span>
            <ul className="filters">
                <li>
                    <a
                        href="#/"
                        className={`${activeButton === 'ALL' ? "selected" : ''}`}
                        onClick={() => setStatusFilter('ALL')}
                    >
                        All
                    </a>
                </li>
                <span></span>
                <li>
                    <a
                        href="#/active"
                        className={`${activeButton === 'ACTIVE' ? "selected" : ''}`}
                        onClick={() => setStatusFilter('ACTIVE')}
                    >
                        Active
                    </a>
                </li>
                <span></span>
                <li>
                    <a
                        href="#/completed"
                        className={`${activeButton === 'COMPLETED' ? "selected" : ''}`}
                        onClick={() => setStatusFilter('COMPLETED')}
                    >
                        Completed
                    </a>
                </li>
            </ul>
            {
                numOfTodosLeft < numOfTodos && <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
            }
        </footer>
    )
})

const mapStateToProps = (state) =>{
    const {listTodos, status}= state.todos
    return{
        status,
        numOfTodos: listTodos.length,
        numOfTodosLeft: filterByStatus(listTodos,'ACTIVE').length

    }
}

const mapDispatchToProps = {
    setStatusFilter,
    clearCompleted
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)