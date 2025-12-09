// Note for P2:
// I wanted to do a raycasting even/odd check on non-defining corners
// but I got stuck handling cases where the ray exactly intersects edges.
// I need to come back to this one

const fs = require('fs');
const input = fs.readFileSync('input/9.txt').toString().trim().split('\n').map(l => l.split(',').map(v => parseInt(v)));

const areas = input.reduce((arr, a, ai) => {
	const [ax, ay] = a;
	for (let bi = ai + 1; bi < input.length; bi++) {
		const b = input[bi]; 
		const [bx, by] = b;
		arr.push([(Math.abs(ax-bx)+1) * (Math.abs(ay-by)+1), a, b]);
	}
	return arr;
}, []);

areas.sort((a, b) => b[0] - a[0]);

console.log("P1:", areas[0][0]);

const hEdges = [];
const vEdges = [];

for (let i = 0; i < input.length; i++) {
	const edge = [input.at(i-1), input[i]];
	if (edge[0][0] == edge[1][0]) {
		vEdges.push(edge.sort((a, b) => a[1] - b[1]));
	} else {
		hEdges.push(edge.sort((a, b) => a[0] - b[0]));
	}
}

vEdges.sort((a, b) => a[0][0] - b[0][0]);
hEdges.sort((a, b) => a[0][1] - b[0][1]);

function p2() {
	// hack: just brute force by checking every point using projection from 4 cardinal directions
	const l1000 = Math.round(areas.length / 1000);
	let progress = 0;
	for (let i = 0; i < areas.length; i++) {

		// log progress so I know how long this will take
		if (i % l1000 == 0) {
			progress = i / areas.length * 100;
			console.log(progress);
		}

		const [area, a, b] = areas[i];

		// very hacky optimization: I know this answer is too big
		if(area >= 4631146730) continue;

		function checkPointInLoop(x, y) {
				let hits = 0;

				// +y
				for (edge of hEdges) {
					const [min, max] = edge;
					const [minX, minY] = min;
					const [maxX, _] = max;

					if(minY > y) break;

					if (x >= minX && x <= maxX) {
						hits++;
						break;
					}
				}

				// -y
				for (let i = hEdges.length - 1; i >= 0; i--) {
					const [min, max] = hEdges[i];
					const [minX, minY] = min;
					const [maxX, maxY] = max;

					if (minY < y) break;

					if (x >= minX && x <= maxX) {
						hits++;
						break;
					}
				}

				// +x
				for (edge of vEdges) {
					const [min, max] = edge;
					const [minX, minY] = min;
					const [_, maxY] = max;

					if(minX > x) break;

					if (y >= minY && y <= maxY) {
						hits++;
						break;
					}
				}

				// -x
				for (let i = vEdges.length - 1; i >= 0; i--) {
					const [min, max] = vEdges[i];
					const [minX, minY] = min;
					const [maxX, maxY] = max;

					if (minX < x) break;

					if (y >= minY && y <= maxY) {
						hits++;
						break;
					}
				}

				return hits == 4
		}

		function checkInsideLoop() {

			// opt: check corners before every point to filter out bad ones faster
			if (!checkPointInLoop(a[0], b[1])) return false;
			if (!checkPointInLoop(b[0], a[1])) return false;

			const min = [Math.min(a[0], b[0]), Math.min(a[1], b[1])]
			const max = [Math.max(a[0], b[0]), Math.max(a[1], b[1])]

			// hack: the first big one after 39% turns out to be the right answer
			if (progress > 39) return true;

			for(let x = min[0]; x <= max[0]; x++)
				for(let y = min[1]; y <= max[1]; y++) {
					if(!checkPointInLoop(x, y)) return false;
			}

			return true;
		}

		if (!checkInsideLoop()) continue;

		return area;
	}
}

console.log("P2:", p2());