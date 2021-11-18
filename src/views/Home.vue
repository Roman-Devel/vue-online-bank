<template>
	<AppLoader v-if="loading" />
	<app-page title="Список заявок" v-else>
		<template #header>
			<button class="btn primary" @click="modal = true">Создать</button>
		</template>

		<request-filter v-model="filter"></request-filter>
		<request-table :requests="requests"></request-table>

		<teleport to="body">
			<app-modal v-if="modal" title="Создать заявку" @close="modal = false" >
				<request-modal @created="modal = false" />
			</app-modal>
		</teleport>
	</app-page>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import {useStore} from 'vuex'
import AppPage from '../components/ui/AppPage.vue'
import RequestTable from '../components/request/RequestTable.vue'
import RequestModal from '../components/request/RequestModal.vue'
import RequestFilter from '../components/request/RequestFilter.vue'
import AppModal from '../components/ui/AppModal.vue'
import AppLoader from '../components/ui/AppLoader.vue'

export default {
	setup() {
		const store = useStore()
		const modal = ref(false)
		const loading = ref(false)
		const filter = ref({})

		onMounted(() => {
			loading.value = true
			setTimeout(async () => {
				await store.dispatch('request/load')
				loading.value = false
			}, 300)
		})

		const requests = computed(() => store.getters['request/requests']
			.filter(request => {
				if (filter.value.name) {
					return request.fio.includes(filter.value.name)
				}
				return request
			})
			.filter(request => {
				if (filter.value.status) {
					return filter.value.status === request.status
				}
				return request
			})
		)

		return {
			modal,
			requests,
			loading,
			filter
		}
	},
  	components: {
		AppPage,
		RequestTable,
		RequestModal,
		RequestFilter,
		AppModal,
		AppLoader
	}
}
</script>