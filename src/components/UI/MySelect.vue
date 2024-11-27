<template>
  <div class="my-select">
    <select class="my-select__select" :value="value" @input="$emit('input', $event.target.value)">
      <option class="my-select__option" :value="option" v-for="option in options" :key="option">
        {{ option }}
      </option>
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
    },
    options: {
      type: Array,
      default: () => []
    },
    value: {
      type: [String, Number],
      default: ''
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
    font-size: 1.2rem
    background-color: transparent

  &__option
    color: $dark-gray
</style>
