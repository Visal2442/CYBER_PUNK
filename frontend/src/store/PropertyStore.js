import { defineStore } from "pinia";
import {
  fetchProperties,
  fetchPropertiesPerPage,
  fetchPropertiesByUserId,
  deletePropertyById,
  updatePropertyById,
} from "@/api/property";

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
      this.properties = await fetchProperties();
    },
    // Get 12 properties per page
    async getPropertiesPerPage() {
      this.propertiesPerpage = await fetchPropertiesPerPage();
    },
    // Get properties by user id
    async getPropertiesByUserId() {
      this.userProperties = await fetchPropertiesByUserId(this.userId);
    },
    // Delete property by id
    async deletePropertyById(propertyId) {
      await deletePropertyById(propertyId);
      await this.getPropertiesByUserId();
      await this.getAllProperties();
    },
    // Update property by id
    async updatePropertyById(propertyId, data) {
      await updatePropertyById(propertyId, data);
      await this.getPropertiesByUserId();
      await this.getAllProperties();
    },
  },
  getters: {
    propertyCount: (state) => state.properties.length,
  },
});
