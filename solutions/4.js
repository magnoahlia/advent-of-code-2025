const fs = require('fs');
const input = fs.readFileSync('input/4.txt').toString().trim().split('\n').map(l => l.split('').map(v => v === "@"));

function findAccessible(input) {
	const accessible = [];
	for (let r = 0; r < input.length; r++) {
		for (let c = 0; c < input[r].length; c++) {
			if (!input[r][c]) continue;

			let adj = 0;
			for (let ar = Math.max(r - 1, 0); ar < Math.min(r + 2, input.length); ar++) {
				for (let ac = Math.max(c - 1, 0); ac < Math.min(c + 2, input[r].length); ac++) {
					if (ar == r && ac == c) continue;

					if (input[ar][ac]) adj++;
				}
			}

			if (adj < 4) accessible.push({c: c, r: r});
		}
	}

	return accessible;
}

console.log('P1:', findAccessible(input).length);

let p2 = 0;
let toRemove;
while ((toRemove = findAccessible(input)).length > 0) {
	p2 += toRemove.length;
	toRemove.forEach(p => input[p.r][p.c] = false);
}

console.log('P2:', p2);