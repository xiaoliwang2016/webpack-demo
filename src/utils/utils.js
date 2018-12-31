const generateRand = function(n){
	var str = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
	var res = ''
	for( let i=0 ; i < n; i++){
		res += str[Math.floor(Math.random() * str.length)]
	}
	return res
}

export { generateRand }