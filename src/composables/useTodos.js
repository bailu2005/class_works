import { ref, computed } from 'vue'

export function useTodos() {
  const todos = ref([])

  // 添加待办事项
  const addTodo = (text) => {
    const newId = todos.value.length > 0 
      ? Math.max(...todos.value.map(todo => todo.id)) + 1 
      : 1
    
    todos.value.push({
      id: newId,
      text: text,
      completed: false,
      createdAt: new Date().toISOString()
    })
    
    saveTodos()
  }

  // 删除待办事项
  const removeTodo = (id) => {
    const todoIndex = todos.value.findIndex(todo => todo.id === id)
    if (todoIndex !== -1) {
      // 添加删除动画
      todos.value[todoIndex].deleting = true
      
      setTimeout(() => {
        todos.value.splice(todoIndex, 1)
        saveTodos()
      }, 300)
    }
  }

  // 切换完成状态
  const toggleTodo = (id) => {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
      saveTodos()
    }
  }

  // 清空所有
  const clearAllTodos = () => {
    // 为所有项目添加删除动画
    todos.value.forEach(todo => {
      todo.deleting = true
    })
    
    setTimeout(() => {
      todos.value = []
      saveTodos()
    }, 300)
  }

  // 保存到 localStorage
  const saveTodos = () => {
    localStorage.setItem('vue-todos', JSON.stringify(todos.value))
  }

  // 从 localStorage 加载
  const loadTodos = () => {
    const saved = localStorage.getItem('vue-todos')
    if (saved) {
      todos.value = JSON.parse(saved)
    } else {
      // 初始化示例数据
      todos.value = [
        { id: 1, text: '学习 Vue 3', completed: false, createdAt: new Date().toISOString() },
        { id: 2, text: '编写项目文档', completed: false, createdAt: new Date().toISOString() },
        { id: 3, text: '代码审查', completed: true, createdAt: new Date().toISOString() }
      ]
    }
  }

  return {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
    clearAllTodos,
    loadTodos
  }
}