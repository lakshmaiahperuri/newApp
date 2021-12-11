<template>
<div id="list">
 <br></br>
  <div id="nav" class="columns is-right">
  <input class="input is-rounded" placeholder="search by name" id="searchBox" type="text" v-model="search">
  <button class="button is-primary" type="submit" @click="searchList(search)">Search</button>
  </div>
<br><strong>ALL THE PRODUCTS</strong></br>
<section  class="section">
  <Vuetable
              ref="Vuetable"
              :api-mode="false"
              :fields="headers"
              :data="productList"
            >
           <div slot="price" slot-scope="props"><span>$<i class="fa fas-dollar-sign"></i></span><strong>{{props.rowData.price}}</strong></div>
           <div slot="name" slot-scope="props"><span>$<i class="fa fas-dollar-sign"></i></span><strong>{{props.rowData.name}}</strong></div>
           <div slot="actionFields" slot-scope="props">
              <button class="button is-primary"  @click.prevent="addToCart(props.rowData)">
                Add to Cart</button>
                 <b-modal v-model:active="isComponentModalActive"
                 has-modal-card
                 trap-focus
                 aria-role="dialog"
                 aria-modal>
           <modal :product="product"></modal>
         </b-modal>

         </div>
   </Vuetable>
</section>
</div>
</template>

<script>
import Vuetable from 'vuetable-2';
import { mapState } from 'vuex';
import productList from './productList';
import products from '../services/products';
import Product from '../services/productData';
import modal from '../components/components/modal';

export default {
  components: {
    productList,
    Vuetable,
    modal,
  },
  data() {
    return {
      search: '',
      productList: [],
      headers: [
        {
          name: 'name',
          title: 'Product Name',
          width: '34.5%',
        },
        {
          name: 'model',
          title: '<i class="fa fa"></i>Model ',
          width: '24%',
        },
        {
          name: 'price',
          title: 'Price',
          width: '30%',
        },
        {
          name: 'actionFields',
          title: 'Actions',
          width: '60%',
        },
      ],
      productsList: [],
      _id: this.$route.params._id,
      product: {
      },
      isComponentModalActive: false,
    };
  },
  async created() {
    let res2 = '';
    res2 = await products.productList();
    this.productList = res2;
  },
  methods: {
    async searchList(search) {
      let res = '';
      res = await products.productListBySearch(search);
      this.productList = res;
      console.log(res);
      console.log(this.productList);
    },
    async addToCart(product) {
      console.log('!!!!!!!!!!!!!!!!!!!', product);
      this.product = product;
      this.isComponentModalActive = true;
      //  return await products.purchaseProducts(product);
    },
  },
};
</script>

<style scoped>
#nav{
  background-color: #67926C;
}
#list{
}
#searchBox{
  position: relative;
  width: 350px;
}
.column{
  height: 234px;
  width: 230px;;
}
table.vuetable tr td {
    vertical-align: middle!important;
}
.section{
background-color:#67926C;
}
.columns {
  position: relative;
}
.control{
  position: absolute;
}
</style>
