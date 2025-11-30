<template>
  <li 
    class="item"
    :class="{ 
      'fade-out': todo.deleting,
      'completed': todo.completed 
    }"
  >
    <div class="item-info">
      <span class="item-number">{{ index + 1 }}</span>
      <span 
        class="item-name"
        :class="{ 'completed-text': todo.completed }"
        @click="handleToggleTodo"
      >
        {{ todo.text }}
      </span>
    </div>
    <div class="item-actions">
      <button 
        class="toggle-btn" 
        :class="todo.completed ? 'undo-btn' : 'complete-btn'"
        @click="handleToggleTodo"
      >
        <i :class="todo.completed ? 'fas fa-undo' : 'fas fa-check'"></i>
        {{ todo.completed ? '标记未完成' : '标记完成' }}
      </button>
      <button class="delete-btn" @click="handleRemoveTodo">
        <i class="fas fa-trash"></i> 删除
      </button>
    </div>
  </li>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['remove-todo', 'toggle-todo'])

const handleRemoveTodo = () => {
  emit('remove-todo', props.todo.id)
}

const handleToggleTodo = () => {
  emit('toggle-todo', props.todo.id)
}
</script>

<style scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  background-color: white;
  border-bottom: 1px solid #f1f2f6;
  transition: all 0.3s;
  animation: fadeIn 0.5s ease-out;
}

.item:hover {
  background-color: #f8f9fa;
  transform: translateX(5px);
}

.completed {
  opacity: 0.7;
  background-color: #f8f9fa;
}

.completed-text {
  text-decoration: line-through;
  color: #7f8c8d;
}

.item-actions {
  display: flex;
  gap: 10px;
}

.toggle-btn {
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 5px;
}

.complete-btn {
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  color: white;
}

.undo-btn {
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  color: white;
}

.toggle-btn:hover {
  transform: translateY(-1px);
}

.delete-btn {
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 5px;
}

.delete-btn:hover {
  transform: translateY(-1px);
}
</style>