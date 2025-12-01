import axiosClient from "./axiosClient";

const cartApi = {
  getMyCart: () => axiosClient.get("/api/cart/my"),
  addToCart: (productId) =>
    axiosClient.post("/api/cart/add", { productId, quantity: 1 }),
  updateCart: (productId, quantity) =>
    axiosClient.put("/api/cart/update", { productId, quantity }),
  removeFromCart: (productId) =>
    axiosClient.delete(`/api/cart/remove/${productId}`),
};

export default cartApi;
