class ApiServices {
  getListProductApi() {
    const promise = axios({
      url: `https://690cb3aca6d92d83e84f04c9.mockapi.io/api/Products`,
      method: "GET",
    });
    return promise;
  }

  deleteProductApi(id) {
    const promise = axios({
      url: `https://690cb3aca6d92d83e84f04c9.mockapi.io/api/Products/${id}`,
      method: "DELETE",
    });
    return promise;
  }

  addProductApi(product) {
    const promise = axios({
      url: `https://690cb3aca6d92d83e84f04c9.mockapi.io/api/Products`,
      method: "POST",
      data: product,
    });
    return promise;
  }

  getProductById(id) {
    const promise = axios({
      url: `https://690cb3aca6d92d83e84f04c9.mockapi.io/api/Products/${id}`,
      method: "GET",
    });
    return promise;
  }

  updateProductApi(product) {
    const promise = axios({
      url: `https://690cb3aca6d92d83e84f04c9.mockapi.io/api/Products/${product.id}`,
      method: "PUT",
      data: product,
    });
    return promise;
  }
}

export default ApiServices;
