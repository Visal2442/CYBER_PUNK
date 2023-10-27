<template>
  <div>
    <v-container fluid>
      <v-row class="pa-1">
        <v-col>
          <v-sheet elevation="5" class="pa-5 w-100" rounded="lg">
            <div id="search" class="d-flex flex-column">
              <h2 class="pa-0 mb-8">Users</h2>
              <v-text-field
                type="search"
                v-model="searchText"
                @input="searchUser(searchText)"
                label="Search"
                variant="outlined"
                density="compact"
                color="green-accent-4"
              ></v-text-field>
            </div>
            <table class="w-100">
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>UserInfo</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user of users" :key="user">
                  <td># {{ user.id }}</td>
                  <td>
                    <div class="d-flex align-center">
                      <v-avatar>
                        <v-img :src="user.image" width="60"></v-img>
                      </v-avatar>
                      <div class="ml-2">
                        <p class="font-weight-bold">{{ user.username }}</p>
                        <v-card-subtitle class="pa-0">{{
                          user.email
                        }}</v-card-subtitle>
                      </div>
                    </div>
                  </td>
                  <td>{{ user.phone_number }}</td>
                  <td>
                    <div class="d-flex">
                      <v-card-subtitle
                        class="pa-0 px-2 py-1 rounded-lg font-weight-bold text-capitalize"
                        :class="[
                          user.role === 'admin' ? adminBackground : '',
                          user.role === 'landlord' ? landloardBackground : '',
                          user.role === 'customer' ? customerBackground : '',
                        ]"
                        >{{ user.role }}</v-card-subtitle
                      >
                    </div>
                  </td>
                  <td>
                    <div class="d-flex align-center">
                      <v-icon
                        class="mdi mdi-pencil-outline mr-3"
                        size="small"
                        color="blue-accent-4"
                        @click="getData(user.id)"
                      >
                        <v-tooltip activator="parent" location="top"
                          >Edit</v-tooltip
                        >
                      </v-icon>
                      <v-icon
                        class="mdi mdi-trash-can-outline"
                        size="small"
                        color="red"
                        @click="deleteUserAccountByAddmin(user.id, user.role)"
                      >
                        <v-tooltip activator="parent" location="top"
                          >Delete</v-tooltip
                        >
                      </v-icon>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="d-flex flex-column align-center justify-center">
              <template v-if="users.length <= 0">
                <v-img
                  :src="require('../../assets/not_found/no_user.svg')"
                ></v-img>
                <h2>No User Found</h2>
              </template>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    <!-- Edit user form  -->
    <v-dialog v-model="dialog" width="35%" class="">
      <v-card rounded="lg">
        <v-card-title class="pa-0 pa-3 bg-green-accent-4 text-white"
          >Edit User</v-card-title
        >
        <div class="w-100 bg-white pa-5">
          <v-form fast-fail x="d-flex flex-column">
            <v-text-field
              type="text"
              clearable
              color="green-accent-4"
              label="Username"
              v-model="userName"
              placeholder="Enter Your Username"
              class="pa-0"
              density="compact"
              variant="outlined"
              rounded="lg"
            ></v-text-field>
            <v-text-field
              type="email"
              clearable
              color="green-accent-4"
              label="Email"
              name="email"
              v-model="email"
              placeholder="Enter Your Email"
              density="compact"
              variant="outlined"
              rounded="lg"
            ></v-text-field>
            <v-select
              v-if="selected !== 'admin'"
              v-model="selected"
              :items="items"
              density="compact"
              variant="outlined"
              label="Role"
              placeholder="Role"
            ></v-select>
            <v-card-actions class="button">
              <v-btn
                class="cancel text-red"
                color="black"
                text
                @click="cancel()"
                >Cancel</v-btn
              >
              <BaseButton type="primary-btn" @click="editUser()"
                >Update</BaseButton
              >
            </v-card-actions>
          </v-form>
        </div>
      </v-card>
    </v-dialog>
    <!-- Delete user dialog  -->
    <v-dialog v-model="deleteUser" width="35%">
      <v-card>
        <v-sheet class="m-5 w-100 bg-white pa-5" elevation="4">
          <div class="cencelIcon">
            <v-icon class="mdi mdi-alert text-red"></v-icon>
          </div>
          <v-form fast-fail x="d-flex flex-column">
            <p align="center" class="mb-5 mt-5">
              Do you want to delete this user?
            </p>
            <v-card-actions class="button">
              <v-btn
                class="cancel text-button text-blue mr-1"
                @click="cancelDelete()"
                >Cancel</v-btn
              >
              <v-btn
                class="deleteBtn bg-red text-overline text-white"
                @click="deleteUserAccount()"
                color="black"
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
import axios from "axios";
export default {
  data() {
    return {
      users: [],
      selected: "",
      dialog: false,
      userName: "",
      email: "",
      searchText: "",
      items: [
        { title: "Landlord", value: "landlord" },
        { title: "Customer", value: "customer" },
      ],
      adminBackground: "bg-light-blue-lighten-5 text-light-blue-darken-1",
      landloardBackground: "bg-green-lighten-5 text-green-accent-4",
      customerBackground: "bg-purple-lighten-5 text-purple-darken-1",
      deleteUser: false,
    };
  },
  methods: {
    getData(user_id) {
      localStorage.setItem("userId", user_id);
      axios.get(`/userId/${user_id}`).then((res) => {
        console.log(res.data.data);
        this.userName = res.data.data.username;
        this.email = res.data.data.email;
        this.selected = res.data.data.role;
      });
      this.dialog = true;
    },
    editUser() {
      const id = localStorage.getItem("userId");
      if (this.userName !== "" && this.email !== "" && this.selected !== "") {
        const userData = {
          username: this.userName,
          email: this.email,
          role: this.selected,
        };
        axios.put(`/updateUser/${id}`, userData).then((res) => {
          console.log(res.data);
          this.dialog = false;
          this.displayUsers();
        });
      }
    },
    async displayUsers() {
      let url = "/users";
      if (this.searchText != "") {
        this.url = url + "?name=" + this.searchText;
      }
      await axios.get(url).then((response) => {
        this.users = response.data.data;
        console.log(this.users);
      });
    },
    searchUser(text) {
      this.searchText = text;
      this.displayUsers();
    },
    deleteUserAccountByAddmin(userId, role) {
      localStorage.setItem("userId", userId);
      localStorage.setItem("userRole", role);
      if (localStorage.getItem("userRole") !== "admin") {
        this.deleteUser = true;
      } else {
        alert("Can not delete admin account!");
      }
    },
    cancelDelete() {
      this.deleteUser = false;
    },
    cancel() {
      this.dialog = false;
    },
    deleteUserAccount() {
      let id = localStorage.getItem("userId");
      axios
        .delete(`/delete_user/${id}`)
        .then(() => {
          this.displayUsers();
        })
        .catch((errors) => {
          console.log(errors);
        });
      this.deleteUser = false;
    },
  },
  components: {
  },
  mounted() {
    this.displayUsers();
  },
};
</script>

<style scoped>
table,
th,
td {
  border-collapse: collapse;
}

thead th {
  border-bottom: 1px solid #b8b2b2;
  padding: 10px;
  text-align: start;
}

tbody td {
  border-bottom: 1px solid #b8b2b2;
  padding: 10px;
}

.input-container {
  gap: 10px;
}
#search .v-text-field {
  width: 30%;
}
</style>
