const fs = require('fs');
const input = fs.readFileSync('input/5.txt').toString().trim().split('\n\n').map(g => g.split('\n'));

const ranges = input[0].map(r => r.split('-').map(v => parseInt(v)));

// combine all overlapping ranges
for (let i = ranges.length - 1; i >= 0; i--) {
	const range = ranges[i];
	for (let c = ranges.length - 1; c >= 0; c--) {
		if (c == i) continue;
		const comp = ranges[c];
		if (range[0] <= comp[0] && range[1] >= comp[0]){
			if (range[1] >= comp[1]) {
				ranges[c] = ranges[i];
			} else {	
				ranges[c][0] = range[0];
			}
			ranges.splice(i, 1);
			i = Math.max(i, c);
			break;
		}
	}
}

console.log("P1:", input[1].map(v => parseInt(v)).reduce((a, id) => {
	for (let i = 0; i < ranges.length; i++) {
		if (id >= ranges[i][0] && id <= ranges[i][1]) return ++a;
	}

	return a;
}, 0));


console.log("P2:", ranges.reduce((a, r) => a += (r[1] - r[0] + 1), 0));