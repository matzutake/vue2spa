<template>
  <div class="requests-list">
    <header class="requests-list__header">
      <my-button width="auto" class="requests-list__create">
        <template #text>Создать</template>
      </my-button>

      <div class="requests-list__filters">
        <my-search placeholder="Поиск (№ заявки, название)" />
        <my-select placeholder="Дом" />
      </div>
    </header>

    <RequestsTable />

    <footer></footer>
  </div>
</template>

<script>
import RequestsTable from '@/components/Requests/RequestsTable.vue'

export default {
  name: 'RequestsList',
  components: {
    RequestsTable
  }
}
</script>

<style lang="sass" scoped>
.requests-list
  display: flex
  flex-direction: column
  background-color: $white
  flex: 1
  padding: 1.5rem
  border-radius: 1rem

  &__header
    display: flex
    flex-direction: column
    gap: 1.5rem


  &__create
    align-self: flex-end
    width: 10rem

  &__filters
    display: flex
    gap: 1.5rem
    justify-content: space-between
</style>
