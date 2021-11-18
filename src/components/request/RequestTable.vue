<template>
	<h4 class="text-center" v-if="requests.length === 0">Заявок пока нет</h4>
	<table class="table" v-else>
		<thead>
			<tr>
				<th>#</th>
				<th>ФИО</th>
				<th>Телефон</th>
				<th>Сумма</th>
				<th>Статус</th>
				<th>Действие</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(req, idx) in requests" :key="req.id">
				<td>{{ idx + 1 }}</td>
				<td>{{ req.fio }}</td>
				<td>{{ req.phone }}</td>
				<td>{{ currency(req.amount) }}</td>
				<td>
					<AppStatus :type="req.status" />
				</td>
				<td>
					<router-link v-slot="{navigate}" custom :to="{name: 'Request', params: {id: req.id}}">
						<button class="btn" @click="navigate">Открыть</button>
					</router-link>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import {currency} from '../../utils/currency'
import AppStatus from '../ui/AppStatus.vue'

export default {
	props: ['requests'],
	setup() {
		return {currency}
	},
	components: {AppStatus}
}
</script>

<style>

</style>