const fs = require('fs');
const map = fs.readFileSync('input/11.txt').toString().trim().split('\n').reduce((m, l) => {
	const [from, to] = l.split(': ');
	m.set(from, to.split(' '));
	return m
}, new Map());


function countConnections(start, end) {
	const search = [start];
	const pathSoFar = new Map();

	const exits = new Map();
	exits.set(end, 1);
	const visited = new Set();

	while (current = search.pop()) {
		if (exits.has(current)) {
			const path = [];
			const add = exits.get(current);
			while (prev = pathSoFar.get(current)) {
				path.push(prev);
				current = prev;
			}

			path.forEach(d => exits.set(d, (exits.has(d) ? exits.get(d) : 0) + add));

			continue;
		}

		if (visited.has(current)) continue;
		visited.add(current);

		const next = map.get(current);
		if (next === undefined) continue;

		for (device of next) {
			pathSoFar.set(device, current);
			search.push(device);
		}
	}

	return exits.get(start) ?? 0;
}

console.log("P1:", countConnections('you', 'out'));

// dac -> fft never happens so we can ignore it :)
console.log("P2:", countConnections('svr', 'fft') * countConnections('fft', 'dac') * countConnections('dac', 'out'));
