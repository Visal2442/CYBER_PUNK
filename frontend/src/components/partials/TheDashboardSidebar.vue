<template>
  <nav>
    <v-navigation-drawer
      id="sidebar"
      v-model="drawer"
      class="pa-5"
      disable-resize-watcher
      :width="menubarWith"
    >
      <v-list-item @click="resizeSidebar(sidebarWidth)">
        <v-img
          :src="require('../../assets/logo-transparent.png')"
          class="mb-7 mt-2"
        ></v-img>
      </v-list-item>
      <v-divider></v-divider>
      <v-list flat>
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          router
          to="/dashboard"
        ></v-list-item>
        <v-list-item
          v-if="role == 'landlord'"
          prepend-icon="mdi-home-plus"
          title="Add Property"
          router
          :to="{ name: 'Post' }"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-home-group"
          title="Properties"
          router
          :to="{
            name: role == 'admin' ? 'AdminProperties' : 'LandlordProperties',
          }"
        ></v-list-item>
        <v-list-item
          v-if="role == 'admin'"
          prepend-icon="mdi-account-group"
          title="All Users"
          router
          :to="{ name: 'Users' }"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { useAuthStore } from "@/store/AuthStore";
import { mapState } from "pinia";

export default {
  data() {
    return {
      drawer: true,
      sidebarWidth: 300,
    };
  },
  methods: {
    resizeSidebar(width) {
      if (300 > width) {
        this.sidebarWidth += 200;
      } else {
        this.sidebarWidth -= 200;
      }
    },
  },
  computed: {
    ...mapState(useAuthStore, ["role"]),
    menubarWith() {
      return this.sidebarWidth;
    },
  },
};
</script>

<style scoped>
#navbar {
  position: sticky;
  top: 0;
  z-index: 2000;
}

#sidebar {
  position: static;
}
.v-list-item--active {
  /* background: #00E676; */
  color: #00e676;
}
</style>
