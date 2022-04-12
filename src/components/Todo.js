import React, { Component } from 'react'

class Todo extends Component {

    constructor(props){
        super(props);
        this.state ={
            isEditing: false
        }
    }

    // const {
    //     todo,
    //     markCompleted,
    //     getEditTodo,
    //     todoEditingId,
    //     editTodo,
    //     index,
    //     removeTodo
    // } = props

    // const isEditing = todoEditingId === todo.id
    // const [text, setText] = useState(todo.text)
   
    // todoisEditing = () =>{
    //     this.isEditing = this.props.todoEditingId === this.props.todo.id
    // }
    
    onEditTodo = () => {
        this.props.editTodo({
            todo: this.props.todo,
            text: this.props.text
        }, this.props.index)
        this.props.getEditTodo('')
    }

    render(){
        return (
        <li className={`${this.state.isEditing ? 'editing' : ''} ${this.props.todo.isCompleted ? 'completed' : ''}`}>
            {
                !this.state.isEditing ?
                    <div className="view">
                        <input
                            className="itemList"
                            type="checkbox"
                            checked={this.props.todo.isCompleted}
                            onChange={() => this.props.markCompleted(this.props.todo.id)}
                        />
                        <label onDoubleClick={() => this.props.getEditTodo(this.props.todo.id)}>{this.props.todo.text}</label>
                        <button className="remove" onClick={() => this.props.removeTodo(this.props.todo.id)} />
                    </div> :
                    <input
                        className="edit"
                        // value={text}
                        value={this.props.text}
                        onChange={(e) => this.props.setText(e.target.value)}
                        onBlur={this.props.onEditTodo}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && this.props.text) {
                                this.onEditTodo()
                            }
                        }}
                    />
            }
        </li>
    )
    }
}

export default Todo