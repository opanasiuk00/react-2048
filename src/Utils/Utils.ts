import { tileTipe } from "./tyleTipe";

// розбитя на колонкі
export function groupCellByColumn(array: tileTipe[]): tileTipe[][] {
    return array.reduce((groupedCells: tileTipe[][], cell) => {
        groupedCells[cell.x] = groupedCells[cell.x] || [];
        groupedCells[cell.x][cell.y] = cell;
        return groupedCells;
    }, []);
}

// колонкі reverse
export function groupCellByColumnReverce(array: tileTipe[]): tileTipe[][] {
    return groupCellByColumn(array).map((column) => [...column].reverse());
}

// розбитя на рядкі
export function groupCellByRow(array: tileTipe[]): tileTipe[][] {
    return array.reduce((groupedCells: tileTipe[][], cell) => {
        groupedCells[cell.y] = groupedCells[cell.y] || [];
        groupedCells[cell.y][cell.x] = cell;
        return groupedCells;
    }, []);
}

// рядкі reverse
export function groupCellByRowReverse(array: tileTipe[]): tileTipe[][] {
    return groupCellByRow(array).map((row) => [...row].reverse());
}

//
export function slideTilesInGroup(
    group: tileTipe[],
    position: string,
    transform: string,
    size: number
): tileTipe[] {
    let newTiles: tileTipe[] | [] = [];
    const prevTiles = group.filter((item) => item);
    // якщо масів рівний одному
    if (prevTiles.length === 1) {
        return [
            { ...prevTiles[0], [transform]: position === "start" ? 0 : size },
        ];
    }

    // знаходимо два спільних сісуда і поєднуємо
    for (let i = 0; i < prevTiles.length; i++) {
        if (prevTiles[i + 1] && prevTiles[i].name === prevTiles[i + 1].name) {
            newTiles = [
                ...newTiles,
                {
                    ...prevTiles[i + 1],
                    name: prevTiles[i + 1].name + prevTiles[i].name,
                },
            ];
            i++;
        } else {
            newTiles = [...newTiles, { ...prevTiles[i] }];
        }
    }

    return newTiles.map((item: tileTipe, i: number) => ({
        ...item,
        [transform]: position === "start" ? 0 + i : size - i,
    }));
}

// перевірка на збіг
// false - співпадає
// true - ні
export function sortArray(
    prevArray: tileTipe[],
    newArray: tileTipe[]
): boolean {
    if (prevArray.length !== newArray.length) {
        return true;
    }
    for (let i = 0; i < prevArray.length; i++) {
        if (
            !newArray.some(
                (item) => prevArray[i].x === item.x && prevArray[i].y === item.y
            )
        ) {
            return true;
        }
    }
    return false;
}
