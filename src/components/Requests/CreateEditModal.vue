<template>
  <div class="create-edit-modal"></div>
</template>

<script>
export default {
  name: 'CreateEditModal',
  props: {
    type: {
      type: String,
      default: 'create'
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="sass" scoped>
.create-edit-modal
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.5)
  display: flex
  z-index: 1000
  justify-content: center
  align-items: center
</style>
