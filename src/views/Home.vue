<template>
  <div class="home-page">
    <div class="home-page__header">
      <h1>Список заявок</h1>
    </div>

    <RequestList />
  </div>
</template>

<script>
import RequestList from '@/components/Requests/RequestsList.vue'

export default {
  name: 'HomePage',
  components: {
    RequestList
  },
  mounted() {
    this.$store.dispatch('getReqList')
  }
}
</script>

<style lang="sass" scoped>
.home-page
  position: absolute
  left: 0
  top: 0
  width: 100%
  height: 100%
  background-color: $gray
  padding: 1.5rem
  display: flex
  flex-direction: column
  gap: 2rem
  overflow: hidden

  &__header
    padding: 0.5rem 1rem
    font-size: 1.6rem
</style>
