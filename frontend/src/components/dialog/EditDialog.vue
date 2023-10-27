<template>
        <!-- Edit dialog  -->
        <v-dialog v-model="isShow">
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
                v-model="houseName"
              ></v-text-field>
              <v-text-field
                type="text"
                clearable
                color="green-accent-4"
                label="Size"
                name="size"
                placeholder="Size"
                variant="outlined"
                v-model="size"
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
                v-model="pricePerMonth"
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
                v-model="floor"
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
                v-model="numberOfRooms"
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
                v-model="numberOfBathrooms"
              ></v-text-field>
            </div>
            <div class="d-flex">
              <v-select
                v-model="selected"
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
                v-model="description"
              ></v-textarea>
            </div>
            <v-card-actions class="button">
              <v-btn
                class="cancel text-red"
                color="black"
                text
                @click="dialog = !dialog"
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
export default {
    props:[isShow],
    data(){
        return {
            
        }
    }
}
</script>