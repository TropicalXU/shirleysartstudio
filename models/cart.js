//NOT IN USE - WILL USE FOR FUTURE IMPLEMENTATION
/* CREATING A CART MODEL FOR FRONT END PURCHASES*/
/*setting items,qty and price to be empty object/or null or existing cart items(old cart) */
module.exports = function Cart(oldCart) {
   this.items = oldCart.items || {};
   this.totalQty = oldCart.totalQty || 0;
   this.totalPrice = oldCart.totalPrice || 0;

   /* adding items as a function-grabbing stored items if not stored - set to 0*/
   this.add = (item, id) => {
     let storedItem = this.items[id];
     if(!storedItem) {
        storedItem = this.items[id] = {item:item, qty: 0, price: 0};
    }/* next we increase the storedItems qty/ also increasing price - giving us/adding the total qty*/
    storedItem.qty ++;
    storedItem.price = storedItem.item.price * storedItem.qty;
    this.totalQty++;
    this.totalPrice += storedItem.item.price;
   };
   /*next we add a remove button on the cart so user has access to delete individual items */
   this.remove = (id) => {
    let storedItem = this.items[id];//grabbing item id
    this.totalQty -= storedItem.item.qty;//deducting item qty from cart
    this.totalPrice -= storedItem.item.price;//deducting total of cart
    delete this.items[id];//removing item from cart
   };
   /* next we create a function which generates an array we can access on frontend with ejs in checkout/
   - we create a new array and push our items*/
   this.generateArray = () => {
    const arr = [];
    for(let id in this.items) {
        arr.push(this.items[id]);
    }
    return arr;
   };


};