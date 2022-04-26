<template>
  <div class="pagination-container" aria-label="row pagination">
    <ul v-if="numberOfPages >= 1" class="pagination">
      <li
        class="page-item"
        aria-label="go to previous page"
        @click="previous()"
        :class="{
          disabled: currentPage === 1,
        }"
      >
        <span class="page-link">&laquo;</span>
      </li>
      <li
        v-for="(item, index) in numberArray"
        :key="index"
        :aria-label="'go to page ' + index"
        class="page-item"
        @click="setCurrentPage(item)"
      >
        <div
          class="page-link"
          :class="{
            'active-page': currentPage === item,
          }"
        >
          {{ item }}
        </div>
      </li>
      <li
        class="page-item"
        :class="{
          disabled: currentPage === numberOfPages || !numberOfPages,
        }"
        aria-label="go to next page"
        @click="next()"
      >
        <div class="page-link">&raquo;</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { toRefs } from "vue"

export default{
  name: "pagination-component",
  emit: ["current-change"],
  props: {
    numberOfPages: {
      required: true,
    },
    modelValue: {
      required: true,
      type: Number,
    },
    numberArray: {
      required: true,
      type: Array,
    },
  },
  setup(props, { emit }){
    const { numberOfPages, modelValue: currentPage, numberArray } = toRefs(props)

    //number button pressed
    const setCurrentPage = (number) => {
      emit("current-change", number)
    }

    //prev button pressed
    const previous = () => {
      if (currentPage.value === 1) return;
      emit("current-change", currentPage.value - 1)
    }

    //next button pressed
    const next = () => {
      if (currentPage.value >= numberOfPages.value) return
      emit("current-change", currentPage.value + 1)
    }

    return {
      setCurrentPage,
      previous,
      next,
      currentPage,
      // eslint-disable-next-line vue/no-dupe-keys
      numberArray
    };
  }
}
</script>

<style scoped lang="scss">
  .pagination-container {
    display: inline-block;
  }

  .pagination {
    background: white;
    margin: 0px;
    padding: 10px;
    display: flex;
    gap: 5px;
    align-items: center;
    border: none;
    box-sizing: border-box;
    overflow: hidden;
    word-wrap: break-word;
    align-content: center;
    border-radius: 14px;
  }

  .page-item {
    display: flex;
    cursor: pointer;
    margin-bottom: 0px;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
  }

  .page-link {
    color: #666B85;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 14px;
    font-weight: 800;
    &:hover {
      color: #333333;
      background-color: #e9e9e9;
      border: none;
    }
  }

  .active-page {
    background-color: #60d394 !important;
    color: white !important;
    &:hover {
      border: none;
    }
  }

  .disabled {
    .page-link {
      background-color: #f9fafb;
    }
    cursor: not-allowed;
  }
</style>