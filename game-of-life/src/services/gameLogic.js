import config from '../config/gameConfig.json';

export const get8Neighbors = (x, y) => [
    [x - 1, y - 1], [x - 1, y], [x - 1, y + 1],
    [x, y - 1],             [x, y + 1],
    [x + 1, y - 1], [x + 1, y], [x + 1, y + 1]
];

export const initializeNeighborCounts = (newLiveCells) => {
    const counts = new Map();
    for (const [key] of newLiveCells) {
        const [x, y] = key.split(',').map(Number);
        const neighbors = get8Neighbors(x, y);
        for (const [nx, ny] of neighbors) {
            const neighborKey = `${nx},${ny}`;
            counts.set(neighborKey, (counts.get(neighborKey) || 0) + 1);
        }
    }
    return counts;
};

export const computeNextGeneration = (state) => {
    const { liveCells, neighborCounts } = state;
    const newLiveCells = new Map();
    const newNeighborCounts = new Map();

    // Check all living cells and determine if they will survive (2-3 neighbors)
    for (const [key] of liveCells) {
        const count = neighborCounts.get(key) || 0;
        if (count ===2 || count === 3) {
            newLiveCells.set(key, true);
        }
    }

    // Check all neighbors of living cells and determine if new cells will be born (exactly 3 neighbors)
    const cellsToCheck = new Set();
    for (const [key] of liveCells) {
        const [x, y] = key.split(',').map(Number);
        const neighbors = get8Neighbors(x, y);
        for (const [nx, ny] of neighbors) {
            cellsToCheck.add(`${nx},${ny}`);
        }
    }

    for (const key of cellsToCheck) {
        if (!liveCells.has(key)) {
            const count = neighborCounts.get(key) || 0;
            if (count ===3) {
                newLiveCells.set(key, true);
            }
        }
    }

    for (const [key] of newLiveCells) {
        const [x, y] = key.split(',').map(Number);
        const neighbors = get8Neighbors(x, y);
        for (const [nx, ny] of neighbors) {
            const neighborKey = `${nx},${ny}`;
            newNeighborCounts.set(neighborKey, (newNeighborCounts.get(neighborKey) || 0) + 1);
        }
    }

    return {
        ...state,
        liveCells: newLiveCells,
        neighborCounts: newNeighborCounts
    };
};

export const handleCellClick = (state, x, y) => {
    const { liveCells, neighborCounts } = state;
    const key = `${x},${y}`;
    const newLiveCells = new Map(liveCells);
    const newNeighborCounts = new Map(neighborCounts);

    if (newLiveCells.has(key)) {
        newLiveCells.delete(key); // kill the live cell
        const neighbors = get8Neighbors(x, y);
        for (const [nx, ny] of neighbors) {
            const neighborKey = `${nx},${ny}`;
            const currentCount = newNeighborCounts.get(neighborKey) || 0;
            if (currentCount > 0) {
                newNeighborCounts.set(neighborKey, currentCount - 1);
            }
        }
    } else {
        newLiveCells.set(key, true); // reanimating the dead cell
        const neighbors = get8Neighbors(x, y);
        for (const [nx, ny] of neighbors) {
            const neighborKey = `${nx},${ny}`;
            newNeighborCounts.set(neighborKey, (newNeighborCounts.get(neighborKey) || 0) + 1);
        }
    }

    return {
        ...state,
        liveCells: newLiveCells,
        neighborCounts: newNeighborCounts
    };
};

export const initializePattern = (state, patternName) => {
    const pattern = config.patterns[patternName];
    if (!pattern) return state;

    const newLiveCells = new Map();
    for (const [x, y] of pattern) {
        newLiveCells.set(`${x},${y}`, true);
    }

    return {
        ...state,
        liveCells: newLiveCells,
        neighborCounts: initializeNeighborCounts(newLiveCells)
    };
};

export const clearGrid = (state) => {
    return {
        ...state,
        liveCells: new Map(),
        neighborCounts: new Map()
    };
};

export const toggleRunning = (state) => {
    return {
        ...state,
        isRunning: !state.isRunning
    };
};

export const initialGameState = {
    liveCells: new Map(),
    neighborCounts: new Map(),
    isRunning: false
};