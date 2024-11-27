<template>
  <div class="home-page">
    <div class="home-page__header">
      <h1>Список заявок</h1>
    </div>

    <div class="list-wrapper">
      <RequestList ref="RequestList" />
    </div>
  </div>
</template>

<script>
import RequestList from '@/components/Requests/RequestsList.vue'
import RequestModal from '@/components/Requests/RequestModal.vue'

export default {
  name: 'HomePage',
  components: {
    RequestList,
    RequestModal
  },
  async mounted() {
    await this.$store.dispatch('getReqList').then(() => {
      this.$refs.RequestList.loaded = true
    })
  }
}
</script>

<style lang="sass" scoped>
.home-page
  position: absolute
  left: 0
  top: 0
  height: 100%
  width: 100%
  background-color: $gray
  padding: 1.5rem
  display: flex
  flex-direction: column
  gap: 2rem

  .list-wrapper
    flex: 1
    overflow: hidden
    border-radius: 1rem

  &__header
    padding: 0.5rem 1rem
    font-size: 1.6rem
</style>
