<template>
  <div class="my-search">
    <input v-model="search" type="text" :placeholder="placeholder" />
    <img
      src="@/assets/icons/search.svg"
      alt="поиск"
      class="form-icon"
      @click="$emit('start-search', search)"
    />
  </div>
</template>

<script>
export default {
  name: 'MySearch',
  props: {
    placeholder: {
      type: String,
      default: 'Поиск'
    }
  },
  emits: ['start-search'],
  data() {
    return {
      search: ''
    }
  },
  updateSearch(value) {
    this.search = value
  }
}
</script>

<style lang="sass" scoped>
.my-search
  display: flex
  align-items: center
  height: 4rem
  flex: 1
  gap: .5rem
  padding: 0.5rem 1rem
  border-bottom: 1px solid $gray

  input
    width: 100%
    padding: .5rem
    font-size: 1.2rem

.form-icon
  cursor: pointer
  transition: 200ms
  border-radius: .5rem
  width: 2.5rem
  height: 2.5rem

  &:hover
    transform: scale(1.1)
    background-color: rgba(0,0, 0, 0.05)
</style>
