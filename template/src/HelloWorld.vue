<template>
  <h1>Hello {{ message }}</h1>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const message = ref('World')

    return { message }
  },
})
</script>

<style>
h1 {
  color: red;
}
</style>
