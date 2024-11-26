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
    </main>

    <footer class="login-form__footer">
      <my-button>
        <template #text>Войти</template>
      </my-button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      showPassword: false
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
    },
    updatePassword(value) {
      this.$store.commit('UPDATE_AUTH_FIELD', {
        field: 'password',
        value
      })
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

.password-icon,
.form-icon
  cursor: pointer
  width: 2.4rem
  height: 2.4rem
</style>
