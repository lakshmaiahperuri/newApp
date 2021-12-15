<template>
  <div>
  <span class="icon">
  </span>
  <span ><router-link to="/purchaseList">
    <button class="button">My Orders </button>
    </router-link></span>
  <span ><button class="button" @click="logOut()">LogOut </button></span>
    <span class="icon-text" @click="logOut()">  
  <span class="icon">
  </span>
</span>

    <o-table v-if="cardLoaded" :data="tableData" >
     <template v-for="column in columns" :key="column.id">
        <o-table-column  v-bind="column">
          <template v-if="column.searchable && !column.numeric" v-slot="props">
            <o-input v-model="props.filters[props.column.field]" placeholder="Search..." icon="search" size="small" />
          </template>
          <template v-else-if="column.hasHeaderSlot" v-slot="props">
            <!-- <button class="button is-danger" @click="deleteProducts(props.row._id)">Delete</button> -->
              <o-button id="button1" type="button" variant="success" :disabled="isDisabled1" @click="addToCart(props.row)">Add to Cart</o-button>
              <o-button type="button" variant="danger" icon-left="trash" :disabled="isDisabled" @click="deleteProduct(props.row._id)">Delete</o-button>
          </template>
          <template v-else v-slot="props">
            {{ props.row[column.field] }}
          </template>
        </o-table-column>
      </template>
    </o-table>
    <div >
    </div>
    <o-modal :active="isComponentModalActive">

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
import { useStore, mapState } from 'vuex';
import { useRouter } from 'vue-router';
import {
  defineComponent, ref, reactive, onMounted, toRefs, $oruga, computed,
} from 'vue';
import pro from '../services/products';
import Product from '../services/productData';
import modal from '../components/modal.vue';
import { useToast } from 'vue-toastification';
export default defineComponent({
  name: 'productList',
  components: {
  },
  setup() {
    const products = ref([]);
    const store = useStore();
    const toast = useToast();
    const router = useRouter();
    const state = reactive({
      tableData: [],
      userName: '',
      userRole: '',
      rowProduct: {},
      quantity: '',
      user:'',
      deliveryLocation: '',
      owner: 'Lakshmaiah',
      cardLoaded: false,
      isModalActive: false,
      isComponentModalActive: false,
      columns: [
        {
          field: 'name',
          label: 'Product Name',
          width: '22%',
        },
        {
          field: 'price',
          label: 'Product Price',
          position: 'centered',
          width: '12%',
        },

        {
          field: 'model',
          label: 'Product Model',
          width: '22%',
        },
        {
          field: 'actionFields',
          label: 'Actions',
          hasHeaderSlot: true,
          width: '22%',
        },
      ],
    });
    const loadData = async () => {
      const data = await pro.productList();
      state.tableData = data.data;
      state.cardLoaded = true;
      state.userName = store.state.loggedInUser.name;
      console.log(state.userRole, 'loooooo');
    };

    const deleteProduct = async (id) => {
      console.log('Lakshma');
      await pro.deleteProduct(id);
      toast.error('Product deleted')
      state.cardLoaded = false;
      await loadData();
      console.log('Lakshma');
    };
    const addToCart = async (product) => {
      console.log(product, 'qwertyjhgfdsdfghj');
      state.isComponentModalActive = true;
      state.rowProduct = product;
      console.log('modalllllllllllll');
    };
    const close = () =>{
      state.isComponentModalActive = false;
      state.quantity = '', 
      state.deliveryLocation = '';
    }
    const orderNow = async (rowProduct) => {
      console.log(state.rowProduct, 'qwertyjhgfdsdfghj');
      state.isComponentModalActive = false;
      state.rowProduct.price = parseInt(state.rowProduct.price * state.quantity);
      const orderedProduct = await pro.purchaseProducts({
        ...state.rowProduct,
        quantity: state.quantity,
        deliveryLocation: state.deliveryLocation,
        owner: store.state.loggedInUser.name
      });
      console.log(state.user, 'iddddd');
      toast.success('product ordered successfuly');
      await addToCart();
      close();
      console.log(orderedProduct, 'ooooooooooooo');
    };
    const logOut = async() => {
      localStorage.removeItem('auth-token', store.state.loggedInUser.token);
      router.push({ path: '/' });
    }
    const isDisabled = computed(() => store.state.loggedInUser.role === 'user');
    const isDisabled1 = computed(() => store.state.loggedInUser.role === 'admin');
    onMounted(async () => {
      await loadData();
      console.log(state.tableData, 'laalaal');
      console.log('store', store.state.loggedInUser);
    });
    return {
      products, 
      ...toRefs(state), 
      loadData, 
      deleteProduct, 
      addToCart, 
      orderNow, 
      close,
      isDisabled,
      isDisabled1,
      logOut
    };
  },
});
</script>

<style scoped>
#tableSection{
  background-color: blueviolet
}
.header{
  
}
#button1{
  margin-right: 15px;
}
.icon{
  margin-left: 1200px;
  
}
</style>
