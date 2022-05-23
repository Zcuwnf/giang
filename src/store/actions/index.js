export const ADD_TODO = 'ADD_TODO'
export const GET_EDIT_TODO = 'GET_EDIT_TODO'
export const EDIT_TODO = 'EDIT_TODO'
export const MARK_COMPLETED ='MARK_COMPLETED'
export const CHECK_ALL = 'CHECK_ALL'
export const REMOVE_TODO = 'REMOVE_TODO'
export const SET_STATUS_FILTER ='SET_STATUS_FILTER'
export const CLEAR_COMPLETED ='CLEAR_COMPLETED'

export const addTodo =(todo = {}) => {
    return {
        todo,
        type: ADD_TODO
    }
}

export const getEditTodo = (id = '') =>{
    return{
        id,
        type: GET_EDIT_TODO
    }
}

export const editTodo = (todo = {}, index = -1) =>{
    return{
        todo,
        index,
        type: EDIT_TODO
    }
}

export const markCompleted = (id = '') =>{
    return{
        id,
        type: MARK_COMPLETED
    }
}

export const checkAll = () =>{
    return{
        type: CHECK_ALL
    }
}

export const removeTodo = ( id = '') =>{
    return{
        id,
        type: REMOVE_TODO
    }
}

export const setStatusFilter = (status= '') =>{
    return{
        status,
        type: SET_STATUS_FILTER
    }
}

export const clearCompleted = () =>{
    return{
        type: CLEAR_COMPLETED
    }
}