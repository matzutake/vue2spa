<template>
  <div class="my-input">
    <div class="icon-wrapper left">
      <slot name="left-icon" />
    </div>

    <div class="my-input__inner">
      <input
        :value="value"
        :type="type === 'password' ? 'password' : 'text'"
        class="my-input__input"
        required
        @input="$emit('input', $event.target.value)"
      />

      <div class="my-input__label">
        <slot name="label" />
      </div>
    </div>

    <div class="icon-wrapper right">
      <slot name="right-icon" class="my-input__icon right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="sass" scoped>
.my-input
  display: flex
  align-items: center
  width: 100%
  position: relative
  gap: .5rem
  border-bottom: 1px solid $gray


  &__inner
    position: relative
    width: 100%

  &__input
    width: 100%
    padding: .75rem 0
    font-size: 1.2rem
    caret-color: $green
    transition: 200ms

    &:focus
      outline: none
      border-color: $green

    &:focus + .my-input__label
      color: $green
      font-size: 1rem
      top: -60%

    &:valid + .my-input__label
      top: -60%
      font-size: 1rem



  &__label
    position: absolute
    pointer-events: none
    top: 5%
    left: 0
    width: 100%
    height: 100%
    pointer-events: none
    padding: .75rem 0
    font-size: 1.2rem
    transition: 200ms
    color: $dark-gray

.right
  margin-right: 1rem
</style>
