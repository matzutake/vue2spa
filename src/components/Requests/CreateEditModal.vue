<template>
  <div ref="backdrop" class="create-edit-backdrop">
    <div ref="modal" class="create-edit-modal">
      <header>
        <h1>
          {{
            type === 'create'
              ? 'Создание заявки'
              : `Заявка №${request.number} (от ${new Date(
                  request.created_at
                ).toLocaleDateString()})`
          }}
        </h1>
        <div class="status">
          <span>{{ type === 'create' ? 'Новая' : request.status?.name }}</span>
        </div>
      </header>

      <main class="create-edit-modal__main">
        <div class="top">
          <my-select
            :value="request.premise?.id || null"
            :options="premises"
            @input="updatePremise"
          />
          <my-select
            :value="request.apartment?.id || null"
            :options="apartments"
            @input="updateApartment"
          />
          <date-picker :value="request.due_date || new Date()" @input="updateDueDate" />
        </div>
        <div class="middle">
          <my-input
            :value="request.applicant?.last_name"
            @input="(value) => updateApplicant(value, 'last_name')"
          >
            <template #label>Фамилия</template>
          </my-input>
          <my-input
            :value="request.applicant?.first_name"
            @input="(value) => updateApplicant(value, 'first_name')"
          >
            <template #label>Имя</template>
          </my-input>
          <my-input
            :value="request.applicant?.patronymic_name"
            @input="(value) => updateApplicant(value, 'patronymic_name')"
          >
            <template #label>Отчество</template>
          </my-input>
          <my-input
            :value="request.applicant?.username"
            @input="(value) => updateApplicant(value, 'username')"
          >
            <template #label>Телефон</template>
          </my-input>
        </div>
        <div class="footer">
          <my-textarea
            :value="request.description"
            @input="(value) => updateRequest(value, 'description')"
          >
            <template #label>Описание заявки</template>
          </my-textarea>
        </div>
      </main>

      <footer>
        <my-button class="create-edit-modal__confirm" @click="confirmAction">
          <template #text>
            <span style="padding: 0.25rem 1rem; font-size: 1.4rem">{{
              type === 'create' ? 'Создать' : 'Сохранить'
            }}</span>
          </template>
        </my-button>
      </footer>
    </div>
  </div>
</template>

<script>
import DatePicker from '@/components/UI/DatePicker.vue'

export default {
  name: 'CreateEditModal',
  components: { DatePicker },
  props: {
    type: {
      type: String,
      default: 'create'
    },
    loaded: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'updateList'],
  async mounted() {
    document.addEventListener('click', this.clickOutside)

    if (this.type === 'edit') {
      await this.$store.dispatch('getApartments', { premise_id: this.request.premise_id })
    }
  },
  beforeDestroy() {
    this.$store.commit('SET_CURRENT_REQUEST', {
      premise: {
        id: null
      },
      apartment: {
        id: null
      },
      due_date: null,
      applicant: {
        last_name: '',
        first_name: '',
        patronymic_name: '',
        username: ''
      },
      status: {
        id: 1
      }
    })
  },
  computed: {
    request() {
      return this.$store.getters.currentRequest || {}
    },
    premises() {
      return this.$store.getters.premises.map((p) => ({ label: p.address, value: p.id }))
    },
    apartments() {
      return this.$store.getters.apartments.map((a) => ({ label: a.label, value: a.id }))
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    clickOutside(e) {
      if (this.$refs.backdrop === e.target) this.close()
    },
    updateApplicant(value, field) {
      this.$store.commit('UPDATE_REQUEST_APPLICANT', {
        field,
        value
      })
    },
    updateRequest(value, field) {
      this.$store.commit('UPDATE_CURRENT_REQUEST', {
        field,
        value
      })
    },
    updateDueDate(value) {
      this.$store.commit('UPDATE_CURRENT_REQUEST', {
        field: 'due_date',
        value
      })
    },
    async updatePremise(value) {
      await this.$store.dispatch('updatePremise', {
        search: this.premises.find((p) => p.value === value).label
      })
      await this.$store.dispatch('getApartments', { premise_id: value })
    },
    updateApartment(value) {
      this.$store.commit('UPDATE_APARTMENT', value)
    },

    async confirmAction() {
      const payload = {
        id: this.request.id,
        number: this.request.number,
        description: this.request.description,
        status: this.request.status,
        due_date: this.request.due_date,
        apartment_id: this.request.apartment.id,
        premise_id: this.request.premise.id,
        applicant: {
          last_name: this.request.applicant.last_name,
          first_name: this.request.applicant.first_name,
          patronymic_name: this.request.applicant.patronymic_name,
          username: this.request.applicant.username
        }
      }
      if (this.type === 'create') {
        await this.$store.dispatch('createRequest', payload).then(() => {
          this.$emit('updateList')
          this.$emit('close')
        })
      } else {
        await this.$store.dispatch('updateRequest', payload).then(() => {
          this.$emit('updateList')
          this.$emit('close')
        })
      }
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
  max-height: 60rem
  overflow: auto
  display: flex
  flex-direction: column
  gap: 2.5rem

  &__main
    display: flex
    flex-direction: column
    gap: 2.5rem

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

  footer
    display: flex
    justify-content: flex-end

.top,
.middle
  display: flex
  gap: 1rem
</style>
