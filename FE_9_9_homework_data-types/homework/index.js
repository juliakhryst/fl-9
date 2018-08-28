//#1
const findType = p => typeof p;

//#2
const forEach = (array, fn) => {
    for (let i = 0; i < array.length; i++) {
      fn(array[i]);
    }
  };

//#3 
const map = (array, fn) => {
    let arr = [];

    forEach(array, el => {
        return arr.push(fn(el));
    });
    return arr;
};

//#4
const filter = (array, fn) => {
    let arr = [];
   
    forEach(array, (el) => {
        if (fn(el)) {
           return arr.push(el);
      }
    });
    return arr;
}

//#5
const getAdultAppleLovers = (data) => {
    const filterFn = (el) => el.age > 18 && el.favoriteFruit === 'apple'
    return map(filter(data, (el) => filterFn(el)), el => el.name);
}

//#6
const keys = (object) => {
    let arr = [];
  
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        arr.push(key);
      }
    }
    return arr;
};

//#7
const values = (object) => {
    let arr = [];
  
    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        arr.push(object[key]);
      }
    }
    return arr;
};

//#8
const showFormattedDate = (date) => {
    return `It is ${date.getDate()} of ${date.toLocaleString('en-us',
    { month: 'short' })}, ${date.getFullYear()}`;
};