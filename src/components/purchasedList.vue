<template>
<section>
  <mf-nav></mf-nav>
    <o-table v-if="cardLoaded" :data="tableData" >
     <template v-for="column in columns" :key="column.id">
        <o-table-column  v-bind="column">
          <template v-if="column.searchable && !column.numeric" v-slot="props">
            <o-input v-model="props.filters[props.column.field]" placeholder="Search..." icon="search" size="small" />
          </template>
          <template v-else v-slot="props">
            {{ props.row[column.field] }}
          </template>
        </o-table-column>
      </template>
    </o-table>
</section>
</template>

<script>
import {
  defineComponent, ref, reactive, onMounted, toRefs, $oruga,
} from 'vue';
import { useStore, mapState } from 'vuex';
import pro from '../services/products';
import navBar from '../components/navBar.vue';

export default defineComponent({
  name: 'productList',
  components: {
    'mf-nav': navBar
  },
  setup() {
    const products = ref([]);
    const store = useStore();
    const state = reactive({
      tableData: [],
      rowProduct: {},
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
          field: 'quantity',
          label: 'Quantity',
          width: '22%',
        },
        {
          field: 'deliveryLocation',
          label: 'Delivery Location',
          width: '22%',
        },
      ],
    });
    const loadData = async () => {
      const data = await pro.getPurchasedList({
        user: store.state.loggedInUser._id
      });
      console.log('storeeeeeeee', state.user)
      state.tableData = data.data;
      state.cardLoaded = true;
      return state.tableData;
    };
    onMounted(async () => {
      await loadData();
      console.log(state.tableData, 'laalaal');
    });
    return { ...toRefs(state), loadData };
  },

});
</script>
