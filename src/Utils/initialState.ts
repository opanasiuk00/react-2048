export const GRID_SIZE: number = 4;
export const GRID_COUNT: number = GRID_SIZE * GRID_SIZE;
export const CELL = new Array(GRID_COUNT)
    .fill("")
    .map((item, i) => ({ x: i % GRID_SIZE, y: Math.floor(i / GRID_SIZE) }));
