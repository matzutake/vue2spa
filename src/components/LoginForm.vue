<template>
  <div class="login-form">
    <header class="login-form__header">
      <span class="login-form__title">Авторизация</span>
    </header>

    <main class="login-form__main">
      <my-input :value="username ? username : '+7'" @input="updateUsername">
        <template #left-icon>
          <img src="@/assets/icons/phone.svg" class="form-icon" alt="phone-icon" />
        </template>
        <template #label>Логин или телефон</template>
      </my-input>

      <my-input
        :value="password"
        :type="showPassword ? 'text' : 'password'"
        :error="passError"
        @input="updatePassword"
      >
        <template #left-icon>
          <img src="@/assets/icons/block.svg" alt="lock-icon" class="form-icon" />
        </template>

        <template #label>Пароль</template>

        <template #right-icon>
          <img
            :src="showPassword ? '/src/assets/icons/eye.svg' : '/src/assets/icons/eye-off.svg'"
            width="24"
            height="24"
            class="password-icon"
            @click="showPassword = !showPassword"
          />
        </template>
      </my-input>

      <span class="login-form__error">{{ error }}</span>
    </main>

    <footer class="login-form__footer">
      <my-button @click="tryLogin">
        <template #text>Войти</template>
      </my-button>
    </footer>
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'LoginForm',
  data() {
    return {
      showPassword: false,
      error: null,
      passError: null
    }
  },
  computed: {
    password() {
      return this.$store.getters.password
    },
    username() {
      return this.$store.getters.username
    }
  },
  methods: {
    updateUsername(value) {
      this.$store.commit('UPDATE_AUTH_FIELD', {
        field: 'username',
        value
      })
      this.error = null
    },
    updatePassword(value) {
      this.$store.commit('UPDATE_AUTH_FIELD', {
        field: 'password',
        value
      })
      this.passError = null
      this.error = null
    },
    async tryLogin() {
      const cleanedUsername = this.username.replace(/\D/g, '')

      try {
        const result = await this.$store.dispatch('login', {
          username: cleanedUsername,
          password: this.password
        })

        this.$store.commit('UPDATE_AUTH_FIELD', {
          field: 'key',
          value: result.key
        })

        this.$store.commit('UPDATE_AUTH_FIELD', {
          field: 'id',
          value: result.employee_id
        })

        router.push({ name: 'home' })
      } catch (error) {
        if (error.response?.data?.data?.password) {
          this.passError = error.response.data.data.password[0]
        } else {
          this.error = error.response?.data?.data?.non_field_errors[0]
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.login-form
  background-color: #ffffff
  padding: 1.5rem
  border-radius: .75rem
  width: 30rem
  height: 22rem
  display: flex
  flex-direction: column
  justify-content: space-between


  &__header
    display: flex
    justify-content: center
    align-items: center
    margin-bottom: 1.5rem
    background-color: $green
    color: $white
    padding: 1.25rem
    border-radius: .5rem
    transform: translateY(-2.75rem)

  &__main
    display: flex
    align-items: center
    flex-direction: column
    gap: 1.5rem
    transform: translateY(-1rem)

  &__error
    color: $red
    font-size: 1rem


.password-icon,
.form-icon
  cursor: pointer
  width: 2.4rem
  height: 2.4rem
</style>
