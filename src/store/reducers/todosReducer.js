// import TodoList from '../../components/TodoList'
import {
    ADD_TODO,
    GET_EDIT_TODO,
    EDIT_TODO,
    MARK_COMPLETED,
    CHECK_ALL,
    REMOVE_TODO,
    SET_STATUS_FILTER,
    CLEAR_COMPLETED
} from './../actions'

import { filterTodosLeft, filterByStatus } from './../../helper/helper'

const INITIAL_STATE ={
    listTodos: [
        {id: 1,
        text: 'todos1',
        isComplete:false}
    ],
    isCheckedAll: false,
    status: 'ALL',
    todoEditingId: ''
    
}

const todosReducer = (state = INITIAL_STATE, action) => {
    const {listTodos, isCheckedAll} = state
    const list =JSON.parse(JSON.stringify(listTodos))
    switch (action.type) {
        case ADD_TODO:
            return Object.assign({}, state, {
                listTodos: [...list, action.todo]
            })
        case GET_EDIT_TODO:
            return Object.assign({}, state, {
                todoEditingId: action.id
            })
        case EDIT_TODO:
            if ( action.index >= 0 ) {
                // const { listTodos } = this.state
                list.splice(action.index, 1, action.todo)}
            return Object.assign({}, state, {
                listTodos: list,
                todoEditingId:''
            })
        case MARK_COMPLETED:
            // const { listTodos } = this.state
            // let isCheckedAll = true
            const updatedListTodos = listTodos.map(item => {
                if ((!item.isCompleted && item.id !== action.id) || (item.isCompleted && item.id === action.id)) {
                    // isCheckedAll = false
                }
                if (item.id === action.id) {
                return { ...item, isCompleted: !item.isCompleted }
                }
                return item
                })
            return Object.assign({}, state, {
                listTodos: updatedListTodos,
                isCheckedAll: !filterTodosLeft(updatedListTodos)
            })
        case CHECK_ALL:
            // const { listTodos, isCheckedAll } = this.state
            return Object.assign({}, state, {
                listTodos :  listTodos.map(item => ({ ...item, isCompleted: !isCheckedAll })),
                isCheckedAll: !isCheckedAll
            })
        case REMOVE_TODO:
            return Object.assign({}, state, {
                listTodos: filterByStatus(listTodos, 'REMOVE', action.id)
            })
        case SET_STATUS_FILTER:
            return Object.assign({}, state, {
                status: action.status
            })
        case CLEAR_COMPLETED:
            return Object.assign({}, state, {
                listTodos: filterByStatus(listTodos, 'ACTIVE')
            })
        default:
            return state
    }
}

export default todosReducer