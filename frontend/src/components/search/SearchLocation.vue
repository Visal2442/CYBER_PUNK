<template>
  <div class="search-location d-flex flex-column align-center">
    <v-text-field
      class="w-100 position-relative"
      density="compact"
      variant="solo"
      label="Search District"
      append-inner-icon="mdi-magnify"
      single-line
      hide-details
      v-model="searchText"
    ></v-text-field>
    <div class="w-100">
      <ul
        class="result position-absolute w-100"
        density="compact"
        elevation="4"
      >
        <div v-for="district in districts" :key="district.id">
          <li
            class="district pa-3"
            v-if="!isNotFound"
            @click="onClick(district)"
          >
            <v-icon icon="mdi mdi-magnify" class="mr-4"></v-icon>
            {{ district.name }}
          </li>
        </div>
        <li class="district pa-3" v-if="isNotFound">{{ districts.message }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import http from "@/axios-http";

export default {
  data() {
    return {
      searchText: null,
      districts: [],
      isClicked: false,
      isNotFound: false,
    };
  },
  methods: {
    onClick(district) {
      this.searchText = district.name;
      this.isClicked = true;
      this.$emit("onSearch", district.id);
    },
  },
  watch: {
    async searchText(newValue) {
      this.$emit("onInput", newValue);
      if (newValue != "" && !this.isClicked) {
        try {
          const response = await http.get(`/properties/location/${newValue}`);
          this.isNotFound = false;
          this.districts = response.data.data;
        } catch (err) {
          this.isNotFound = true;
          this.districts = err.response.data;
        }
      } else {
        this.isClicked = false;
        this.districts = [];
      }
    },
  },
};
</script>

<style scoped>
.search-location {
  position: relative;
}

.district {
  list-style-type: none;
}

.district:hover {
  background-color: rgb(228, 228, 228);
  cursor: pointer;
}

.result {
  background: white;
  z-index: 100;
  top: 45px;
  /* box-shadow: 10px 10px 6px lightblue; */
}
</style>
