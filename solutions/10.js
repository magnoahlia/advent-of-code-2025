const fs = require('fs');
const { MinPriorityQueue } = require('@datastructures-js/priority-queue');

const machines = fs.readFileSync('input/10.txt').toString().trim().split('\n').map(l => {
		const groups = l.match(/\[(.*)\] (\(.*\)) \{(.*)}/).slice(1);
		groups[1] = groups[1].split(' ').map(v => v.match(/\d/g).map(v => parseInt(v)));
		groups[2] = groups[2].split(',').map(v => parseInt(v))
		return groups;
});

function p1Solve(machine) {
	const [lights, buttonVals] = machine;

	// convert buttons to bitwise values
	const target = lights.split('').reduce((a, c, i) => a += c === '#' ? 1<<i : 0, 0)
	const buttons = buttonVals.map(b=> b.reduce((a, v) => a += (1<<v), 0))

	let states = [0];
	let it = 1;
	while (true) {
		const next = [];
		for (state of states) {
			for (button of buttons) {
				const result = state^button;
				if (result === 0) continue;
				if (result === target) return it;

				next.push(result);
			}
		}
		states = next;
		it++;
	}
}

// P2 currently exceeds Map maximum size with the full input :(
// I probably need to do something mathy here
function p2Solve(machine) {
	const asKey = (state) => state.toString();

	const [_, buttons, targets] = machine;
	console.log(targets);

	// A* search to find minimum number of presses
	// cost: button presses
	// heuristic: delta from target state
	let frontier = new MinPriorityQueue(i => i[1]);
	const start = new Array(targets.length).fill(0);
	frontier.enqueue([start, 0]);
	let pressesSoFar = new Map();
	pressesSoFar.set(asKey(start), 0);

	while (current = frontier.dequeue()) {
		const state = current[0];
		const lastPresses = pressesSoFar.get(asKey(state));
	
		for (button of buttons) {
			const result = new Array(...state);

			// add button presses and quickly exit if we go over the target value
			var over = false;
			for (i of button) {
				over = ++result[i] > targets[i];
				if (over) break;
			}

			if (over) continue;

			const resultPresses = lastPresses + 1;

			// check if we have reached the target state
			// and calculate delta from target as heuristic
			let delta = 0;
			for (let i = 0; i < targets.length; i++) {
				delta += targets[i] - result[i];
			}	

			if (delta === 0) return resultPresses;

			const key = asKey(result);
			if (!pressesSoFar.has(key) || resultPresses < pressesSoFar.get(key)) {
				pressesSoFar.set(key, resultPresses);
				frontier.enqueue([result, resultPresses + delta * 10]);
			}
		}
	}

	throw "Failed to find a solution for " + targets.toString();
}

console.log("P1:", machines.reduce((a, m) => a += p1Solve(m), 0));
console.log("P2:", machines.reduce((a, m) => a += p2Solve(m), 0));
