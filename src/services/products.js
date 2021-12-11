import axios from "axios";

const apiServer= axios.create({
  baseURL:"http://localhost:4000",
  withCredentials:false,
  headers: {
    Accept: "application/json",
    "content-type": "application/json"
  }
});
export default{

  //Adding a product
  createProduct(product){
   return apiServer.post("/posts/productAdd",
   {
     id:product.id,
     name:product.name,
     price:product.price,
     model:product.model

   });
  },
  // Getting list of all the products
  productList(){
    return apiServer.get(`/posts/productList/`);
  },
  productListBySearch(search){
    return apiServer.get(`/posts/productList/${search}`);
  },
  deleteProduct(id){
    return apiServer.delete(`/posts/delete/${id}`)
  },
  purchaseProducts(product){
    return apiServer.post(`posts/purchase`,{
      id:product.id,
      name:product.name,
      price:product.price,
      model:product.model,
      quantity:product.quantity,
      deliveryLocation:product.deliveryLocation,
      owner:product.owner
    });
  },
  //getting purchased productList
  getPurchasedList(){
    return apiServer.get(`/posts/purchasedProducts`);
  },
  //count for all the products
  getProductCount(){
    return apiServer.get(`/posts/productCount`);
  },
   //count for all the purchased products
   getPurchaseCount(){
    return apiServer.get(`/posts/purchaseCount`);
  }
}