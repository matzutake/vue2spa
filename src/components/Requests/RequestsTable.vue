<template>
  <table class="requests-table">
    <thead class="requests-table__header">
      <tr class="requests-table__row">
        <th>
          <span>№</span>
          <img src="@/assets/icons/sort.svg" width="24" height="24" alt="сортировка" />
        </th>
        <th>Создана</th>
        <th>Адрес</th>
        <th>Заявитель</th>
        <th>Описание</th>
        <th>Срок</th>
        <th>Статус</th>
      </tr>
    </thead>

    <tbody class="requests-table__body">
      <tr v-for="request in requests" class="requests-table__row">
        {{
          request.id
        }}
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'RequestsTable',
  computed: {
    requests() {
      return this.$store.getters.reqList
    }
  }
}
</script>

<style lang="sass" scoped>
.requests-table
  width: 100%
  border-collapse: collapse

  th
    text-align: left
    padding: 1rem 1.5rem
    font-weight: normal
    line-height: 2rem

  &__row
    border-bottom: 1px solid $gray

  &__header
    color: $green

  &__body
    overflow-y: auto
    max-height: 10rem
</style>
