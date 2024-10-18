const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;


let products = [
    { id: 1, name: 'Laptop', price: 1000, rating: 4.5 },
    { id: 2, name: 'Phone', price: 500, rating: 4.8 },
    { id: 3, name: 'Tablet', price: 750, rating: 4.3 }
];
function sortProductsByPopularity(productArray) {
    return productArray.sort((a, b) => b.rating - a.rating);
}
app.get('/products/sort/popularity', (req, res) => {
    let sortedProducts = sortProductsByPopularity(products);  
    res.json({ products: sortedProducts });  
});

function sortProductsByPriceHighToLow(productArray) {
  return productArray.sort((a, b) => b.price - a.price);
}
app.get('/products/sort/price-high-to-low', (req, res) => {
  let sortedProducts = sortProductsByPriceHighToLow(products);  
  res.json({ products: sortedProducts });  
});

function sortProductsByPriceLowToHigh(productArray) {
  return productArray.sort((a, b) => a.price - b.price);
}
app.get('/products/sort/price-low-to-high', (req, res) => {
  let sortedProducts = sortProductsByPriceLowToHigh(products); 
  res.json({ products: sortedProducts });  
});

function filterByRam(productArray, ramConfig) {
  return productArray.filter(product => product.ram === ramConfig);
}
app.get('/products/filter/ram', (req, res) => {
  let ramConfig = req.query.ram;  
  let filteredProducts = filterByRam(products, ramConfig);  
  res.json({ products: filteredProducts });  
});




function filterByRom(productArray, romConfig) {
  return productArray.filter(product => product.rom === romConfig);
}
app.get('/products/filter/rom', (req, res) => {
  let romConfig = req.query.rom;  
  let filteredProducts = filterByRom(products, romConfig);  
  if (filteredProducts.length === 0) {
      return res.json({ message: `No products found with ROM configuration: ${romConfig}` });
  }
 res.json({ products: filteredProducts });  
});

function filterByBrand(productArray, brand) {
  return productArray.filter(product => {
      return product.brand && product.brand.toLowerCase() === brand.toLowerCase();
  });
}
app.get('/products/filter/brand', (req, res) => {
  let brand = req.query.brand;  
  if (!brand) {
      return res.status(400).json({ error: "Brand query parameter is required." });
  }
  let filteredProducts = filterByBrand(products, brand);  

  if (filteredProducts.length === 0) {
      return res.json({ message: `No products found for brand: ${brand}` });
  }
res.json({ products: filteredProducts });  
});

function filterByOs(productArray, os) {
  return productArray.filter(product => {
      return product.os && product.os.toLowerCase() === os.toLowerCase();
  });
}
app.get('/products/filter/os', (req, res) => {
  let os = req.query.os;  
  if (!os) {
      return res.status(400).json({ error: "OS query parameter is required." });
  }
let filteredProducts = filterByOs(products, os);  
  if (filteredProducts.length === 0) {
      return res.json({ message: `No products found for OS: ${os}` });
  }
 res.json({ products: filteredProducts });  
});  

function filterByPrice(productArray, maxPrice) {
  return productArray.filter(product => product.price <= maxPrice);
}

// Endpoint to filter products by price
app.get('/products/filter/price', (req, res) => {
  let maxPrice = parseFloat(req.query.price);  // Extract the price from the query parameter

  // Check if price is provided and is a valid number
  if (isNaN(maxPrice)) {
      return res.status(400).json({ error: "Valid price query parameter is required." });
  }

  let filteredProducts = filterByPrice(products, maxPrice);  
  if (filteredProducts.length === 0) {
      return res.json({ message: `No products found for price less than or equal to: ${maxPrice}` });
  }

  res.json({ products: filteredProducts });  
});

app.get('/products', (req, res) => {
  res.json({ products });  
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
