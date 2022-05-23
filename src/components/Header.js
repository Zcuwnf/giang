import React, { useState } from 'react'
import { connect } from 'react-redux';
import { addTodo } from '../store/actions';
import {v4 as uuidv4} from 'uuid'

const Header = (props =>{
  const [text, setText] = useState('')
  const {addTodo} = props
  const onAddTodo = (e = {} ) => {
      if (e.key === 'Enter' && text) {
      
          addTodo({
              id: uuidv4(),
              text,
              checked: false
          })
          setText('')
      }
  }
  return (
      <header className="header">
          <h1>Todo List</h1>
          <input 
              className="new-todo" 
              placeholder="Enter your todo"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => onAddTodo(e)}
          />
      </header>
  )
})

const mapDispatchToProps = {
  addTodo
}

export default connect(null, mapDispatchToProps) (Header)