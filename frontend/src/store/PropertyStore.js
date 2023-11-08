import { defineStore } from "pinia";
import http from "@/axios-http";
import { fetchProperties } from "@/api/property";

export const usePropertyStore = defineStore("property", {
  state: () => ({
    properties: [],
    propertiesPerpage: [],
    userProperties: [],
    userId: localStorage.getItem("user_id"),
  }),
  actions: {
    // Get all properties
    async getAllProperties() {
      this.properties = await fetchProperties()
    },
    // Get 12 properties per page
    async getPropertiesPerPage() {
      await http
        .get("/properties/pagination")
        .then((res) => {
          this.propertiesPerpage = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // Get properties by user id
    async getPropertiesByUserId() {
      await http
        .get(`/getAllProperties/${this.userId}`)
        .then((res) => {
          this.userProperties = res.data.data;
        })
        .catch((err) => console.log(err));
    },
    // Delete property by id
    async deletePropertyById(propertyId) {
      await http
        .delete(`/properties/delete/${propertyId}`)
        .then(() => {
          this.getPropertiesByUserId();
          this.getAllProperties();
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    // Update property by id
    async updatePropertyById(propertyId, data) {
      await http
        .put(`/updateProperty/${propertyId}`, data)
        .then(() => {
          this.getPropertiesByUserId();
          this.getAllProperties();
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
  },
  getters: {
    propertyCount: (state) => state.properties.length,
  },
});
