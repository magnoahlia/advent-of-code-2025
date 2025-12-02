const fs = require('fs');
const input = fs.readFileSync('input/2.txt').toString().trim().split(',').map(r => r.split('-').map(v => parseInt(v)));

const p1 = input.reduce((a, v) => {
	const [min, max] = v;
	for (let i = min; i <= max; i++) {
		if (i <= 10) continue;

		const figures = Math.floor(Math.log10(i)) + 1;
		if (figures % 2 == 1) continue;

		const pow10 = Math.pow(10, figures/2);
		const div = Math.floor(i / pow10);
		if (i - div * pow10 === div) a += i;
	}

	return a;
}, 0);

console.log('P1', p1);

const p2 = input.reduce((a, v) => {
	const [min, max] = v;
	for (let i = min; i <= max; i++) {
		if (i <= 10) continue;

		const str = i.toString();
		const len = str.length
		for (let chunkSize = Math.floor(len / 2); chunkSize > 0; chunkSize--) {
			if (len % chunkSize != 0) continue;

			const chunks = len / chunkSize;
			let failed = false;
			const getChunk = (o) => str.substring(o, o + chunkSize);
			for (let s = 1, offset = chunkSize; s < chunks; s++, offset += chunkSize) {
				if (getChunk(offset - chunkSize) !== getChunk(offset)) {
					failed = true;
					break;
				}
			}

			if (!failed) {
				a += i;
				break;
			}
		}
	}

	return a;
}, 0);

console.log('P2', p2);