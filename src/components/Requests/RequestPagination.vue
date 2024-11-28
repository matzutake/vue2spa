<template>
  <div class="pagination">
    <div class="doubles">
      <img
        src="@/assets/icons/doubleArrow.svg"
        width="24"
        height="24"
        style="transform: rotate(180deg)"
        class="doubleArrow"
        @click="goToFirstPage"
      />
      <div class="singles">
        <img
          src="@/assets/icons/simpleArrow.svg"
          alt="simpleArrow"
          class="simpleArrow"
          width="24"
          height="24"
          style="transform: rotate(180deg)"
          @click="goToPreviousPage"
        />
        <ul class="pageList">
          <li
            v-for="(page, index) in visiblePages"
            :key="index"
            class="pageList__item"
            :class="{ active: page === currentPage, dots: page === '...' }"
            @click="page !== '...' && changePage(page)"
          >
            {{ page }}
          </li>
        </ul>
        <img
          src="@/assets/icons/simpleArrow.svg"
          alt="simpleArrow"
          class="simpleArrow"
          width="24"
          height="24"
          @click="goToNextPage"
        />
      </div>
      <img
        src="@/assets/icons/doubleArrow.svg"
        width="24"
        height="24"
        class="doubleArrow"
        @click="goToLastPage"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'RequestPagination',
  emits: ['updatePage'],
  computed: {
    pages() {
      return this.$store.getters.reqData.pages
    },
    currentPage() {
      return this.$store.getters.reqData.page
    },
    visiblePages() {
      const pages = []
      const totalPages = this.pages
      const current = this.currentPage

      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)

        if (current > 5) pages.push('...')

        const start = Math.max(2, current - 2)
        const end = Math.min(totalPages - 1, current + 2)
        for (let i = start; i <= end; i++) {
          pages.push(i)
        }

        if (current < totalPages - 4) pages.push('...')

        pages.push(totalPages)
      }

      return pages
    }
  },
  methods: {
    changePage(page) {
      this.$emit('updatePage', page)
    },
    goToFirstPage() {
      this.changePage(1)
    },
    goToLastPage() {
      this.changePage(this.pages)
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.changePage(this.currentPage - 1)
      }
    },
    goToNextPage() {
      if (this.currentPage < this.pages) {
        this.changePage(this.currentPage + 1)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.pageList__item
  &.dots
    cursor: default
    pointer-events: none

.pagination
  display: flex

.doubles
  display: flex
  align-items: center
  gap: 3rem

.singles
  display: flex
  align-items: center
  gap: 1rem

.doubleArrow,
.simpleArrow
  cursor: pointer
  border-radius: .5rem
  transition: 200ms

  &:hover
    background-color: rgba(0, 0, 0, 0.1)

.pageList
  display: flex
  align-items: center
  gap: 1rem

  &__item
    display: flex
    justify-content: center
    align-items: center
    width: 3.5rem
    height: 3.5rem
    cursor: pointer
    border-radius: 50%
    transition: 200ms

    &:hover
      background-color: rgba(0, 0, 0, 0.1)

    &.active
      background-color: $green
      color: $white
</style>
