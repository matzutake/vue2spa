<template>
  <div class="my-search">
    <input type="text" :placeholder="placeholder" @input="$emit('input', $event.target.value)" />
    <img
      src="@/assets/icons/search.svg"
      width="24"
      height="24"
      alt="поиск"
      @click="$emit('search')"
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
  emits: ['input', 'search']
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
</style>
