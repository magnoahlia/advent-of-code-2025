const fs = require('fs');
const math = require('./util/math');

let pos = 50;
let pass = 0;

fs.readFileSync('input/1.txt').toString().trim().split('\n').forEach(l => {
	const d = l.slice(0,1) == 'L' ? -1 : 1;
	let v = parseInt(l.slice(1));
	pos = math.mod(pos + d*v, 100);
	if (pos === 0) pass++;
});

console.log('P1:', pass);

pos = 50;
pass = 0;
fs.readFileSync('input/1.txt').toString().trim().split('\n').forEach(l => {
	const d = l.slice(0,1) == 'L' ? -1 : 1;
	let v = parseInt(l.slice(1));
	while (v-- > 0) {
		pos = math.mod(pos + d, 100);
		if (pos === 0) pass++;
	}
});

console.log(`P2:`, pass);