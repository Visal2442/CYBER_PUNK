<template>
  <!-- Edit dialog  -->
  <v-dialog v-model="isShowEditDialog">
    <v-card>
      <v-sheet class="m-10 w-100 bg-white pa-8" elevation="4">
        <v-card-title
          align="center"
          class="text-green text-h4 mb-5 font-weight-bold"
          >EDIT PROPERTY</v-card-title
        >
        <v-form fast-fail x="d-flex flex-column">
          <div class="d-flex">
            <v-text-field
              type="text"
              clearable
              color="green-accent-4"
              label="House Name"
              class="mr-5"
              placeholder="House Name"
              variant="outlined"
              v-model="propertyObj.houseName"
            ></v-text-field>
            <v-text-field
              type="text"
              clearable
              color="green-accent-4"
              label="Size"
              name="size"
              placeholder="Size"
              variant="outlined"
              v-model="propertyObj.size"
            ></v-text-field>
          </div>
          <div class="d-flex">
            <v-text-field
              type="number"
              clearable
              color="green-accent-4"
              label="Price Per Month"
              class="mr-5"
              placeholder="Price Per Month"
              variant="outlined"
              v-model="propertyObj.pricePerMonth"
            ></v-text-field>
            <v-file-input
              label="Choose an image"
              id="image-file-input"
              name="image"
              variant="outlined"
              clearable
              color="green-accent-4"
              accept="image/*"
              placeholder="Image"
              v-on:change="getImage"
            ></v-file-input>
          </div>
          <div class="d-flex">
            <v-text-field
              type="number"
              clearable
              color="green-accent-4"
              label="Floor"
              class="mr-5"
              name="floor"
              placeholder="Floor"
              variant="outlined"
              v-model="propertyObj.floor"
            ></v-text-field>
            <v-text-field
              type="number"
              clearable
              color="green-accent-4"
              label="Number Of Room"
              class="mr-5"
              name="room"
              placeholder="Number Of Room"
              variant="outlined"
              v-model="propertyObj.numberOfRooms"
            ></v-text-field>
            <v-text-field
              type="number"
              clearable
              color="green-accent-4"
              label="Number Of Kitchen"
              class="mr-5"
              name="kitchen"
              placeholder="Number Of Kitchen"
              variant="outlined"
              v-model="numberOfKitchens"
            ></v-text-field>
            <v-text-field
              type="number"
              clearable
              color="green-accent-4"
              label="Number Of Bathroom"
              name="bathroom"
              placeholder="Number Of Bathroom"
              variant="outlined"
              v-model="propertyObj.numberOfBathrooms"
            ></v-text-field>
          </div>
          <div class="d-flex">
            <v-select
              v-model="propertyObj.selected"
              placeholder="Number Of Kitchen"
              label="Select District"
              :items="districts"
              density="compact"
              color="green-accent-4"
              variant="outlined"
            ></v-select>
          </div>
          <div class="d-flex">
            <v-textarea
              clearable
              label="Description"
              placeholder="Discription"
              color="green-accent-4"
              variant="outlined"
              v-model="propertyObj.description"
            ></v-textarea>
          </div>
          <v-card-actions class="button">
            <v-btn
              class="cancel text-red"
              color="black"
              text
              @click="closeEditDialog()"
              >Cancel</v-btn
            >
            <v-btn
              class="save bg-green-accent-3 text-white"
              color="black"
              text
              @click="saveChanges()"
              >Update</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-sheet>
    </v-card>
  </v-dialog>
</template>
<script>
import http from "@/axios-http";

export default {
  props: ["showEditDialog", "property"],
  data() {
    return {
      isShowEditDialog: this.showEditDialog,
      propertyObj: this.property,
    };
  },
  methods: {
    closeEditDialog() {
      this.isShowEditDialog = !this.isShowEditDialog;
      this.$emit("closeEditDialog", false);
    },
    saveChanges() {
      this.$emit("saveChanges", this.propertyObj);
      this.$emit("closeEditDialog", false);
    },
    getImage(event) {
      const file = event.target.files[0];
      const form = new FormData();
      form.append("propertyImage", file);
      http.post("/image", form).then((response) => {
        this.propertyObj.propertyImage = response.data;
      });
    },
  },
};
</script>
