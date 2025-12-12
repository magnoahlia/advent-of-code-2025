const fs = require('fs');
console.log(
	fs.readFileSync('input/12.txt').toString().trim().split('\n').slice(30).reduce((a, l) => {
		const [r, p] = l.split(': ');
		const rArea = r.split('x').reduce((a, v) => a *= parseInt(v), 1);
		const pArea = p.split(' ').reduce(((a, v) => a += parseInt(v)), 0) * 9;
		if (rArea >= pArea) a++
		return a;
	}, 0)
);