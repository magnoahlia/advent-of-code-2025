class Vector3 {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	get sqrMagnitude() {
		return Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2);
	}

	clone() {
		return new Vector3(this.x, this.y, this.z);
	}

	to(v) {
		return new Vector3(v.x - this.x, v.y - this.y, v.z - this.z);
	}

	add(v) {
		return new Vector3(v.x + this.x, v.y + this.y, v.z + this.z);
	}

	equals(v) {
		return v.x === this.x && v.y === this.y && v.z == this.z;
	}

	abs() {
		return new Vector3(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
	}

	toString() {
		return `(${this.x}, ${this.y}, ${this.z})`;
	}

	valueOf() {
		return this.toString();
	}
}

module.exports = Vector3;