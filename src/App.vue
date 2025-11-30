<template>
  <div id="app">
    <div class="container">
      <div class="header">
        <h1>待办事项清单</h1>
        <p>管理您的日常任务</p>
      </div>
      
      <div class="content">
        <TodoForm @add-todo="addTodo" />
        
        <TodoList 
          :todos="todos"
          @remove-todo="removeTodo"
          @toggle-todo="toggleTodo"
          @clear-all="clearAllTodos"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TodoForm from './components/TodoForm.vue'
import TodoList from './components/TodoList.vue'
import { useTodos } from './composables/useTodos'

const { todos, addTodo, removeTodo, toggleTodo, clearAllTodos, loadTodos } = useTodos()

onMounted(() => {
  loadTodos()
})
</script>