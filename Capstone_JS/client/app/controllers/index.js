import ApiServices from "../services/apiServices.js";
import CartItem_1 from "../modals/product_1.js";


const api = new ApiServices();

let productList = [];
let cart = [];

const saveCartToStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const loadCartFromStorage = () => {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
};

const renderProductList = (products) => {
  let content = "";
  products.forEach((product) => {
    content += `
            <div class="col-12 col-md-6 col-lg-3 mb-4">
                <div class="card h-100 shadow-sm">
                    <img
                        src="${product.img}"
                        class="card-img-top d-block mx-auto"
                        alt="${product.name}"
                        style="width: 200px"
                    />
                    <div class="card-body d-flex flex-column">
                        <div>
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text text-muted">${product.desc}</p>
                        </div>
                        <p class="card-text fs-5 fw-bold mt-auto">${Number(
                          product.price
                        ).toLocaleString()} đ</p>
                    </div>
                    <div class="card-footer bg-light border-0 text-center pb-3">
                        <button class="btn btn-success" onclick="addToCart('${
                          product.id
                        }')">
                            <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ
                        </button>
                    </div>
                </div>
            </div>
        `;
  });
  document.getElementById("productList").innerHTML = content;
};

const renderCart = () => {
  let content = "";
  let total = 0;
  let totalQuantity = 0;

  if (cart.length === 0) {
    content = '<p class="text-center text-muted">Giỏ hàng đang trống.</p>';
  } else {
    content = '<ul class="list-group list-group-flush">';

    cart.forEach((item) => {
      let itemTotal = item.price * item.quantity;
      total += itemTotal;
      totalQuantity += item.quantity;

      content += `
  <li class="list-group-item d-flex justify-content-between align-items-center">
      
      <img src="${item.img}" width="50px" class="rounded" />
      
      <span class="fs-6" style="flex-basis: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        ${item.name}
      </span>
      
      <div class="input-group" style="width: 120px;">
          <button class="btn btn-outline-secondary btn-sm" type="button" onclick="updateQuantity('${
            item.id
          }', -1)">-</button>
          
          <span class="form-control text-center py-1 px-1">
            ${item.quantity}
          </span>
          
          <button class="btn btn-outline-secondary btn-sm" type="button" onclick="updateQuantity('${
            item.id
          }', 1)">+</button>
      </div>
      
      <span class="fw-bold" style="flex-basis: 100px; text-align: right;">
        ${itemTotal.toLocaleString()} đ
      </span>
      
      <button class="btn btn-danger btn-sm" onclick="removeFromCart('${
        item.id
      }')">
        <i class="fa-solid fa-trash-can"></i>
      </button>
  </li>
`;
    });

    content += "</ul>";
  }

  document.getElementById("cartItemsList").innerHTML = content;
  document.getElementById("cartTotal").innerHTML =
    total.toLocaleString() + " đ";
  document.getElementById("cartCount").innerHTML = totalQuantity;
};

window.addToCart = (id) => {
  let existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const productToAdd = productList.find((product) => product.id === id);

    const newCartItem = new CartItem_1(productToAdd);
    cart.push(newCartItem);
  }

  saveCartToStorage();
  renderCart();
};

window.updateQuantity = (id, amount) => {
  let item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity += amount;
    if (item.quantity <= 0) {
      removeFromCart(id);
      return;
    }
  }

  saveCartToStorage();
  renderCart();
};

window.removeFromCart = (id) => {
  cart = cart.filter((item) => item.id !== id);
  saveCartToStorage();
  renderCart();
};

document.getElementById("clearCartBtn").onclick = () => {
  cart = [];
  saveCartToStorage();
  renderCart();
  alert("Đã xóa hết giỏ hàng!");
};

document.getElementById("btnCheckout").onclick = () => {
  if (cart.length === 0) {
    alert("Giỏ hàng của bạn đang trống!");
    return;
  }
  cart = [];
  saveCartToStorage();
  renderCart();
  alert("Thanh toán thành công!");
};

document.getElementById("productFilter").onchange = (event) => {
  const type = event.target.value;

  if (type === "all") {
    renderProductList(productList);
  } else {
    const filtered = productList.filter((product) => product.type === type);
    renderProductList(filtered);
  }
};

const initializeApp = () => {
  api
    .getListProductApi()
    .then((result) => {
      productList = result.data;
      renderProductList(productList);
    })
    .catch((error) => {
      console.log(error);
    });

  loadCartFromStorage();
  renderCart();
};

window.onload = initializeApp;
