<template>
  <div :class="['todo-item', list.completed ? 'completed' : '']">
      <input 
        type="checkbox"
        class="todo-item-toggle"
        v-model="list.completed"
      />
      <label>{{list.content}}</label>
      <button class="todo-item-del" @click="delItem(list.id)"></button>
  </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Object,
            required: true
        }
    },
    methods: {
        delItem(id) {
            this.$emit('delItem', id)
        }
    }
}
</script>

<style lang="scss" scoped>
    .todo-item {
        position: relative;
        background: #fff;
        font-size: 24px;
        border-bottom: 1px solid rgba(0,0,0,.06);
        label {
            white-space: pre-line;
            word-break: break-all;
            padding: 15px 60px 15px 15px;
            margin-left: 45px;
            display: block;
            line-height: 1.2;
            transition: 0.4s;
        }
        &.completed {
            label {
                color: #d9d9dd;
                text-decoration: line-through
            }
        }
        &-toggle {
            text-align: center;
            width: 40px;
            height: 40px;
            position: absolute;
            top: 9px;
            bottom: 0;
            margin: auto 0;
            border: none;
            appearance: none;
            outline: none;
            cursor: pointer;
            &:after {
               content:  url('../assets/images/done.svg')
            }
            &:checked:after {
                content:  url('../assets/images/completed.svg')
            }
        }
        &-del {
            position: absolute;
            top: 11px;
            right: 10px;
            bottom: 0;
            width: 40px;
            height: 40px;
            margin: auto 0;
            font-size: 30px;
            background-color: transparent;
            border-width: 0;
            cursor: pointer;
            outline:none;
            background: url('../assets/images/close.svg') no-repeat
        }
    }
</style>