const getStore = require('../model/storeModel');
const serviceNotFound = require('../middleware/errorhandler');

//trae todos los productos
let getAllProducts = async (_req, res) => {
  try{
    let products = await getStore.getMappedProducts();
    res.status(200).send(products);
  }catch(error){
    return serviceNotFound.serviceNotFound(error)
  }
};

//trae categorias
let getCategories = async (_req, res) => {
  try{
    let categories = await getStore.getCategory();
      const products = await Promise.all(
        categories.map(async (category) => {
          return {
            category,
            products: await getStore.getCategoriesName(category),
          };})) 
          res.status(200).send(products);
        }catch(error){
          return serviceNotFound.serviceNotFound(error)
        } 

}

//trae carrito
let getCarts = async(_req, res) => {
  try{
    let carts = await getStore.getCarts();
    res.status(200).send(carts);
  }catch(error){
    return serviceNotFound.serviceNotFound(error)
  }
}


//trae carrito de 2 o mas
let getBigCarts = async (_req, res) => {
  try{
    let carts = await getStore.getCarts();
    let productsCarts = await Promise.all(
              carts.filter((cart) => cart.products.length >= 2)
                      .map(async ({ userId, ...carts }) => {
                      const { username } = await getStore.getCartProperties(userId)
                      return { username, ...carts }
                  })
          )
    res.status(200).send(productsCarts);

  }catch(error){
    return serviceNotFound.serviceNotFound(error)
  }
};



//trae users
let getUsers = async (_req, res) => {
  try{
    let users = await getStore.getUsers();
    res.status(200).send(users)
  }catch(error){
    return serviceNotFound.serviceNotFound(error)
  }
}

// trae los 3 primeros usuarios
let getFirstThreeUsers = async (_req, res) => {
  try{
    let users = await getStore.getUsers();
    let firstThree = 3
    const firstThreeUsers = users.slice(0,firstThree)
    res.status(200).send(firstThreeUsers);

  }catch(error){
    return serviceNotFound.serviceNotFound(error)
  }
};

// trae por categoria mas caros
let getCategoryMostExpensive = async (_req, res) => {
  try{
    let products = await getStore.getCategoryProperties();
    const productExpensive = products.map((category) => {
      const product = category.products.reduce((a, b) => {
         if(a.price > b.price){
            return a
          }else{
            return b
          }
      })
      return {
          category: category.category,
          product
      }
  })
  res.status(200).send(productExpensive);
  }catch(error){
    return serviceNotFound.serviceNotFound(error)
  }
};

// trae producto por id
let getProductById = async (req, res) => {
  try{
    const id = req.params.id;
    let products = await getStore.getProducts();
    products = products.map(({id, title, price, category, rating}) => ({
      id: id,
      category: category,
      title: title,
      price: price,
      rating: rating,
    }));
    res.status(200).send(products[id - 1]);

  }catch(error){
    return serviceNotFound.serviceNotFound(error)
  }
};



      const storeController = {
          getCategories,
          getCarts,
          getBigCarts,
          getUsers,
          getFirstThreeUsers,
          getCategoryMostExpensive,
          getProductById,
          getAllProducts,

      }

      module.exports = storeController;