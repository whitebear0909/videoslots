<template>
  <div class="search">
    <input 
      class="search__search-input" 
      v-on:keyup.enter="onSearch" 
      v-model="searchWord"
      placeholder="Search..."
    />
    <button 
      class="search__search-button" 
      type="button"
      @click="onSearch"
    >
      <i class="fa fa-search"></i>
    </button>
  </div>
</template>

<script>
import { ref } from "vue"

export default{
  name: "Search-Box-component",
  emit: ["search-change"],
  setup(props, {emit}){
    const searchWord = ref("")
    const onSearch = () => {
      emit("search-change", searchWord.value)
    }

    return {
      searchWord,
      onSearch
    };
  }
}
</script>

<style scoped lang="scss">
  .search
  {
    border: 2px solid #60d394 ;
    overflow: auto;
    border-radius: 5px;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;

    &__search-input {
      border: 0px;
      padding: 10px 10px;
      &:focus {
        outline: none;
      }
    }

    &__search-button {
      border: 0px;
      background: none;
      background-color: #60d394;
      color: #fff;
      float: right;
      padding: 10px;
      border-radius-top-right: 5px;
      -moz-border-radius-top-right: 5px;
      -webkit-border-radius-top-right: 5px;
      border-radius-bottom-right: 5px;
      -moz-border-radius-bottom-right: 5px;
      -webkit-border-radius-bottom-right: 5px;
      cursor:pointer;
    }
  }

  /* ===========================
    ====== Media Query for Search Box ====== 
    =========================== */

  @media only screen and (min-width : 150px) and (max-width : 576px)
  {
    .search
    {
      width: 100%;
      margin: 0 auto;
      margin-bottom: 10px;
    }
  }
</style>