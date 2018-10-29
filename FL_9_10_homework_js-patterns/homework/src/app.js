const sunday = 0;
const saturday = 6;

function Store() {
    let pizzaSlicePrice = 40;
    let weekendDiscount = 0.1;
    let nightDiscount = 0.15;
    this.discount = 0;
    this.bonus = 0;

    this.getPizzaSlicePrice = function () {
        return pizzaSlicePrice;
    };

    this.setPizzaSlicePrice = function (newPrice) {
        pizzaSlicePrice = newPrice;
    };

    this.getWeekendDiscount = function () {
        return weekendDiscount;
    };

    this.setWeekendDiscount = function (newWeekendDiscount) {
        weekendDiscount = newWeekendDiscount;
    };

    this.getNightDiscount = function () {
        return nightDiscount;
    };

    this.setNightDiscount = function (newNightDiscount) {
        nightDiscount = newNightDiscount;
    };

    this.getBonus = function () {
        return this.bonus;
    };

    this.bonusSetter = function (number) {
        this.bonus = number;
    };

    this.buyPizzaSlice = function () {
        let discountPrice = this.getPizzaSlicePrice() - this.getPizzaSlicePrice() * this.discount;
        let message = `Price after discount : ${discountPrice}, total bonus: ${this.getBonus()}`;
        console.log(message);
    };
}

//decorators
function getDiscount(pizza) {
    if (pizza instanceof Store) {
        let date = new Date();
        let day = date.getDay();
        let time = date.getHours();
        let discount = 0;

        if (day === sunday || day === saturday) {
            discount += pizza.getWeekendDiscount();
        }

        if (time >= 23 || time < 6) {
            discount += pizza.getNightDiscount();
        }
        pizza.discount = discount;
        return pizza;
    } else {
        throw 'Wrong Argument Passed';
    }
}

function setBonus(pizza) {
    if (pizza instanceof Store) {
        let currentBonus = pizza.getBonus();
        currentBonus += pizza.getPizzaSlicePrice() / 10;
        pizza.bonusSetter(currentBonus);
        return pizza;
    } else {
        throw 'Wrong Argument Passed';
    }
}

//tests
let mySlice = new Store();
console.log(`Price is - ${mySlice.getPizzaSlicePrice()}`);
mySlice.setPizzaSlicePrice(50);
console.log(`Price is - ${mySlice.getPizzaSlicePrice()}`);
mySlice.setWeekendDiscount(0.05);
console.log(`weekend disc - ${mySlice.getWeekendDiscount()}`);

setBonus(mySlice);
getDiscount(mySlice);
console.log(mySlice.getBonus());

mySlice.buyPizzaSlice();
let newStore = new Store();
newStore.buyPizzaSlice();
