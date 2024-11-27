<template>
  <teleport to="body">
    <Transition name="fade">
      <div class="backdrop" ref="backdrop">
        <div class="request-modal"></div>
      </div>
    </Transition>
  </teleport>
</template>

<script>
export default {
  name: 'RequestModal'
}
</script>

<style lang="sass" scoped>
.backdrop
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
