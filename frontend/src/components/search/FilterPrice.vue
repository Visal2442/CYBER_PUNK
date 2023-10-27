<template>
  <v-row class="d-flex align-center">
    <v-col class="d-flex align-center" cols="5">
      <div>From:</div>
      <v-text-field
        type="number"
        min="0"
        v-model="price.min"
        class="ml-1"
        density="compact"
        variant="solo"
        single-line
        hide-details
      ></v-text-field>
    </v-col>
    <v-col class="d-flex align-center" cols="5">
      <div>To:</div>
      <v-text-field
        type="number"
        min="0"
        v-model="price.max"
        class="ml-1"
        density="compact"
        variant="solo"
        single-line
        hide-details
      ></v-text-field>
    </v-col>
    <v-col cols="2">
      <BaseButton type="primary-btn" :disabled="!isNumber" @click="onPrice"
        >Filter</BaseButton
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      price: {
        min: 0,
        max: 0,
      },
      isNumber: false,
    };
  },
  methods: {
    onPrice() {
      this.$emit("onPrice", this.price);
    },
  },
  watch: {
    price(newValue) {
      this.price.min = newValue.min;
      this.price.max = newValue.max;
      if (newValue.min > 0 && newValue.max > 0) {
        this.isNumber = true;
      } else {
        this.isNumber = false;
      }
    },
  },
  components: {
  },
};
</script>

<style></style>
