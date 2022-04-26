<template>
  <select 
    @change="onChange($event)"
    class="select-box"
  >
    <option
      :key="index" 
      :value="item" 
      v-for="(item, index) in rowsKinds"
    >{{item}}</option>
  </select>
</template>

<script>
import { ref } from "vue"

export default{
  name: "Select-Box-component",
  emit: ["select-change"],
  setup(props, {emit}){
    const rowsKinds = ref([10,30,50,100])
    
    const onChange = (event) => {
      emit("select-change", event.target.value)
    }

    return {
      rowsKinds,
      onChange
    };
  }
}
</script>

<style scoped lang="scss">
  .select-box {
    padding: 10px 15px;
    width: 100px;
    font-size: 14px;
    border: 1px solid #b9b0b0;
    outline: none;
    border-radius: 5px;

    @media only screen and (min-width : 150px) and (max-width : 576px){
      width: 100%;
      margin: 0 auto;
    }
  }
</style>