<template>
  <div class="type">
    <v-select v-model="selected" :items="items" density="compact"></v-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "",
      items: [
        { title: "All Types", value: "" },
        { title: "House Rent", value: "house" },
        { title: "Room Rent", value: "room" },
      ],
    };
  },
  watch: {
    selected(value) {
      this.$emit("onSelect", value);
    },
  },
};
</script>
<style scoped>
.price-type {
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: -38%; */
  /* margin-bottom: 35%; */
}

.select {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 45%;
}

.price,
.type {
  width: 50%;
}

select {
  width: 95%;
  text-align: center;
  padding: 8px;
  background: white;
  border-radius: 5px;
}
</style>
