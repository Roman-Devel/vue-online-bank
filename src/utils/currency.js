const formatter = new Intl.NumberFormat('ru-RU', {currency: 'RUB', style: 'currency'})

export function currency(value) {
	return formatter.format(value)
}

// Используя глобальный объект Intl, форматируем число к нужному виду