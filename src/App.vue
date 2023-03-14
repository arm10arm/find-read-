
<template class="">
  <div class="text-center font-medium text-5xl">Shop list</div>
  <hr class="bg-stone-800 h-1 mx-auto my-4 w-1/2">
  <div class=" grid grid-cols-3 gap-5 p-4 text-slate-100 text-center">

    <div class="bg-stone-700 rounded-md p-4"><a href="#" >SE-ED</a></div>
    <div class="bg-stone-700 rounded-md p-4"><a href="#" >NAIIN</a></div>
    <div class="bg-stone-700 rounded-md p-4"><a href="#" >KINOKUNIYA</a></div>
    <div class="bg-stone-700 rounded-md p-4"><a href="#" >ASIA-BOOKS</a></div>
    <div class="bg-stone-700 rounded-md p-4"><a href="#" >B2S</a></div>
    <div class="bg-stone-700 rounded-md p-4"><a href="#" >KLINGNANGSUE</a></div>
    <div class="bg-stone-700 rounded-md p-4"><a href="#" >WELEARN</a></div>
    <div class="bg-stone-700 rounded-md p-4"><a href="#" >AMARIN</a></div>
    <div class="bg-stone-700 rounded-md p-4"><a href="#" >SPRINGBOOKS</a></div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      title: 'My To-Do App',
      newTask: '',
      tasks: [
        { id: 1, name: 'Learn VUE js', finished: false },
        { id: 2, name: 'Build a Vue App', finished: false },
        { id: 3, name: 'Build Todo App', finished: false }
      ]
    }
  },
  methods: {
    addTask() {
      if (this.newTask.length < 1) return; 

      this.tasks.push({
        id: this.tasks.length + 1,
        name: this.newTask,
        finished: false
      });

      this.newTask = '';
    }
  }
}
</script>

<style></style>
