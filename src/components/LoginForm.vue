<template>
  <div class="login-form">
    <header class="login-form__header">
      <span class="login-form__title">Авторизация</span>
    </header>

    <main class="login-form__main"></main>

    <footer class="login-form__footer">
      <button class="login-form__button">Войти</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LoginForm'
}
</script>

<style lang="sass" scoped>
.login-form
  background-color: #ffffff
  padding: 1.5rem
  border-radius: .75rem
</style>
