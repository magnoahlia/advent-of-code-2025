const fs = require('fs');
const input = fs.readFileSync('input/3.txt').toString().trim().split('\n').map(l => l.split('').map(v => parseInt(v)));

function search(bank, figure, si = 0, j = 0, max = 0) {
	for (let i = si; i < bank.length - figure + 1; i++) {
		const jSoFar = j + bank[i] * (figure > 1 ? Math.pow(10, figure - 1) : 1);
		if (max >= jSoFar) continue;

		max = figure > 1 ? search(bank, figure - 1, i + 1, jSoFar, max) : Math.max(max, jSoFar);
	}

	return max;
}

console.log('P1:', input.reduce((a, bank) => a + search(bank, 2), 0));
console.log("P2:", input.reduce((a, bank) => a + search(bank, 12), 0));