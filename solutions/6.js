const fs = require('fs');
const input = fs.readFileSync('input/6.txt').toString().trim().split('\n');

function p1() {
	const values = input.map(l => l.match(/\S+/g))
	const nums = values.slice(0, -1).map(r => r.map(v =>parseInt(v)));
	const ops = values.at(-1);

	return ops.reduce((a, op, i) => {
		let result = nums[0][i];
		for (let r = 1; r < nums.length; r++) {
			switch (op) {
				case '*': result *= nums[r][i];
					break;
				case '+': result += nums[r][i];
					break;
			}
		}
		return a + result;
	}, 0);
}

function p2() {
	const charGrid = input.map(l => l.split(''));
	const w = charGrid[0].length, h = charGrid.length;
	let opNums = [], sum = 0;
	for (let c = w - 1; c >= 0; c--) {
		let str = '';

		for (let r = 0; r < h - 1; r++) {
			const char = charGrid[r][c];
			if (char === ' ') continue;
			str += char;
		}

		if (str !== '') opNums.push(parseInt(str));

		const op = charGrid[h - 1][c];
		if (op !== '*' && op !== '+') continue;

		let result = opNums[0];
		for (let n = 1; n < opNums.length; n++) {
			switch (op) {
				case '*': result *= opNums[n];
					break;
				case '+': result += opNums[n];
					break;
			}
		}

		sum += result;
		opNums = [];
	}

	return sum;
}

console.log("P1:", p1());
console.log("P2:", p2())