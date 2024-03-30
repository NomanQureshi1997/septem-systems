import { defineStore } from 'pinia'
const randomId = Math.random().toString(36)
export const boardStore = defineStore('todo', {
  state: () => {
    return {
      status: [
        {
          id: randomId,
          title: 'To Do',
          list: []
        },
        {
          id: randomId,
          title: 'Completed',
          list: []
        }
      ]
    }
  },
  getters: {
    getStatus: (state) => state.status
  },
  actions: {
    addItem(list, statusIndex) {
      this.status[statusIndex].list.unshift({ ...list })
    },
    removeItem(draggedStatusIndex, draggedCardIndex, statusIndex) {
      const tempStatusIndex = this.status[draggedStatusIndex].list.length == 0 ? 0 : statusIndex
      const draggedCard = this.status[draggedStatusIndex].list.splice(draggedCardIndex, 1)[0]
      this.status[tempStatusIndex].list.unshift(draggedCard)
    }
  }
})
