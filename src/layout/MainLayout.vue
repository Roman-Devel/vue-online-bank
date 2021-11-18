<template>
	<TheNavbar />
	<TheSidebar />
	<div class="container with-nav">
		<app-message />
		<router-view />
	</div>
</template>

<script>
import TheNavbar from '../components/TheNavbar.vue'
import TheSidebar from '../components/TheSidebar.vue'
import AppMessage from '../components/ui/AppMessage.vue'

export default {
	components: {TheNavbar, TheSidebar, AppMessage}
}
</script>

<style>

</style>