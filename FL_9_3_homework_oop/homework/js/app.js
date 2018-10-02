function Product(name, description, price) {
    this.name = name;
    this.description = description;
    let _price = isPriceValid(price) ? price : 0;
    let _shoppingCartName = '';
    let _logs = [];

    this.getPrice = () => {
        return _price;
    }

    this.setPrice = (price) => {
        if (isPriceValid(price) && price > _price) {
            _logs.push(`${this.name} price changed from ${_price} to ${price} `);
            _price = price;
        } else {
            _logs.push(`${this.name} try to change the price from ${_price} to ${price} `);
            console.log(`You can not set the lower price for ${this.name} than current!`);
        }

        return this;
    }

    this.add = (shoppingCartName) => {
        _shoppingCartName = shoppingCartName;
        _logs.push(`${this.name} is added to ${_shoppingCartName} at ${new Date()}`);

        return this;
    }

    this.removeProduct = () => {
        _logs.push(`${this.name} is removed from ${_shoppingCartName} at ${new Date()}`);
        _shoppingCartName = '';

        return this;
    }

    this.getHistory = () => {
        _logs.forEach(log => {
            console.log(log);
        });
    }

    function isPriceValid(price) {
        return !isNaN(price) && price > 0;
    }

}


function ShoppingCart(name, owner, maxCount) {
    this.name = name;
    this.owner = owner;
    this.maxCount = maxCount;

    let _productsList = [];
    let _logs = [`${this.name} has been created at ${new Date()}`];

    this.addNewProduct = (product) => {
        if (checkProductInstance(product)) {

            product.id = Math.floor(100000000 + Math.random() * 900000000);
            product.date = new Date();

            if (_productsList.length === maxCount){
                let minPrice = _productsList[0].getPrice();
                let minPriceIndex = 0;
                _productsList.forEach((element,index) => {
                    if (element.getPrice() < minPrice){
                        minPrice = element.getPrice();
                        minPriceIndex = index;
                    }
                });
                _logs.push(`${_productsList[minPriceIndex].name} was deleted from ${this.name} at ${new Date()}`)
                _productsList[minPriceIndex] = product;
            } else {
                _productsList.push(product);
            }
            product.add(this.name);
            _logs.push(`${product.name} is added to ${this.name} at ${new Date()}`);
        }

        return this;
    }

    this.removeProduct = (productInstance) => {
        if (checkProductInstance(productInstance)) {
            let indexToRemove;
            _productsList.forEach((product, i) => {
                if (product.id === productInstance.id) {
                    indexToRemove = i;
                }
            })

            _productsList.splice(indexToRemove, 1);
            _logs.push(`${productInstance.name} was deleted from ${this.name} at ${new Date()}`);
        }

        return this;
    }

    this.getTotalPrice = () => {
        let totalPrice = 0;
        _productsList.forEach(element => {
            totalPrice += element.getPrice();
        });

        return totalPrice.toFixed(2);
    }

    this.getAvaragePrice = () => {
        if ( _productsList.length) {
            return (this.getTotalPrice() / _productsList.length).toFixed(2);
        }

        return 0;
    }

    this.getProducts = () => {
        return _productsList;
    }

    this.getFormattedListOfProducts = () => {
        const formated = [];
        _productsList.forEach(product => {
            formated.push(`${product.name} - is on ${this.name} from ${product.date}. 
            Detailed product description: ${JSON.stringify(product.description)}`);
        });
        console.table(formated);
    }

    this.getHistory = () => {
        _logs.forEach(log => {
            console.log(log);
        });
    }

    function checkProductInstance(product) {
        if (!(product instanceof Product)) {
            console.log('Wrong product parameter - ', product);
            return false;
        }

        return true;
    }

}


const banana = new Product('banana', { color: 'yellow', size: 'medium' }, 30);
const macadamia = new Product('macadamia', { type: 'raw', size: 'small' }, 200);
const avocado = new Product('avocado', { color: 'green', size: 'medium' }, 60);
const peach = new Product('peach', { color: 'orange', size: 'medium' }, 45);
const chocolate = new Product('chocolate', { type: 'dark', weight: '100 g' }, 55);
const orange = new Product('orange', { color: 'orange', size: 'medium' }, 50);

const cart1 = new ShoppingCart('userCart 1', 'Yulia', 10);
const cart2 = new ShoppingCart('userCart 2', 'Squirell', 3);

cart1
    .addNewProduct(avocado)
    .addNewProduct(banana)
    .removeProduct(banana)
    .addNewProduct(chocolate)
    .addNewProduct(macadamia)
    .addNewProduct(orange)
    .addNewProduct(peach)
    .removeProduct(orange);

cart1.addNewProduct('some string')

console.log('Cart 1 logs:');
cart1.getHistory();
console.log('===================================');

console.log('Product macadamia logs:');
macadamia.getHistory();
console.log('===================================');

console.log('Cart 1 avarage price:', cart1.getAvaragePrice());
console.log('Cart 1 total price:', cart1.getTotalPrice());
console.log('===================================');

avocado
    .setPrice(20)
    .setPrice(100);

console.log('Product avocado logs:');
avocado.getHistory();
console.log('===================================');

console.log('Cart 1 formated list');
cart1.getFormattedListOfProducts();
console.log('===================================');

cart2.addNewProduct(avocado)
     .addNewProduct(chocolate)
     .addNewProduct(macadamia)
     .addNewProduct(banana);

console.log('Cart 2 formated list');
cart2.getFormattedListOfProducts();
console.log('===================================');

console.log('Cart 2 logs:');
cart2.getHistory();