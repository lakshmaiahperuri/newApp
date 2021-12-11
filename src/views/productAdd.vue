<template>
<div class="columns">
      <div class="column is-4">
        <div class="card">
       <p className="card-header-title is-centered"> Product Details</p>
       <div class="card-content">
          <div class="form-group">
    </div>
        <label class="label">Product Name:</label>
        <input class="input" placeholder="Name" type="text"  v-model="name" required>
        <label class="label" >Product Price:</label>
        <input placeholder="Price" type="number" class="input" v-model="price" required>
          <label class="label">Product Model:</label>
        <input class="input" placeholder="Model" type="text" v-model="model" required>
        </div>
        <div class="box">
         <button @click="addProduct" class="button is-primary"  >Add Product</button>
        </div>
       </div>
        </div>
        </div>
</template>

<script>
 import { reactive, toRefs } from 'vue'
 //import vueValidate from'vee-validate'
 import products from '../services/products'
 import {Product} from '../services/productData'
    // Vue.use(vueValidate);
export default ({
  setup(){
    const state = reactive({ 
      name: '',
      price: '',
      model: ''
    });

    const addProduct = async () => {
      console.log('aaaaaaaaaaaa', {
        name: state.name, price: state.price, model: state.model
      });
      const product = await products.createProduct({
        name: state.name, price: state.price, model: state.model
      });
      console.log(product,"Lakhsm");
    }
    return {
      ...toRefs(state),
      addProduct
    };
  },
  })
</script>

<style scoped>
#searchBox{
  position: relative;
  width: 350px;
}
#form{
  position: relative;
  align-content: right;
}
.section{
  background-color: #67926C;
}
.card{
    height: 595px;
    width: 500px;
    margin: 450px;
    display: inline-block;
    border-radius: 10px;
}
.card{
  margin-top: 0mm;
}
</style>