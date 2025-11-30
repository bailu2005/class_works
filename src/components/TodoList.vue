<template>
  <div v-if="todos.length > 0" class="todo-list-container">
    <ul class="items-list">
      <TodoItem 
        v-for="(todo, index) in todos" 
        :key="todo.id" 
        :todo="todo"
        :index="index"
        @remove-todo="handleRemoveTodo"
        @toggle-todo="handleToggleTodo"
      />
    </ul>
    
    <div class="stats">
      <span>总计: {{ todos.length }} 个任务</span>
      <span>已完成: {{ completedCount }} 个</span>
      <span>最后更新: {{ lastUpdated }}</span>
    </div>
    
    <div class="actions">
      <button class="clear-btn" @click="handleClearAll">
        <i class="fas fa-trash-alt"></i> 清空所有
      </button>
    </div>
  </div>
  
  <div v-else class="empty-state">
    <i class="fas fa-clipboard-list"></i>
    <p>暂无待办事项，请添加您的任务</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TodoItem from './TodoItem.vue'

const props = defineProps({
  todos: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['remove-todo', 'toggle-todo', 'clear-all'])

const completedCount = computed(() => {
  return props.todos.filter(todo => todo.completed).length
})

const lastUpdated = computed(() => {
  const now = new Date()
  return `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
})

const handleRemoveTodo = (id) => {
  emit('remove-todo', id)
}

const handleToggleTodo = (id) => {
  emit('toggle-todo', id)
}

const handleClearAll = () => {
  if (props.todos.length === 0) {
    alert('当前没有待办事项')
    return
  }
  
  if (confirm('确定要清空所有待办事项吗？此操作不可撤销。')) {
    emit('clear-all')
  }
}
</script>

<style scoped>
.todo-list-container {
  margin-top: 20px;
}

.actions {
  margin-top: 20px;
  text-align: center;
}

.clear-btn {
  background: linear-gradient(135deg, #e67e22 0%, #d35400 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 3px 8px rgba(230, 126, 34, 0.3);
}

.clear-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 12px rgba(230, 126, 34, 0.4);
}

.clear-btn:active {
  transform: translateY(0);
}
</style>