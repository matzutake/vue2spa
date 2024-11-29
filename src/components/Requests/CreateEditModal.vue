<template>
  <div ref="backdrop" class="create-edit-backdrop">
    <div class="create-edit-modal">
      <header>
        <h1>{{ type === 'create' ? 'Создание заявки' : 'Редактирование заявки' }}</h1>
        <div class="status">
          <span>{{ type === 'create' ? 'Новая' : request.status?.name }}</span>
        </div>
      </header>

      <main></main>

      <footer></footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateEditModal',
  props: {
    type: {
      type: String,
      default: 'create'
    }
  },
  mounted() {
    this.$refs.backdrop.addEventListener('click', this.close)
  },
  beforeDestroy() {
    this.$store.commit('SET_CURRENT_REQUEST', {})
  },
  computed: {
    request() {
      return this.$store.getters.currentRequest
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="sass" scoped>
.create-edit-backdrop
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background-color: rgba(0, 0, 0, 0.5)
  display: flex
  z-index: 1000
  justify-content: center
  align-items: center

.create-edit-modal
  background-color: $white
  padding: 2rem
  border-radius: .75rem
  width: 60rem

  header
    display: flex
    justify-content: space-between

    h1
      font-size: 1.6rem
      font-weight: 500

    .status
      display: flex
      align-items: center
      gap: .5rem
      font-size: 1.4rem

  main
    margin-top: 2rem
</style>
