<template>
  <div class="my-select">
    <select class="my-select__select">
      <option class="my-select__option">{{ placeholder }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'MySelect',
  props: {
    placeholder: {
      type: String,
      default: 'Выбрать'
    }
  }
}
</script>

<style lang="sass" scoped>
.my-select
  display: flex
  border-bottom: 1px solid $gray
  flex: 1
  height: 4rem

  &__select
    width: 100%
    padding: .75rem 1rem
    color: $dark-gray
    font-size: 1.2rem
    background-color: transparent

  &__option
    color: $dark-gray
</style>
