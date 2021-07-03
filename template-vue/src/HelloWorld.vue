<template>
  <div class="center">
    <h1>Hello {{ message }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const message = ref('World Vue')

    return { message }
  },
})
</script>

<style>
h1 {
  color: red;
}

.center {
  height: 100px;
  padding: 10px 0;
  display: flex;
  justify-content: center;
}
</style>
