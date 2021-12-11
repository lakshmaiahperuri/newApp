<template>
  <div>
    <o-table v-if="cardLoaded" :data="tableData" >
     <template v-for="column in columns" :key="column.id">
        <o-table-column  v-bind="column">
          <template v-if="column.searchable && !column.numeric" v-slot="props">
            <o-input v-model="props.filters[props.column.field]" placeholder="Search..." icon="search" size="small" />
          </template>
          <template v-else-if="column.hasHeaderSlot" v-slot="props">
            <!-- <button class="button is-danger" @click="deleteProducts(props.row._id)">Delete</button> -->
              <o-button type="button" :disabled="isDisabled" @click="addToCart(props.row)">Add to Cart</o-button>
          </template>
          <template v-else v-slot="props">
            {{ props.row[column.field] }}
          </template>
        </o-table-column>
      </template>
    </o-table>
    <div >
      <p>{{userName}}</p>
    </div>
   <!-- <o-table :data="data" :columns="columns"></o-table> -->
    <!-- <modal 
      v-if="isComponentModalActive"
      :product="product"
    ></modal> -->
    <o-modal :active.sync="isComponentModalActive">
      
                    <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Delivery Details</p>
                        <i class="far fa-times-circle"></i>
                        <o-icon
                            clickable
                            native-type="button"
                            icon="times"
                            @click.native="$emit('close')"/>
                    </header>
                    <section class="modal-card-body">
                        <o-field label="Quantity">
                            <o-input
                                type="text"
                                :value="quantity"
                                v-model="quantity"
                                placeholder="Quantity"
                                required>
                            </o-input>
                        </o-field>

                        <o-field label="Delivery Location">
                            <o-input
                                type="text"
                                :value="deliveryLocation"
                                v-model="deliveryLocation"
                                password-reveal
                                placeholder="Location"
                                required>
                            </o-input>
                        </o-field>
                    </section>
                    <footer class="modal-card-foot">
                        <o-button type="button" @click="$emit('close')">Close</o-button>
                        <o-button variant="primary" @click="orderNow(product)">Order Now</o-button>
                    </footer>
                </div>
          

    </o-modal>
  </div>
</template>
<script>
import pro from '../services/products'
import Product from '../services/productData'
import { useStore } from 'vuex';
import modal from '../components/modal.vue';
import { mapState } from 'vuex'
import { defineComponent, ref, reactive, onMounted, toRefs,$oruga } from 'vue';

export default defineComponent({
  name: 'productList',
  components: {
  },
  setup() {
    const products= ref([]);
    const store = useStore();
    const state = reactive({
      tableData: [],
      userName:'',
      userRole:'',
      rowProduct:{},
      quantity:'',
      deliveryLocation:'',
      owner:'Lakshmaiah',
      cardLoaded: false,
      isModalActive: false,
      isComponentModalActive: false,
      columns: [
      {
        field: 'name',
        label: 'Product Name',
        width:'22%'
      },
      {
        field: 'price',
        label: 'Product Price',
        position: 'centered',
        width:'12%'
      },

      {
        field: "model",
        label: "Product Model",
        width:'22%'
      },
      {
        field: "actionFields",
        label: "Actions",
        hasHeaderSlot: true,
        width:'22%'
      },
    ],
    });
    const loadData =  async () => {
      const data = await pro.productList();
      state.tableData = data.data;
      state.cardLoaded = true;
      state.userName = store.state.loggedInUser.data.user.name
      state.userRole = store.state.loggedInUser.data.user.role
      console.log(state.userRole, "loooooo");

    };
    const deleteProducts = async (id) => {
      console.log("Lakshma")
       await pro.deleteProduct(id);
       $oruga.notification.open('Something happened')
       state.cardLoaded= false;
       await loadData();
      console.log("Lakshma")
    }
    const addToCart = async (product) => {
      console.log(product, "qwertyjhgfdsdfghj");
       state.isComponentModalActive = true;
       state.rowProduct= product;
       console.log("modalllllllllllll");
    }
    const orderNow = async (rowProduct) => {
      console.log(state.rowProduct, "qwertyjhgfdsdfghj");
       state.isComponentModalActive = false;
       state.rowProduct.price = parseInt(state.rowProduct.price * state.quantity)
       const orderedProduct = await pro.purchaseProducts({
         ...state.rowProduct,
         quantity: state.quantity, 
         deliveryLocation: state.deliveryLocation,
         owner: 'lakshmaiah'
       })
       alert("product ordered");
       await addToCart();
       console.log(orderedProduct, "ooooooooooooo");
    }
    const isDisabled = async()=>{
      return state.userRole === "admin";
    }
    onMounted(async () => {
      await loadData();
      console.log(state.tableData, "laalaal");
    });
    return {  products, ...toRefs(state), loadData ,deleteProducts,addToCart, orderNow};
  },
});
</script>

<style scoped>
#tableSection{
  background-color: blueviolet
}
</style>