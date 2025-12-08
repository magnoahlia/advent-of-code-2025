const fs = require('fs');
const Vector3 = require('./util/Vector3');
const point = fs.readFileSync('input/8.txt').toString().trim().split('\n').map(l => new Vector3(...l.split(',').map(v => parseInt(v))));

// calculate distances between every point and sort ascending
const distances = [];
for (let i = 0; i < point.length; i++) {
	const a = point[i];
	for (let j = i+1; j < point.length; j++) {
		const b = point[j];
		distances.push([a.to(b).sqrMagnitude, a, b]);
	}
}

distances.sort((a, b) => a[0] - b[0]);

// make circuits!
const circuits = new Set();
const pointToCircuit = new Map();

point.forEach(p => {
	const set = new Set([p]);
	pointToCircuit.set(p, set)
	circuits.add(set);
});

for (i = 0; i < distances.length; i++) {
	const [_, a, b] = distances[i];

	const aSet = pointToCircuit.get(a), bSet = pointToCircuit.get(b);
	circuits.delete(aSet);
	circuits.delete(bSet);

	const union = new Set([...aSet, ...bSet]);
	circuits.add(union);
	for (p of union) {
		pointToCircuit.set(p, union);
	}

	if (i == 1000) {
		console.log("P1:",
			circuits.values().reduce((a, v) => {a.push(v.size); return a}, [])
				.sort((a, b) => b - a).slice(0, 3).reduce((a, v) => a *= v, 1));
		continue;
	}

	if (circuits.size == 1) {
		console.log("P2:", a.x * b.x);
		break;
	}
}
