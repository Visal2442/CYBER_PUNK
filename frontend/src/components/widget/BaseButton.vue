<template>
  <v-btn :class="type" outlined rounded="md" class="">
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  props: ["type"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.seconday-btn {
  border: 1px solid #00e676;
  margin-left: 2px;
}
.primary-btn {
  background: #00e676;
  margin-right: 2px;
}
</style>
