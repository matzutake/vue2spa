<template>
  <div class="requests-list">
    <header class="requests-list__header">
      <my-button width="auto" class="requests-list__create" @click="createRequest">
        <template #text>Создать</template>
      </my-button>

      <div class="requests-list__filters">
        <my-search placeholder="Поиск (№ заявки, название)" @start-search="updateSearch" />
        <my-select placeholder="Дом" :options="premisesOptions" @input="updatePremises" />
      </div>
    </header>

    <div class="table-wrapper">
      <RequestsTable :loaded="loaded" @openRequest="editRequest" />
    </div>

    <footer v-if="loaded" class="requests-list__footer">
      <div class="count">
        <div class="range">
          <span style="font-weight: bold">{{ currentStart }}</span>
          <span> - </span>
          <span style="font-weight: bold">{{ currentEnd }}</span>
          <span> из </span>
          <span style="font-weight: bold">{{ reqData?.count }}</span>
        </div>
        <my-select
          :value="reqData?.page_size"
          :options="[
            { value: 10, label: '10' },
            { value: 25, label: '25' },
            { value: 50, label: '50' },
            { value: 100, label: '100' }
          ]"
          placeholder="Записей на странице"
          @input="updatePageSize"
        />
      </div>

      <RequestPagination @updatePage="updatePage" />

      <create-edit-modal
        v-if="isOpen"
        :type="modalType"
        ref="createEditModal"
        @close="closeModal"
      />
    </footer>
  </div>
</template>

<script>
import RequestsTable from '@/components/Requests/RequestsTable.vue'
import RequestPagination from './RequestPagination.vue'
import CreateEditModal from './CreateEditModal.vue'

export default {
  name: 'RequestsList',
  components: {
    RequestsTable,
    RequestPagination,
    CreateEditModal
  },
  data() {
    return {
      loaded: false,
      isOpen: false,
      modalType: 'create'
    }
  },
  computed: {
    reqData() {
      return this.$store.getters.reqData
    },
    currentStart() {
      return this.reqData?.page_size * this.reqData?.page
    },
    currentEnd() {
      let end = this.reqData?.page_size * (this.reqData?.page + 1)
      if (end > this.reqData?.count) end = this.reqData?.count
      return end
    },
    premisesOptions() {
      return this.$store.getters.premises.map((p) => ({ label: p.address, value: p.id }))
    }
  },
  methods: {
    async updatePageSize(value) {
      this.$store.commit('SET_REQ_DATA', {
        ...this.reqData,
        page_size: value
      })

      const payload = {
        page_size: value,
        page: this.reqData?.page
      }
      this.loaded = false
      await this.$store.dispatch('getReqList', payload).then(() => {
        this.loaded = true
      })
    },
    async updatePage(page) {
      this.$store.commit('SET_REQ_DATA', {
        ...this.reqData,
        page
      })

      const payload = {
        page_size: this.reqData?.page_size,
        page
      }
      this.loaded = false
      await this.$store.dispatch('getReqList', payload).then(() => {
        this.loaded = true
      })
    },

    async updatePremises(value) {
      const payload = {
        page_size: this.reqData?.page_size,
        page: 1,
        premise_id: value
      }
      this.loaded = false
      await this.$store.dispatch('getReqList', payload).then(() => {
        this.loaded = true
      })
    },

    async updateSearch(value) {
      const payload = {
        page_size: this.reqData?.page_size,
        page: 1,
        search: value
      }

      this.loaded = false
      await this.$store.dispatch('getReqList', payload).then(() => {
        this.loaded = true
      })
    },

    async editRequest(request) {
      this.$store.dispatch('getCurrentReq', request.id)

      this.isOpen = true
      this.modalType = 'edit'
    },

    createRequest() {
      this.isOpen = true
      this.modalType = 'create'
    },
    closeModal() {
      this.isOpen = false
    }
  }
}
</script>

<style lang="sass" scoped>
.table-wrapper
  @include scrollbar
  overflow-y: auto
  flex: 1
  max-height: 65vh

.requests-list
  display: flex
  flex-direction: column
  background-color: $white
  flex: 1
  padding: 1.5rem
  gap: 1.5rem
  border-radius: 1rem

  &__header
    display: flex
    flex-direction: column
    gap: 1.5rem

  &__footer
    display: flex
    justify-content: space-between
    align-items: flex-end
    height: 5vh

  &__create
    align-self: flex-end
    width: 10rem

  &__filters
    display: flex
    gap: 1.5rem
    justify-content: space-between

.count
  display: flex
  gap: 1rem
  align-items: center
</style>
