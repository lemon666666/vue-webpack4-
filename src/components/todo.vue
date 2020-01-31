<template>
  <div class="container">
      <input 
         type="text"
         class="container-input"
         autofocus
         placeholder="接下去要做什么?"
         @keyup.enter="addTodo"   
      />
      <Item 
         v-for="list in listFilter"
         :key="list.id"
         :list="list"
         @delItem="delItem"
       />
      <Tabs 
         :currentTab="currentTab" 
         :lists="lists"
         @changeTabs="changeTabs"
         @clearItem="clearItem"
      />
  </div>
</template>

<script>
import Item from 'c/item'
import Tabs from 'c/tabs'
let id = 0
export default {
    data() {
        return {
            lists: [],
            currentTab: 'all'
        }
    },
    methods: {
        addTodo(e) {
            if(e.target.value.trim() == '') {
                alert('请输入内容') 
                return
            }
            this.lists.unshift({
                id: id++,
                content: e.target.value.trim(),
                completed: false
            })
            e.target.value = ''
        },
        delItem(id) {
            this.lists.splice(this.lists.findIndex(list => list.id === id), 1)
        },
        changeTabs(item) {
            this.currentTab = item
        },
        clearItem() {
           this.lists = this.lists.filter(list => !list.completed)
        }
    },
    computed: {
        listFilter() {
            //当前选中tabs
            if(this.currentTab === 'all') {
                 return this.lists
            }
            const completed = this.currentTab === 'completed'
            return this.lists.filter(list => completed === list.completed)
        }
    },
    components: {
        Item,
        Tabs
    }
}
</script>

<style lang="scss" scoped>
    .container {
        width: 600px;
        margin: 0 auto;
        box-shadow: 0 0 5px #666666;
        &-input {
            width: 100%;
            font-size: 24px;
            outline: none;
            padding: 16px;
            border: none;
            box-sizing: border-box
        }
    }
</style>