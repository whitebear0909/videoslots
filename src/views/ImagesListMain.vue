<template>
  
  <div class="container">
    <div class="container__menu-box">
      <search-box-component
        @search-change="onSearchWordChange"
      />
      <div class="container__menu-box__pagination">
        <select-box-component
          @select-change="onRowsPerPageChange"
        />
        <pagination-component
          class="pagination-component"
          v-model="currentPage"
          :numberOfPages="numberOfPages"
          :numberArray="numberArray"
          @current-change="currentChange"
        />
      </div>
    </div>
    <div class="container__list-box" v-if="!isLoading">
      <div class="container__list-box__item" :key="index" v-for="(image, index) in images">
        <a target="_blank" :href="`https://picsum.photos/id/${image.id}/367/267`">
          <img 
            class="container__list-box__item__img" 
            :src="`https://picsum.photos/id/${image.id}/367/267`" 
          >
        </a>
        <div class="container__list-box__item__desc">{{image.author}}</div>
      </div>
    </div>
    <div class="container__list-box" v-else>
      <spinner-component/>
    </div>
  </div>
  
</template>

<script>
import {
  defineComponent,
  ref,
  onMounted,
  computed,
  reactive,
  watch
} from "vue"

import { useStore } from "vuex"
import PaginationComponent from "../components/PaginationComponent.vue"
import SpinnerComponent from "../components/SpinnerComponent.vue"
import SearchBoxComponent from "../components/SearchBoxComponent.vue"
import SelectBoxComponent from "../components/SelectBoxComponent.vue"

export default defineComponent(
  {
    name: 'images-list-main',
    components: {
      PaginationComponent,
      SpinnerComponent,
      SearchBoxComponent,
      SelectBoxComponent
    },
    setup(){
      const store = useStore()
      const imagesFromStore = reactive(computed(() => store.getters["imageModule/images"]))
      const isLoading = ref(false)
      const images = ref([])

      const currentPage = ref(1)
      const numberOfPages = ref(100)
      const numberArray = ref([1,2,3,4,5])
      const rowsPerPage = ref(10)

      onMounted(() => {
        getImageList()
      })

      const onSearchWordChange = (searchWord) => {
        if(searchWord === "") images.value = imagesFromStore.value.slice()
        else {
          images.value = images.value.filter((item) => {
            return item.author.toLowerCase().includes(searchWord.toLowerCase())
          })
        }
      }

      const onRowsPerPageChange = (value) => {
        rowsPerPage.value = value
        getImageList()
      }

      const currentChange = (value) => {
        currentPage.value = value
        getImageList()
      }

      const getImageList = () => {
        isLoading.value = true
        store.dispatch('imageModule/getAllImages', {page: currentPage.value, limit: rowsPerPage.value}).then((data) => {
          isLoading.value = false
          images.value = data
        })
      }

      watch(currentPage, (value) => {
        getImageList()
        setNumArray(value)
      })

      const setNumArray = (newCurrentPage) => {
        numberArray.value = []
        let minValue = newCurrentPage - 2
        let maxValue = newCurrentPage + 2

        if(newCurrentPage <= 2) {
          minValue = 1
          maxValue = numberOfPages.value < 5 ? numberOfPages.value : 5
        }

        if(newCurrentPage >= numberOfPages.value - 2) {
          minValue = numberOfPages.value - 5
          maxValue = numberOfPages.value < 5 ? 5: numberOfPages.value 
        }

        for(let i = minValue; i <= maxValue; i ++){
          numberArray.value.push(i)
        }
      }

      return {
        images,
        isLoading,
        currentPage,
        numberOfPages,
        currentChange,
        numberArray,
        onSearchWordChange,
        onRowsPerPageChange
      }
    }
  }
)
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container {
  $self: &;
  padding: 15px;

  /* Responsive layout - makes a one column layout instead of a two-column layout */
  @media (max-width: 768px) {
    &__menu-box {
      flex-direction: column;
    }
  }

  &__menu-box {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;


    @media screen and (max-width : 576px)
    {
      &__pagination {
        width: 100%;
      }
    }
  }

  &__list-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;

    @media screen and (max-width : 576px)
    {
      &__item {
        width: 100%;
      }
    }

    &__item {
      margin: 15px;
      border: 1px solid #ccc;
      box-shadow:0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
      text-align: center;
      padding-top: 15px;

      @media screen and (max-width : 576px)
      {
        &__img {
          width: 200px;
        }
      }

      @media only screen and (min-width : 577px) and (max-width : 1024px)
      {
        &__img {
          width: 200px;
        }
      }

      @media only screen and (min-width : 1024px)
      {
        &__img {
          width: 320px;
        }
      }

      &__desc {
        text-align: center;
        padding: 15px;

        text-overflow: ellipsis;
        overflow: hidden;
      }

      &:hover {
        border: 1px solid #777;
      }
    }
  }
} 
</style>