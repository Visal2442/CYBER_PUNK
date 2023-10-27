<template>
    <v-app>
        <TheDashboardSidebar></TheDashboardSidebar>
        <v-main>
            <TheDashboardHeader></TheDashboardHeader>
            <RouterTransition></RouterTransition>
        </v-main>
    </v-app>
</template>
<script>
import TheDashboardSidebar from '../partials/TheDashboardSidebar.vue';
import TheDashboardHeader from '../partials/TheDashboardHeader.vue';
import RouterTransition from '../widget/RouterTransition.vue';
export default {
    components:{
        TheDashboardSidebar,
        TheDashboardHeader,
        RouterTransition
    }
}
</script>