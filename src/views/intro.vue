<template>
    <div class="flex items-center justify-center bg-zinc-900"  style="height: 100vh; width: 100%;">
        <div class="container text-center w-64">
            <p class="title text-5xl text-neutral-800	">
                Find-read
            </p>
            <p class="subtitle text-neutral-800	">
                Let's see what do you want
            </p>
            <button class="w-20 h-7 bg-slate-600	adjust rounded-lg"><a  class ="text-neutral-800" href="index.html">Let's see</a></button>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style >
    @import url('https://fonts.googleapis.com/css2?family=Gloock&family=Mitr:wght@300&display=swap');
    *{
        font-family: 'Gloock', serif;
      }
      .title:hover, .subtitle:hover{
        color: whitesmoke;
        padding: 0.5rem;
        text-align: center;
        text-decoration: none;
        transition: all 0.5s ease-out;
      }
      .adjust:hover{
        padding: 0.5rem;
        text-align: center;
        text-decoration: none;
        transition: all 0.5s ease-out;
      }
</style>