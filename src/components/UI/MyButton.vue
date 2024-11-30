<template>
  <div class="my-button" @click.stop="$emit('click')">
    <slot name="text" />
  </div>
</template>

<script>
export default {
  name: 'MyButton'
}
</script>

<style lang="sass" scoped>
.my-button
  background-color: $green
  color: $white
  padding: .75rem
  border-radius: .75rem
  display: flex
  justify-content: center
  align-items: center
  cursor: pointer
  transition: 200ms
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1)

  &:hover
    background-color: $green-hover
</style>
