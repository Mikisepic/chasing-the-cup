export let rows: number = Math.floor(Math.random() * 6) + 4;
export let cols: number = Math.floor(Math.random() * 6) + 4;
export const table: number[][] = new Array(rows).fill(0).map((row, index) => new Array(cols).fill(index));