import React, { useState } from 'react'
import {
    getEditTodo,
    editTodo,
    markCompleted,
    removeTodo
} from './../store/actions'
import { connect } from 'react-redux';

const Todo = (props => {
    const {
        todo,
        markCompleted,
        getEditTodo,
        todoEditingId,
        editTodo,
        index,
        removeTodo
    } = props
    const isEditing = todoEditingId === todo.id
    const [text, setText] = useState(todo.text)
    const onEditTodo = () => {
        editTodo({
            ...todo,
            text
        }, index)
        getEditTodo('')
    }

    return (
        <li className={`${isEditing ? 'editing' : ''} ${todo.isCompleted ? 'completed' : ''}`}>
            {
                !isEditing ?
                    <div className="view">
                        <input
                            className="itemList"
                            type="checkbox"
                            checked={todo.isCompleted}
                            onChange={() => markCompleted(todo.id)}
                        />
                        <label onDoubleClick={() => getEditTodo(todo.id)}>{todo.text}</label>
                        <button className="remove" onClick={() => removeTodo(todo.id)} />
                    </div> :
                    <input
                        className="edit"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onBlur={onEditTodo}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && text) {
                                onEditTodo()
                            }
                        }}
                    />
            }
        </li>
    )
})

const mapStateToProps = (state, ownProps) =>{
    return{
        todoEditingId: state.todos.todoEditingId,
        ...ownProps   
    }
}

const mapDispatchToProps = {
    getEditTodo,
    editTodo,
    markCompleted,
    removeTodo
}

export default connect(mapStateToProps, mapDispatchToProps) (Todo)


