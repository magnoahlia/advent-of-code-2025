const fs = require('fs');
const input = fs.readFileSync('input/7.txt').toString().trim().split('\n');

const beams = new Map();
let splits = 0;

beams.set(input[0].indexOf('S'), 1);
const manifold = input.map(l => l.split('').map(c => c === '^'));

function addBeam(col, num) { 
	beams.set(col, beams.has(col) ? beams.get(col) + num : num) 
}

for (let r = 2; r < manifold.length; r+=2) {
	for (const [c, n] of beams) {
		if (manifold[r][c]) {
			beams.delete(c);
			addBeam(c+1, n);
			addBeam(c-1, n);
			splits++;
		}
	}
}

let timelines = 0;
beams.forEach(v => timelines += v);

console.log("P1:", splits);
console.log("P2:", timelines);