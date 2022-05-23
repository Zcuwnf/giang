export const filterByStatus = (listTodos = [], status = '', id) => {
    switch (status) {
      case 'ACTIVE':
        return listTodos.filter(item => !item.isCompleted)
      case 'COMPLETED':
        return listTodos.filter(item => item.isCompleted)
      case 'REMOVE':
        return listTodos.filter(item => item.id !== id)
      default:
        return listTodos
    }
  }
  
export  const filterTodosLeft = (listTodos = []) => {
    return listTodos.filter(item => !item.isCompleted)
  }