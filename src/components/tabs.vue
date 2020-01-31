<template>
  <div class="nav">
     <span class="nav-left">{{count}} case</span>
     <span class="nav-tabs">
         <span 
             v-for="tab in tabs" 
             :key="tab"
            @click="changeTabs(tab)"
            :class="[currentTab === tab ? 'actived' : '']"   
          >
             {{tab}}
         </span>
     </span>
     <span class="nav-right" @click="clearItem">Clear Completed</span>
  </div>
</template>

<script>
export default {
    props: {
        lists: {
            type: Array
        },
        currentTab: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            tabs: ['all','active','completed']
        }
    },
    computed: {
        count() {
            return this.lists.filter(list => !list.completed).length
        }
    },
    methods: {
        changeTabs(item) {
            this.$emit('changeTabs', item)
        },
        clearItem() {
            this.$emit('clearItem')
        }
    }
}
</script>

<style lang="scss" scoped>
    .nav {
        font-weight: 100;
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
        line-height: 30px;
        background: #ffffff;
        font-size: 14px;
        &-left,&-right,&-tabs {
            padding: 0 10px;
            box-sizing: border-box
        }
        &-left,&-right {
            width: 150px
        }
        &-left {
            text-align: left
        }
        &-right {
            text-align: right;
            cursor: pointer;
        }
        &-tabs {
            width: 200px;
            display: flex;
            justify-content: space-around;
            * {
                display: inline-block;
                padding: 0 10px;
                cursor: pointer;
                border: 1px solid rgba(175,47,47,0);
                &.actived {
                    border-color: rgba(175,47,47,0.4);
                    border-radius: 5px;
                }
            }
        }
    }
</style>