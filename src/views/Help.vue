<template>
	<app-page back title="Помощь">
		<question-item
			v-for="question in questions"
			:key="question.title"
			:question="question"
		></question-item>
	</app-page>
</template>

<script>
import AppPage from '../components/ui/AppPage.vue'
import QuestionItem from '../components/question/QuestionItem.vue'

export default {
	setup() {
		const questions = [
			{title: 'Что есть в данной системе?', text: 'Здесь есть всё, для того, чтобы смотреть, какие заявки человек добавлял'},
			{title: 'Как работает авторизация?', text: 'Всё реализовано через Firebase'},
		]

		return {questions}
	},
	components: {AppPage, QuestionItem}
}
</script>
