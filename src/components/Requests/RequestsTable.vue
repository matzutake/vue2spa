<template>
  <table class="requests-table">
    <thead class="requests-table__header">
      <tr class="requests-table__row">
        <td>
          <span>№</span>
          <img
            src="@/assets/icons/sort.svg"
            width="24"
            height="24"
            alt="сортировка"
            :style="{ transform: `rotate(${numDir !== 'asc' ? 0 : 180}deg)` }"
            @click="sortByNumber"
          />
        </td>
        <td>
          <span>Создана</span>
          <img
            src="@/assets/icons/sort.svg"
            width="24"
            height="24"
            alt="сортировка"
            :style="{ transform: `rotate(${dateDir !== 'asc' ? 0 : 180}deg)` }"
            @click="sortByDate"
          />
        </td>
        <td>Адрес</td>
        <td>Заявитель</td>
        <td>Описание</td>
        <td>Срок</td>
        <td>
          <span>Статус</span>
          <img
            src="@/assets/icons/sort.svg"
            width="24"
            height="24"
            alt="сортировка"
            :style="{ transform: `rotate(${statusDir !== 'asc' ? 0 : 180}deg)` }"
            @click="sortByStatus"
          />
        </td>
      </tr>
    </thead>

    <tbody v-if="loaded" class="requests-table__body">
      <tr v-for="request in requests" class="requests-table__row">
        <td @click.stop="openRequest(request)">
          <span class="requests-table__number">{{ request.number }}</span>
        </td>
        <td>
          {{ new Date(request.created_at).toLocaleDateString() }}
        </td>
        <td>{{ parseAddress(request) }}</td>
        <td>{{ parseName(request.applicant) }}</td>
        <td>{{ request.description }}</td>
        <td>
          {{
            new Date(request.due_date).toLocaleDateString('default', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          }}
        </td>
        <td>{{ request.status.name }}</td>
      </tr>
    </tbody>

    <tbody v-else class="requests-table__body">
      <tr v-for="i in 30" class="loading">
        <th colspan="7"></th>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'RequestsTable',
  props: {
    loaded: {
      type: Boolean,
      default: false,
      numDir: 'asc',
      dateDir: 'asc',
      statusDir: 'asc'
    }
  },
  computed: {
    requests() {
      return this.$store.getters.reqList
    }
  },
  methods: {
    parseName(applicant) {
      let last_name = applicant?.last_name || ''
      let first_name = applicant?.first_name || ''
      let patronymic_name = applicant?.patronymic_name || ''

      if (last_name) {
        last_name.charAt(0).toUpperCase()
      }

      if (first_name) {
        first_name = first_name.charAt(0).toUpperCase() + '.'
      }

      if (patronymic_name) {
        patronymic_name = patronymic_name.charAt(0).toUpperCase() + '.'
      }

      return `${last_name} ${first_name} ${patronymic_name}`
    },
    parseAddress(request) {
      let address = request?.premise?.address || ''
      let apartment = request?.apartment?.label || ''

      if (address && apartment) {
        return `${address}, ${apartment}`
      } else {
        return address + apartment
      }
    },
    openRequest(request) {
      this.$emit('openRequest', request)
    },
    sortByNumber() {
      this.$store.commit('SORT_BY_NUMBER', this.numDir)
      this.numDir = this.numDir === 'asc' ? 'desc' : 'asc'
    },
    sortByDate() {
      this.$store.commit('SORT_BY_DATE', this.dateDir)
      this.dateDir = this.dateDir === 'asc' ? 'desc' : 'asc'
    },
    sortByStatus() {
      this.$store.commit('SORT_BY_STATUS', this.statusDir)
      this.statusDir = this.statusDir === 'asc' ? 'desc' : 'asc'
    }
  }
}
</script>

<style lang="sass" scoped>
.requests-table
  width: 100%
  border-collapse: collapse

  td
    text-align: left
    padding: 1rem 1.5rem
    font-weight: normal
    line-height: 2rem
    max-width: 20rem
    overflow: hidden
    text-overflow: ellipsis
    text-wrap: nowrap

  &__row
    border-bottom: 1px solid $gray


  &__header
    color: $green

  &__body
    grid-template-columns: repeat(7, 1fr)


  &__number
    display: flex
    align-items: center
    justify-content: center
    width: fit-content
    background-color: $green
    padding: .5rem 1.25rem
    border-radius: .5rem
    color: $white

.loading
  height: 5rem
  border-radius: 1rem
  border-bottom: 1px solid $gray
  animation: loading-animation 1.5s linear infinite
  background: linear-gradient(90deg, rgba(61, 61, 61, 0.1) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(61, 61, 61, 0.1) 100%)
  background-size: 200% 100%

@keyframes loading-animation
  0%
    background-position: 200% 0
  100%
    background-position: -200% 0
</style>
