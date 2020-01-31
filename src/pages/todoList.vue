<template>
   <div>
       <Header/>
       <Todo/>
       <Footer/>
   </div>
</template>

<script>
import Header from 'c/header';
import Footer from 'c/footer';
import Todo from 'c/todo';
export default {
    components: {
        Header,
        Footer,
        Todo
    }
}
</script>

<style>

</style>