export class Product {
  constructor(_id, name, price, model,quantity,deliveryLocation,owner) {
    this.name = name;
    this.price = price;
    this.model=model;
    this.quantity=quantity;
    this.deliveryLocation=deliveryLocation;
    this.owner=owner;

  }
}