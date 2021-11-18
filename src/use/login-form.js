import {computed, watch} from 'vue'
import * as yup from 'yup'							// 1.1 - импортируем набор валидаторов
import {useField, useForm} from 'vee-validate'		// 1 - импортируем библиотеку
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useLoginForm() {
	const store = useStore()
	const router = useRouter()
	const {handleSubmit, isSubmitting, submitCount} = useForm()	// 6 - создаём валидатор формы

	// 2 - создаём поле и вытаскиваем нужные методы валидации
		// первый параметр - название контрола
		// второй параметр - набор валидаторов
	const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
		'email',
		yup
			.string()
			.trim()
			.required('Введите email')
			.email('Необходимо ввести корректный email')
	)

	const MIN_LENGTH = 6
	const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
		'password',
		yup
			.string()
			.trim()
			.required('Введите пароль')
			.min(MIN_LENGTH, `Пароль не может быть меньше ${MIN_LENGTH} символов`)
	)

	const isTooManyAttempts = computed(() => submitCount.value >= 3)	// 9 - считаем количество отправок формы

	// 10 - если произошло закликивание и блокировка кнопки
		// наблюдаем за свойством и по таймеру разблокируем кнопку
	watch(isTooManyAttempts, val => {
		if (val) {
			setTimeout(() => submitCount.value = 0, 1500)
		}
	})

	// 7 - создаём событие отправки через валидатор
		// на входе собирает все значения формы
	const onSubmit = handleSubmit(async values => {
		try {
			await store.dispatch('auth/login', values)	// обращаемся к action через имя модуля/название
			router.push('/')
		} catch (e) {}
	})

	return {
		email,	// 3 - возвращаем методы в шаблон
		eError,
		eBlur,
		password,
		pError,
		pBlur,
		onSubmit,
		isSubmitting,
		isTooManyAttempts
	}
}