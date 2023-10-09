<template>
  <div>
    <header
      class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom"
    >
      <span
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none fs-4"
        >E-Store System</span
      >
      <div class="float-left">
        <button
          type="button"
          class="btn btn-danger"
          style="margin: 5px"
          @click="deleteAllProducts"
        >
          Delete all products
        </button>
        <button
          type="button"
          class="btn btn-success"
          @click="updateAllProducts"
        >
          Update all products
        </button>
      </div>
    </header>
  </div>
</template>

<script>
import ProductService from "../services/ProductService";

export default {
  name: "EStoreHeader",
  methods: {
    async deleteAllProducts() {
      const response = await ProductService.deleteAllProducts();

      if (response.data.success) {
        location.reload();
      } else {
        window.alert(response.data.message);
      }
    },
    async updateAllProducts() {
      const response = await ProductService.updateAllProducts();

      if (response.data.success) {
        location.reload();
      } else {
        window.alert(response.data.message);
      }
    },
  },
};
</script>

<style scoped></style>
