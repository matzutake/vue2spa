<template>
  <div class="my-textarea__wrapper">
    <div class="my-textarea" :class="{ 'my-textarea--error': error }">
      <div class="icon-wrapper left">
        <slot name="left-icon" />
      </div>

      <div class="my-textarea__inner">
        <textarea
          :value="value"
          class="my-textarea__input"
          required
          @input="$emit('input', $event.target.value)"
        ></textarea>

        <div class="my-textarea__label">
          <slot name="label" />
        </div>
      </div>

      <div class="icon-wrapper right">
        <slot name="right-icon" class="my-textarea__icon right" />
      </div>
    </div>

    <div v-if="error" class="my-textarea__error">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextArea',
  props: {
    value: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="sass" scoped>
.my-textarea
  display: flex
  align-items: center
  width: 100%
  position: relative
  gap: .5rem
  border-bottom: 1px solid $gray

  &--error
    border-color: $red

  &__wrapper
    display: flex
    flex-direction: column
    width: 100%
    gap: 1rem

  &__inner
    position: relative
    width: 100%

  &__input
    @include scrollbar
    width: 100%
    height: 8rem
    padding: .75rem 0
    font-size: 1.2rem
    caret-color: $green
    transition: 200ms
    resize: vertical
    border: none
    outline: none
    background: transparent
    resize: none

    &:focus
      outline: none
      border-color: $green

    &:focus + .my-textarea__label
      color: $green
      font-size: 1rem
      top: -30%

    &:valid + .my-textarea__label
      top: -30%
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

  &__error
    color: $red
    font-size: 1rem

.right
  margin-right: 1rem
</style>
