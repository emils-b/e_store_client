<template>
  <div class="col-lg-3 col-md-6 col-sm-6 d-flex">
    <div class="card w-100 my-2 shadow-2-strong">
      <div class="card-body d-flex flex-column">
        <h6 v-if="hasError" style="color: red">
          Could not update product info
        </h6>
        <h5 class="card-title">{{ product.name }}</h5>
        <p class="card-text">{{ product.description }}</p>
        <p class="card-text">Available: {{ product.amount }}</p>
        <p class="card-text">{{ product.price }} EUR</p>
        <div class="card-footer align-items-end">
          <div class="col-12">
            <input
              class="col-3"
              style="margin: 5px"
              v-model.number="selectedAmount"
              placeholder="Product amount"
              type="number"
              min="0"
              value="1"
              oninput="validity.valid||(value='');"
            />
            <button
              type="button"
              class="btn btn-primary"
              :disabled="!canBuy"
              @click="buy"
            >
              Buy
            </button>
          </div>
          <div class="col-12 pt-2">
            <button
              type="button"
              class="btn btn-primary"
              @click="checkAvailability"
            >
              Ckeck availability
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductService from "../services/ProductService";

export default {
  name: "EStoreProduct",
  props: {
    pProduct: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedAmount: 0,
      product: this.pProduct,
      hasError: false,
    };
  },
  computed: {
    canBuy() {
      return !!this.selectedAmount;
    },
  },
  methods: {
    async buy() {
      if (this.selectedAmount > this.product.amount) {
        window.alert(
          "You can not select more products then currently available"
        );
        return;
      }

      const response = await ProductService.buy(
        this.product.sku,
        this.selectedAmount
      );

      if (response.data.success) {
        location.reload();
      } else {
        this.hasError = true;
      }
    },
    async checkAvailability() {
      const response = await ProductService.checkAvailability(this.product.sku);

      if (response.data.success) {
        this.hasError = false;
        this.product.amount = response.data.amount;
      } else {
        this.hasError = true;
      }
    },
  },
};
</script>
