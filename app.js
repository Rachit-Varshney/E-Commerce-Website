// Dark mode
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// Fetch products
let products = [];

async function fetchProducts() {
  const res = await fetch("http://localhost:5000/api/products");
  products = await res.json();
  displayProducts(products);
}

// Display products
function displayProducts(items) {
  const list = document.getElementById("productList");
  if (!list) return;

  list.innerHTML = "";

  items.forEach(p => {
    list.innerHTML += `
      <div class="card">
        <img src="${p.image}" width="100%">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart('${p._id}')">Add to Cart</button>
      </div>
    `;
  });
}

// Search
const search = document.getElementById("search");
if (search) {
  search.addEventListener("input", () => {
    const val = search.value.toLowerCase();
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(val)
    );
    displayProducts(filtered);
  });
}

// Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id) {
  const item = products.find(p => p._id === id);
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

// Cart display
function loadCart() {
  const cartDiv = document.getElementById("cartItems");
  const totalEl = document.getElementById("total");

  if (!cartDiv) return;

  let total = 0;
  cartDiv.innerHTML = "";

  cart.forEach((item, i) => {
    total += item.price;
    cartDiv.innerHTML += `
      <div class="card">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="removeItem(${i})">Remove</button>
      </div>
    `;
  });

  totalEl.innerText = "Total: ₹" + total;
}

function removeItem(i) {
  cart.splice(i,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

fetchProducts();
loadCart();