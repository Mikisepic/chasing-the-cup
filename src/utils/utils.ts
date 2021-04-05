import { cols, rows } from "./variables";

// Compare 2 arrays
export const equals = (a: number[], b: number[]): boolean => JSON.stringify(a) === JSON.stringify(b);

// Find if obstacle exists in the current location || sort the whole thing?
export const checkIfObstacleExists = (a: number[][], b: number[]): boolean => {
	for (const i of a) if (equals(i, b)) return true;
	return false;
}

// Set prize location
export const setPrizeLocation = (
		rows: number,
		cols: number,
		obstacle: number[][],
		player: number[],
		setObstacle: React.Dispatch<React.SetStateAction<number[][]>>
	): number[] => {
	let y = Math.floor(Math.random() * rows);
	let x = Math.floor(Math.random() * cols);

	while (checkIfObstacleExists(obstacle, [y, x]) || equals(player, [y, x])) {
		y = Math.floor(Math.random() * rows);
		x = Math.floor(Math.random() * cols);
	}

	setObstacleLocation([y, x], obstacle, player, setObstacle);
	return [y, x];
}

// Set locations for the obstacles at later rounds
export const setObstacleLocation = (
		prize: number[],
		obstacle: number[][],
		player: number[],
		setObstacle: React.Dispatch<React.SetStateAction<number[][]>>
	) => {
	let y = Math.floor(Math.random() * rows);
	let x = Math.floor(Math.random() * cols);

	while (checkIfObstacleExists(obstacle, [y, x]) || 
			equals(prize, [y, x]) || 
			equals(player, [y, x])) {
		y = Math.floor(Math.random() * rows);
		x = Math.floor(Math.random() * cols);
	}

	setObstacle([...obstacle, [y, x]]);
}

export const handleKeys = (
		value: number,
		cols: number,
		rows: number,
		spot: number[], 
		obstacle: number[][],
		setPosition: React.Dispatch<React.SetStateAction<number[]>>
	) => {
	switch (value) {
		// Right
		case 39:
		case 68:
			if (spot[1] + 1 === cols || 
				checkIfObstacleExists(obstacle, [spot[0], spot[1] + 1])) setPosition(spot);
			else setPosition([spot[0], spot[1] + 1]);
			break;

		// Left
		case 37:
		case 65:
			if (spot[1] === 0 || 
				checkIfObstacleExists(obstacle, [spot[0], spot[1] - 1])) setPosition(spot);
			else setPosition([spot[0], spot[1] - 1]);
			break;

		// Up
		case 38:
		case 87:
			if (spot[0] === 0 || 
				checkIfObstacleExists(obstacle, [spot[0] - 1, spot[1]])) setPosition(spot);
			else setPosition([spot[0] - 1, spot[1]]);
			break;

		// Down
		case 40:
		case 83:
			if (spot[0] + 1 === rows || 
				checkIfObstacleExists(obstacle, [spot[0] + 1, spot[1]])) setPosition(spot);
			else setPosition([spot[0] + 1, spot[1]]);
			break;

		default:
			break;
	}
}