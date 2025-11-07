import ApiServices from "./../services/apiServices.js";
import Product from "./../modals/product.js"

const api = new ApiServices();

let allProducts = [];

const getEle = (id) => {
  return document.getElementById(id);
};

const getListProduct = () => {
  const promise = api.getListProductApi();
  promise
    .then((result) => {
      allProducts = result.data;
      renderListProduct(allProducts);
    })
    .catch((error) => {
      console.log(error);
    });
};

getListProduct();

const renderListProduct = (data) => {
  let contentHTML = "";
  for (let i = 0; i < data.length; i++) {
    const product = data[i];
    contentHTML += `
      <tr>
          <td>${i + 1}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.screen}</td>
          <td>${product.backCamera}</td>
          <td>${product.frontCamera}</td>
          <td>
            <img src = "${product.img}" width="50"/>
          </td>
          <td>${product.desc}</td>
          <td>${product.type}</td>
          <td>
            <button 
              class="btn btn-info mx-1" 
              data-bs-toggle="modal" 
              data-bs-target="#productModal" 
              onclick="handleEditProduct(${product.id})"
            >
              <i class="fa-solid fa-edit"></i>
            </button>
            <button 
              class="btn btn-danger mx-1" 
              onclick="handleDeleteProduct(${product.id})"
            >
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        </tr>
      `;
  }
  document.getElementById("tblDanhSachSP").innerHTML = contentHTML;
};

const handleDeleteProduct = (id) => {
  const promise = api.deleteProductApi(id);
  promise
  .then((result) => {
    getListProduct();
    Swal.fire({
      title: "Đã xóa!",
      text: `Đã xóa thành công sản phẩm ${result.data.id}.`,
      icon: "success",
      confirmButtonText: "Đồng ý"
    });
  })
  .catch((error) => {
    console.log(error);
  })
};

window.handleDeleteProduct = handleDeleteProduct;

getEle("btnThemSP").onclick = () => {

  document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm sản phẩm mới";

  const addProductBtn = `<button class="btn btn-primary" onclick="handleAddProduct()">Add Product</button>`
  document.getElementsByClassName("modal-footer")[0].innerHTML = addProductBtn

  getEle("TenSP").value = "";
  getEle("GiaSP").value = "";
  getEle("ManHinh").value = "";
  getEle("CameraSau").value = "";
  getEle("TruocCamera").value = "";
  getEle("HinhSP").value = "";
  getEle("Mota").value = "";
  getEle("Type").selectedIndex = 0;
}

const handleAddProduct = () => {
  const name = getEle("TenSP").value;
  const price = getEle("GiaSP").value;
  const screen = getEle("ManHinh").value;
  const backCamera = getEle("CameraSau").value;
  const frontCamera = getEle("TruocCamera").value;
  const img = getEle("HinhSP").value;
  const desc = getEle("Mota").value;
  const type = getEle("Type").value;

  const product = new Product("", name, price, screen, backCamera, frontCamera, img, desc, type);

  const promise = api.addProductApi(product);
  promise
  .then((result) => {
    getListProduct();
    document.getElementsByClassName("btn-close")[0].click();
    alert(`Add product id=${result.data.id} successfully!`);
  })
  .catch((error) => {
    console.log(error);
  })
}

window.handleAddProduct = handleAddProduct;

const handleEditProduct = (id) => {
  document.getElementsByClassName("modal-title")[0].innerHTML = "Edit Phone";

  const updateProductBtn = `<button class="btn btn-primary" onclick="handleUpdateProduct(${id})">Update Product</button>`
  document.getElementsByClassName("modal-footer")[0].innerHTML = updateProductBtn;
  
  const promise = api.getProductById(id);
  promise
  .then((result) => {
    const product = result.data;
    getEle("TenSP").value = product.name;
    getEle("GiaSP").value = product.price;
    getEle("ManHinh").value = product.screen;
    getEle("CameraSau").value = product.backCamera;
    getEle("TruocCamera").value = product.frontCamera;
    getEle("HinhSP").value = product.img;
    getEle("Mota").value = product.desc;
    getEle("Type").value = product.type;
  })
  .catch((error) => {
    console.log(error);
  })
}

window.handleEditProduct = handleEditProduct;

const handleUpdateProduct = (id) => {
  const name = getEle("TenSP").value;
  const price = getEle("GiaSP").value;
  const screen = getEle("ManHinh").value;
  const backCamera = getEle("CameraSau").value;
  const frontCamera = getEle("TruocCamera").value;
  const img = getEle("HinhSP").value;
  const desc = getEle("Mota").value;
  const type = getEle("Type").value;

  const product = new Product(id, name, price, screen, backCamera, frontCamera, img, desc, type);

  const promise = api.updateProductApi(product);
  promise
  .then((result) => {
    const product = result.data;
    getListProduct();
    document.getElementsByClassName("btn-close")[0].click();
    alert(`Edit product id=${product.id} successfully!`);
  })
  .catch((error) => {
    console.log(error);  
  })
}

window.handleUpdateProduct = handleUpdateProduct

const handleSearchProduct = () => {
  const searchTerm = getEle("searchInput").value.toLowerCase().trim();

  const filteredProducts = allProducts.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm);
  });

  renderListProduct(filteredProducts);
};

getEle("searchInput").oninput = handleSearchProduct;
getEle("basic-addon2").onclick = handleSearchProduct