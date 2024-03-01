const users = [
  { id: 1, email: 'test1@email.com' }, { id: 2, email: 'test1@emai2.com' },
  { id: 3, email: 'test1@emai3.com' }, { id: 4, email: 'test4@email.com' },
  { id: 5, email: 'test1@emai555.com' }, { id: 6, email: 'test1@emai6.com' },
  { id: 7, email: 'test1@emai7.com' }, { id: 8, email: 'test1@emai8.com' },
];
const getUser = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(u => u.id === parseInt(id));
      if ( !user ) return reject('No User Found');
      return resolve( user );
    }, Math.random() * 1000); // simulate delay
  });

const createOrder = (userId, products) => {
  return  new Promise((resolve) => {
    resolve({ userId, products});
    })
}

const getId = (id) => {
  return { id: id, price: 20 };
}



module.exports = { getId, getUser, createOrder }