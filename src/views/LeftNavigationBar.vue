<template>
  <!-- Company section -->
  <div class="nav-bar-item" id="company">
    <div id="company-logo"></div>
    <div class="nav-bar-titles">{{ comapny }}</div>
  </div>

  <!-- Navigation items using RouterLink -->
  <RouterLink
    class="nav-bar-item"
    id="nav-items"
    v-for="(item, index) in navItems"
    :key="index"
    @click="selectPanel(item, index)"
    :to="item.path"
    :class="{ selected: selectIndex === index, disable: item.disable }"
  >
    <div><NavSvgs :svgName="item.svg" /></div>
    <div class="nav-bar-titles">{{ item.title }}</div>
  </RouterLink>
</template>

<script setup>
import NavSvgs from '@/components/icons/NavSvgs.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// Define company name
const comapny = 'Septem Systems'

// Define navigation items
const navItems = [
  {
    title: 'Currency Exchange',
    path: '/',
    svg: 'box',
    disable: false
  },
  {
    title: 'Analysis',
    path: '/analysis',
    svg: 'analysis',
    disable: true
  },
  {
    title: 'Notification',
    path: '/notification',
    svg: 'notification',
    disable: true
  },
  {
    title: 'Team',
    path: '/team',
    svg: 'team',
    disable: true
  }
]

// Define selected index for navigation items
const selectIndex = ref(0)

// Function to select panel/item
function selectPanel(item, index) {
  selectIndex.value = index
}
</script>

<style scoped>
/* Styling for company section */
#company {
  margin-bottom: 32px;
}

/* Styling for company logo */
#company-logo {
  border: 1px solid;
  background-color: black;
  border-radius: 4px;
  width: 24px;
  height: 24px;
}

/* Styling for navigation bar items */
.nav-bar-item {
  display: flex;
  padding: 10px;
}

/* Styling for navigation bar titles */
.nav-bar-titles {
  font-size: 16px;
  font-weight: 600;
  align-content: center;
  margin-left: 8px;
}

/* Styling for selected navigation item */
.selected {
  border-radius: 8px;
  background-color: #f2f4f7;
}

/* Styling for disabled navigation item */
.disable {
  opacity: 0.5; /* Reduce opacity for disabled items */
}

/* Styling for RouterLink */
a {
  text-decoration: none; /* Remove underline */
  color: inherit; /* Use the color inherited from its parent */
}

/* Styling for navigation items */
#nav-items {
  margin-bottom: 3px;
}
</style>
