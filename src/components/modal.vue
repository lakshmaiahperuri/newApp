<template>
<o-modal :active.sync="isImageModalActive">
      
      <form action="">
  <p>{{getCurrentUser}}</p>
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Delivery details</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Quantity">
                            <b-input type="number"  min="0" max="20" v-model="quantity" required>
                            </b-input>
                        </b-field>

                        <b-field label="Delivery Location">
                            <b-input
                                type="text"
                                v-model="deliveryLocation" required>
                            </b-input>

                        </b-field>
                        <b-checkbox>Remember me</b-checkbox>
                    </section>

                     <footer class="modal-card-foot">
                        <button class="button" type="button" @click="$parent.close()">Close</button>
                        <button class="button is-primary" @click.prevent="orderNow(product)">Submit</button>
                    </footer>
                </div>

            </form>
    </o-modal>

 </template>
 <script>
import products from '../services/products'
import {mapState} from 'vuex';
export default {
  props:["product"],
   data() {
    return {
       isOpen: false,
       quantity:"",
       deliveryLocation:"",
       owner:"",
    };
  },
  computed:{
    ...mapState(["currentUser"]),
          getCurrentUser() {
            let res="";
          console.log(">>>>", this.currentUser);
            res= this.currentUser;
         this.owner= res;
          console.log("owner123",this.owner);
  }
  },
  methods:{
    async orderNow(product){
             console.log("proooooooo",this.quantity, this.deliveryLocation);
             product.quantity = this.quantity;
             product.price= parseInt(this.quantity*product.price);
             product.deliveryLocation = this.deliveryLocation;
             product.owner= this.owner;
             console.log('priceeeeeeeeeeeeeeee',product.price);
             if(product.quantity==""||product.deliveryLocation==""){
             alert("please fill all the details");
          }
          else{
             alert("added successfully");
             this.isOpen=false;
            return await products.purchaseProducts(product);
            console.log('overrrrrrrrrrrr');
          }
          }
  },
  // created() {
  //   console.log("11111111111111111111111111111111",this.product.name);
  // }
}
</script>