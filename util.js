//*--> null <--*//
const getNull = (name) => name;


//*--> number <--*//
const sum = (a, b) => a + b;


//*--> string <--*//
const greating = (name) => `Hello ${name}`;


//*--> boolean <--*//
const isEven = num => num % 2 === 0 ? true : false;


//*--> array <--*//
let array = ['tal', 'day'];


//*--> Exception throw Error <--*//
function compileAndroidCode() {
  if (true) {
    throw new Error('you are using the wrong JDK!');
  }
}


//*--> async await <--*//
async function getArray() {
  return array;
}


//*--> mock is a fake data <--*//
const db = require('./db')

const getInfo = (ID) => {
  const order = db.getId(ID)
  if (order.price >= 10) {
    order.price -= order.price * 0.1;//* order.price = 20 - (20 * 0.1) <--- 10% of 20
  }
  return order;
}


//*--> mock for handling with API axios by fake data <--*//
const { default: axios } = require("axios");

const fetchData = async () => {
  const data = await axios.get('https://url.com');
  return data;
}


//*--> task for training <--*//
const email = require('./email');

const createOrder = async (userId, products) => {
  if (!userId) throw new Error('userId is not found');
  let total = 0;
  products.forEach(product => total += product.price);
  await db.createOrder(userId, products);
  const user = await db.getUser(userId);
  email.sendEmail(user.email, total);
  return `Order has been created successfully with total price ${total} and product ${products}`
};


module.exports = {
  sum,
  greating,
  isEven,
  array,
  compileAndroidCode,
  getArray,
  getInfo,
  fetchData,
  createOrder,
  getNull,
}