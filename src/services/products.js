import axios from 'axios';

const apiServer = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'content-type': 'application/json',
  },
});
export default {

  // Adding a product
  createProduct(product) {
    return apiServer.post('/products/productAdd',
      {
        id: product.id,
        name: product.name,
        price: product.price,
        model: product.model,

      });
  },
  // Getting list of all the products
  productList(params) {
    return apiServer.get('/products/productList/', { params });
  },
  deleteProduct(id) {
    return apiServer.delete(`/products/delete/${id}`);
  },
  purchaseProducts(product) {
    return apiServer.post('products/purchase', {
      id: product.id,
      name: product.name,
      price: product.price,
      model: product.model,
      quantity: product.quantity,
      deliveryLocation: product.deliveryLocation,
      user: product.user,
      product:product.product
    });
  },
  // getting purchased productList
  getPurchasedList(params) {
    return apiServer.get('/products/purchasedProducts/', { params });
    console.log(params, 'serverrrrrrrrrrrrrrrrr');
  },
  // count for all the products
  getProductCount() {
    return apiServer.get('/products/productCount');
  },
  // count for all the purchased products
  getPurchaseCount() {
    return apiServer.get('/products/purchaseCount');
  },
};
