import axios from "axios";

const url = 'api/products';

class ProductService {
  static async buy(sku, amount) {
    try {
      return await axios.post(url + "/buy", null, { params: { sku, amount } });
    } catch (e) {
      console.error(e);
    }
  }

  static async checkAvailability(sku) {
    try {
      return await axios.post(url + "/product", null, { params: { sku } });
    } catch (e) {
      console.error(e);
    }
  }

  static async deleteAllProducts() {
    try {
      return await axios.delete(url + "/products");
    } catch (e) {
      console.error(e);
    }
  }

  static async updateAllProducts() {
    try {
      return await axios.post(url + "/products");
    } catch (e) {
      console.error(e);
    }
  }

  static async getAllProducts() {
    try {
      return await axios.get(url + "/all");
    } catch (e) {
      console.error(e);
    }
  }
}

export default ProductService;
