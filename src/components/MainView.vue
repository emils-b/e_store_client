<template>
  <div class="container">
    <EStoreHeader />
    <section>
      <div class="container my-5">
        <header class="mb-4">
          <h3>Products</h3>
        </header>
        <div v-if="hasError">
          <h5>Could not retrieve all products. Please try later!</h5>
        </div>
        <div v-else class="row">
          <EStoreProduct
            v-for="product in products"
            :key="product.id"
            :pProduct="product"
          />
        </div>
      </div>
    </section>
    <EStoreFooter />
  </div>
</template>

<script>
import ProductService from "../services/ProductService";
import EStoreHeader from "./EStoreHeader.vue";
import EStoreProduct from "./EStoreProduct.vue";
import EStoreFooter from "./EStoreFooter.vue";

export default {
  name: "MainView",
  components: { EStoreHeader, EStoreProduct, EStoreFooter },
  data() {
    return {
      products: [],
      hasError: false,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const response = await ProductService.getAllProducts();

      if (response.data.success) {
        this.products = response.data.results;
      } else {
        this.hasError = true;
      }
    },
  },
};
</script>

<style scoped></style>
