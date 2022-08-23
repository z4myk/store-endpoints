const express = require('express');

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function getProducts(){
    const res = await fetch('https://fakestoreapi.com/products')
    return await res.json();
}

async function getCarts(){
    const res = await fetch('https://fakestoreapi.com/carts')
    return await res.json();
}

async function getCategoriesName(category){
    const res = await fetch('https://fakestoreapi.com/products/category/'+ category)
    return await res.json();
}

async function getCategory() {
    const res = await fetch('https://fakestoreapi.com/products/categories')
    return await res.json();
}

async function getUsers() {
    const res = await fetch('https://fakestoreapi.com/users')
    return await res.json();
}

async function getMappedProducts () {
  let products = await getProducts();
  products = products.map(({id, title, price}) => ({
    id: id,
    title: title,
    price: price,
  }));
  return products;
};

async function getCategoryProperties(){
    let categories = await getCategory();
    const products = await Promise.all(
      categories.map(async(category) => {
        return {
          category,
          products: await getCategoriesName(category),
        };
      })) 
      return products
      
  };

  async function getCartProperties(){
    let carts = await getCarts();
    return carts
  }

let products = {
    getCategory,
    getProducts,
    getCarts,
    getCategoriesName,
    getUsers,
    getCategoryProperties,
    getCartProperties,
    getMappedProducts,
} 

module.exports = products;