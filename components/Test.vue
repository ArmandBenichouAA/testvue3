<template>
  <div class="test">
    <h1>{{ title }}</h1>
    <h2>{{ testRef }}</h2>
    <input v-model="newTask" @keyup.enter="addTask" placeholder="Nouvelle tâche" />
    <div>
      <label>Filtre :</label>
      <select v-model="filter">
        <option value="all">Toutes</option>
        <option value="active">Actives</option>
        <option value="completed">Terminées</option>
      </select>
    </div>
    <ul>
      <li v-for="(task, index) in filteredTasks" :key="index" :class="{ 'completed' : task.completed  }">
        <input type="checkbox" v-model="task.completed"  />
        {{ task.text }}
        <button @click="removeTask(index)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const title = 'Liste de Tâches';
const newTask = ref('');
const tasks = ref([]);
const filter = ref('all');

const testRef = ref({
  person: { 
    name: 'William',
  },
})

console.log(testRef);

setTimeout(() => {
  testRef.value.person.name = 'Imad'
}, 3000);

console.log(testRef);

const addTask = () => {
  if (newTask.value.trim() === '') return;
  tasks.value.push({ text: newTask.value, completed: false });
  newTask.value = '';
};

const removeTask = (index) => {
  tasks.value.splice(index, 1);
};

const filteredTasks = computed(() => {
  if (filter.value === 'active') {
    return tasks.value.filter(task => !task.completed);
  } else if (filter.value === 'completed') {
    return tasks.value.filter(task => task.completed);
  } else {
    return tasks.value;
  }
});

function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks.value));
  tasks.value.forEach((el) => {
    console.log(el.text, 'is stored');
  });
}

onMounted(() => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks.value = JSON.parse(storedTasks);
  } else {
    tasks.value = [];
  }
});

watch(() => tasks.value.length, (tasksNbr) => {
  console.log(tasks.value);
  if (tasksNbr > 5) {
    window.alert('calmos')

    tasks.value.pop(tasksNbr - 1)
  }
  saveTasksToLocalStorage();
});
</script>

<style scoped>
.test {
  display: flex;
  flex-direction: column;
  height: 30vh;
  justify-content: space-evenly;
}

.completed {
  color: green;
}
</style>