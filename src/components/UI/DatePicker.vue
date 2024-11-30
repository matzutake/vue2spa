<template>
  <div class="datepicker">
    <input
      type="datetime-local"
      :value="new Date(value).toISOString().slice(0, 16)"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'DatePicker',
  props: {
    value: {
      type: [String, Date],
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
