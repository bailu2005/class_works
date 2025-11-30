<template>
  <div class="add-item-section">
    <div class="input-group">
      <input 
        type="text" 
        v-model="newTodoText" 
        placeholder="请输入新的待办事项"
        @keyup.enter="handleAddTodo"
        ref="inputRef"
      >
    </div>
    <button class="add-btn" @click="handleAddTodo">
      <i class="fas fa-plus"></i> 添加任务
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-todo'])
const newTodoText = ref('')
const inputRef = ref(null)

const handleAddTodo = () => {
  if (newTodoText.value.trim() === '') {
    alert('请输入待办事项内容')
    return
  }
  
  emit('add-todo', newTodoText.value.trim())
  newTodoText.value = ''
  inputRef.value?.focus()
}
</script>