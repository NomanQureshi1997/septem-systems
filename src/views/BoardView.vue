<template>
  <!-- Container for status layout -->
  <div id="status-layout">
    <!-- Loop through status items -->
    <div v-for="(item, statusIndex) in store.getStatus" :key="statusIndex" id="status-cards">
      <!-- Title section with options -->
      <div
        id="title"
        @mouseover="changeDisplayOptions(true, statusIndex)"
        @mouseleave="changeDisplayOptions(false, -1)"
      >
        <div>{{ item.title }}</div>
        <!-- Display status title -->
        <div
          id="options"
          v-show="displayOptions && statusIndex == hoverStatusIndex"
          @click="addToList(statusIndex)"
        >
          <!-- Show options on click -->
          <plus />
          <!-- Plus icon for adding items -->
        </div>
      </div>
      <!-- Scroll area for cards -->
      <div id="scroll-area" @dragover.prevent @drop="drop(statusIndex)">
        <!-- Allow dropping in the scroll area -->
        <!-- Loop through cards -->
        <div id="cards" v-for="(card, cardIndex) in item.list" :key="cardIndex">
          <!-- Draggable card body -->
          <div id="card-body" :draggable="true" @dragstart="dragStart(statusIndex, cardIndex)">
            <!-- Input field for task name -->
            <input v-model="card.name" type="text" placeholder="Task name..." maxlength="30" />
            <p>Created On: {{ card.date }}</p>
            <!-- Display creation date -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import plus from '@/components/icons/Plus.vue'
import { boardStore } from '@/stores/board'
import { ref, onMounted } from 'vue'

// Access the store
const store = boardStore()

// Get current date
const currentDate = new Date(Date.now())
const options = { day: 'numeric', month: 'short', year: 'numeric' }
const formattedDate = currentDate.toLocaleDateString('en-US', options)

// Generate random ID
const randomId = Math.random().toString(36)

// Ref for draggable values
const draggableValues = ref({
  cardIndex: 0,
  statusIndex: 0
})

// Defined list item
const list = {
  id: randomId,
  name: '',
  date: formattedDate
}

// Ref for displaying options
const displayOptions = ref(false)

// Ref for status index on which the cusor is one
const hoverStatusIndex = ref(-1)

// Function to toggle display of options
function changeDisplayOptions(bool, statusIndex) {
  displayOptions.value = bool
  hoverStatusIndex.value = statusIndex
}

// Function to add item to the list
function addToList(statusIndex) {
  store.addItem(list, statusIndex)
}

// Function to handle drag start event
function dragStart(statusIndex, cardIndex) {
  draggableValues.value.cardIndex = cardIndex
  draggableValues.value.statusIndex = statusIndex
}

// Function to handle drop event
function drop(statusIndex) {
  const draggedStatusIndex = draggableValues.value.statusIndex
  const draggedCardIndex = draggableValues.value.cardIndex
  store.removeItem(draggedStatusIndex, draggedCardIndex, statusIndex)
}

onMounted(() => {
  // Setting up some inital values
  let initialInput = [
    { title: 'Making a to do App', index: 1 },
    { title: 'Once done drag to completed', index: 0 },
    { title: 'Try to Drag me', index: 0 }
  ]
  initialInput.forEach((item) => {
    let newList = { ...list }
    newList.name = item.title
    store.addItem(newList, item.index)
  })
})
</script>

<style scoped>
/* Styling for status layout */
#status-layout {
  display: flex;
  gap: 30px;
  overflow-x: auto;
  overflow-y: hidden;
}

/* Styling for status cards */
#status-cards {
  width: 320px;
  height: 80vh;
}

/* Styling for title section */
#title {
  height: 43px;
  font-size: 18px;
  font-weight: 500;
  color: grey;
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
}

/* Styling for scroll area */
#scroll-area {
  overflow-x: hidden;
  overflow-y: auto;
  height: 70vh;
  padding: 3px;
}

/* Styling for cards */
#cards {
  min-height: 121px;
  border: 1px solid #c4c4c4;
  border-radius: 8px;
  background-color: #ffffff;
  margin-bottom: 24px;
  box-shadow: 1px 2px 6px -1px #aaaaaa;
  transition: opacity 1s;
  opacity: 1 !important;
  cursor: grab; /* Change cursor to grab when hovering */
}

/* Styling for active card */
#cards:active {
  cursor: grabbing; /* Change cursor to grabbing when active */
  opacity: 1 !important;
}

/* Styling for card body */
#card-body {
  padding: 20px;
}

/* Styling for options */
#options {
  cursor: pointer;
}

/* Styling for input */
input {
  border: none;
  width: 98%;
  height: 30px;
  font-size: 20px;
  border-radius: 8px;
  font-weight: 600;
}

/* Styling for input focus */
input:focus {
  outline: none;
}

/* Styling for input placeholder */
input::placeholder {
  color: #999; /* Change the color */
  font-size: 15px;
  font-weight: 400;
}

/* Styling for paragraph */
p {
  color: #98a2b3;
  font-size: 14px;
  font-weight: 400;
}
</style>
