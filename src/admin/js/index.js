import '../css/index.css'
import table from '../html/layer/table.tpl'

document.querySelector('#table').innerHTML = table({
	data : [
		{brand: 'MI', name: 'MI6', price: 2999},
		{brand: 'iphone', name: 'iphoneX', price: 9999}
	]
})