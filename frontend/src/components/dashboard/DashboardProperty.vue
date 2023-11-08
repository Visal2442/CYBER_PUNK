<template>
  <div>
    <v-container fluid class="my-5">
      <h1 v-if="role == 'landlord'" class="my-5">Your Properties</h1>
      <h1 v-else class="my-5">All Properties</h1>
      <v-container class="" elevation="6">
        <v-row>
          <table class="w-100">
            <thead class="bg-green-accent-4">
              <tr class="">
                <th class="text-start">Image</th>
                <th class="text-start">Price</th>
                <th class="text-start">Size</th>
                <th class="text-start">Floor</th>
                <th class="text-start">Room</th>
                <th class="text-start">Bathroom</th>
                <th class="text-start">Kitchen</th>
                <th class="text-start">Status</th>
                <th class="text-start">Action</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="properties && !isLoading">
                <tr class="" v-for="property of properties" :key="property.id">
                  <td><v-img :src="property.image" width="100"></v-img></td>
                  <td>${{ property.price }}/Month</td>
                  <td>{{ property.size }}</td>
                  <td>{{ property.number_of_floor }}</td>
                  <td>{{ property.number_of_room }}</td>
                  <td>{{ property.number_of_bathroom }}</td>
                  <td>{{ property.number_of_kitchen }}</td>
                  <td>
                    <div class="d-flex">
                      <v-card-subtitle
                        v-if="property.available"
                        class="pa-0 bg-light-blue-lighten-4 text-light-blue-darken-1 px-2 py-1 rounded-lg font-weight-bold"
                        >Available</v-card-subtitle
                      >
                      <v-card-subtitle
                        v-else
                        class="pa-0 bg-red-lighten-4 text-red-darken-1 px-2 py-1 rounded-lg font-weight-bold"
                        >Unavailable</v-card-subtitle
                      >
                    </div>
                  </td>
                  <td>
                    <div class="d-flex align-center">
                      <v-icon
                        class="mdi mdi-pencil-outline mr-1"
                        size="small"
                        color="blue-accent-4"
                        @click="editProperty(property.id)"
                      >
                        <v-tooltip activator="parent" location="top"
                          >Edit</v-tooltip
                        >
                      </v-icon>
                      <v-icon
                        class="mdi mdi-trash-can-outline"
                        size="small"
                        color="red"
                        @click="dialogDeleteProperty(property.id)"
                      >
                        <v-tooltip activator="parent" location="top"
                          >Delete</v-tooltip
                        >
                      </v-icon>
                    </div>
                  </td>
                </tr>
              </template>
              <tr v-else-if="isLoading">
                <the-loader></the-loader>
              </tr>
            </tbody>
          </table>
        </v-row>
      </v-container>
    </v-container>

    <!-- Edit dialog  -->
    <edit-dialog
      v-if="showEditDialog"
      :showEditDialog="showEditDialog"
      @closeEditDialog="closeEditDialog"
      @saveChanges="saveChanges"
      :property="property"
    ></edit-dialog>
    <!-- Delete dialog  -->
    <v-dialog v-model="deleteDialog" width="25%">
      <v-card>
        <v-sheet class="m-5 w-100 bg-white pa-5" elevation="4">
          <div class="cencelIcon">
            <v-icon class="mdi mdi-alert text-red"></v-icon>
          </div>
          <v-form fast-fail x="d-flex flex-column">
            <p align="center" class="mb-5 mt-5">
              Do you want to delete this property?
            </p>
            <v-card-actions class="button">
              <v-btn
                class="cancel text-button text-blue mr-1"
                @click="deleteDialog = !deleteDialog"
                >Cancel</v-btn
              >
              <v-btn
                class="deleteBtn bg-red text-overline text-white"
                color="black"
                @click="deleteProperty()"
              >
                Delete
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-sheet>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import http from "@/axios-http";
import Cookies from "js-cookie";
// Property Store
import { usePropertyStore } from "../../store/PropertyStore";
import { mapActions } from "pinia";
import TheLoader from "../common/TheLoader.vue";
import EditDialog from "../dialog/EditDialog.vue";
export default {
  props: ["properties"],
  data() {
    return {
      role: Cookies.get("role"),
      showEditDialog: false,
      deleteDialog: false,
      property: {
        houseName: "",
        size: "",
        pricePerMonth: 0,
        image: "",
        floor: 0,
        numberOfRooms: 0,
        numberOfKitchens: 0,
        numberOfBathrooms: 0,
        selected: "",
        description: "",
        propertyImage: "",
      },
      districts: [],
      isLoading: true,
    };
  },
  methods: {
    ...mapActions(usePropertyStore, [
      "deletePropertyById",
      "updatePropertyById",
    ]),
    // Edit property
    editProperty(propertyId) {
      localStorage.setItem("property_id", propertyId);
      http.get(`/properties/detail/${propertyId}`).then((response) => {
        const property = response.data.data;
        if (property.type == "house") {
          this.property.houseName = property.name;
          this.property.size = property.size;
          this.property.pricePerMonth = property.price;
          this.property.image = property.image;
          this.property.floor = property.number_of_floor;
          this.property.numberOfBathrooms = property.number_of_bathroom;
          this.property.numberOfKitchens = property.number_of_kitchen;
          this.property.numberOfRooms = property.number_of_room;
          this.property.description = property.description;
          this.property.selected = this.property.district;
        } else {
          this.property.houseName = property[0]["name"];
          this.property.size = property[0]["size"];
          this.property.pricePerMonth = property[0]["price"];
          this.property.image = property[0]["image"];
          this.property.floor = property[0]["number_of_floor"];
          this.property.numberOfBathrooms = property[0]["number_of_bathroom"];
          this.property.numberOfKitchens = property[0]["number_of_kitchen"];
          this.property.numberOfRooms = property[0]["number_of_room"];
          this.property.description = property[0]["description"];
          this.property.selected = property[0]["district"]["value"];
        }
      });
      localStorage.setItem("property_id", propertyId);
      this.showEditDialog = true;
    },
    closeEditDialog(val) {
      this.showEditDialog = val;
    },
    saveChanges(propertyObj) {
      let propertyId = localStorage.getItem("property_id");
      const data = {
        name: propertyObj.houseName,
        size: propertyObj.size,
        price: propertyObj.pricePerMonth,
        image: propertyObj.propertyImage,
        number_of_floor: propertyObj.floor,
        number_of_room: propertyObj.numberOfRooms,
        number_of_kitchen: propertyObj.numberOfKitchens,
        number_of_bathroom: propertyObj.numberOfBathrooms,
        description: propertyObj.description,
        district_id: propertyObj.selected,
      };
      this.updatePropertyById(propertyId, data);
      this.$emit("modify");
    },
    // Delete Property
    dialogDeleteProperty(propertyId) {
      localStorage.setItem("property_id", propertyId);
      this.deleteDialog = true;
    },
    deleteProperty() {
      let propertyId = localStorage.getItem("property_id");
      this.deletePropertyById(propertyId);
      this.$emit("modify");
      this.deleteDialoge = false;
    },
    async fetchDistricts() {
      await http.get("/districts").then((res) => {
        this.districts = res.data.data;
      });
    },
  },
  async mounted() {
    await this.fetchDistricts();
    this.isLoading = false;
  },
  components: { TheLoader, EditDialog },
};
</script>

<style scoped>
table,
th,
td {
  border: none;
  border-collapse: collapse;
}

thead th {
  padding: 10px;
}

tbody td {
  border-bottom: 1px solid #e7e7e7;
  padding: 10px;
}

.button {
  display: flex;
  justify-content: end;
  margin-top: -1%;
}

.cancel:hover {
  background: rgb(239, 239, 239);
}

.save:hover {
  background: gray;
}

.cencelIcon {
  display: flex;
  justify-content: center;
  font-size: 30px;
}

.deleteDialog {
  height: 50%;
}

.v-img {
  border-radius: 5px;
}
</style>
