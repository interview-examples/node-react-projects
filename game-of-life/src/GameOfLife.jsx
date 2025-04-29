import React, { useState, useEffect, useCallback } from 'react';
import './GameOfLife.css';

const GRID_SIZE = 20;
const CELL_SIZE = 20;

const GameOfLife = () => {
    const [liveCells, setLiveCells] = useState(new Map());
    const [neighborCounts, setNeighborCounts] = useState(new Map());
    const [isRunning, setIsRunning] = useState(false);

    const get8Neighbors = (x, y) => [
        [x - 1, y - 1], [x - 1, y], [x - 1, y + 1],
        [x, y - 1],             [x, y + 1],
        [x + 1, y - 1], [x + 1, y], [x + 1, y + 1]
    ];

    const initializeNeighborCounts = (newLiveCells) => {
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

    const computeNextGeneration = useCallback(() => {
        const newLiveCells = new Map();
        const newNeighborCounts = new Map();

        for (const [key] of liveCells) {
            const [x, y] = key.split(',').map(Number);
            const count = neighborCounts.get(key) || 0;
            if (count === 2 || count === 3) {
                newLiveCells.set(key, true);
            }
        }

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
                if (count === 3) {
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

        setLiveCells(newLiveCells);
        setNeighborCounts(newNeighborCounts);
    }, [liveCells, neighborCounts]);

    const handleCellClick = (x, y) => {
        const key = `${x},${y}`;
        const newLiveCells = new Map(liveCells);
        const newNeighborCounts = new Map(neighborCounts);

        if (newLiveCells.has(key)) {
            newLiveCells.delete(key);
            const neighbors = get8Neighbors(x, y);
            for (const [nx, ny] of neighbors) {
                const neighborKey = `${nx},${ny}`;
                const currentCount = newNeighborCounts.get(neighborKey) || 0;
                if (currentCount > 0) {
                    newNeighborCounts.set(neighborKey, currentCount - 1);
                }
            }
        } else {
            newLiveCells.set(key, true);
            const neighbors = get8Neighbors(x, y);
            for (const [nx, ny] of neighbors) {
                const neighborKey = `${nx},${ny}`;
                newNeighborCounts.set(neighborKey, (newNeighborCounts.get(neighborKey) || 0) + 1);
            }
        }

        setLiveCells(newLiveCells);
        setNeighborCounts(newNeighborCounts);
    };

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(computeNextGeneration, 500);
        }
        return () => clearInterval(interval);
    }, [isRunning, computeNextGeneration]);

    const initializeGlider = () => {
        const glider = [
            [1, 0], [2, 1], [0, 2], [1, 2], [2, 2]
        ];
        const newLiveCells = new Map();
        for (const [x, y] of glider) {
            newLiveCells.set(`${x},${y}`, true);
        }
        setLiveCells(newLiveCells);
        setNeighborCounts(initializeNeighborCounts(newLiveCells));
    };

    const renderGrid = () => {
        const cells = [];
        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                const key = `${x},${y}`;
                const isLive = liveCells.has(key);
                cells.push(
                    <div
                        key={key}
                        className={`cell ${isLive ? 'live' : ''}`}
                        style={{
                            width: CELL_SIZE,
                            height: CELL_SIZE,
                            left: x * CELL_SIZE,
                            top: y * CELL_SIZE
                        }}
                        onClick={() => handleCellClick(x, y)}
                    />
                );
            }
        }
        return cells;
    };

    return (
        <div className="game-of-life">
            <h1>Game of Life</h1>
            <div
                className="grid"
                style={{
                    width: GRID_SIZE * CELL_SIZE,
                    height: GRID_SIZE * CELL_SIZE
                }}
            >
                {renderGrid()}
            </div>
            <div className="controls">
                <button onClick={() => setIsRunning(!isRunning)}>
                    {isRunning ? 'Stop' : 'Start'}
                </button>
                <button onClick={computeNextGeneration}>Step</button>
                <button onClick={() => {
                    setLiveCells(new Map());
                    setNeighborCounts(new Map());
                }}>Clear</button>
                <button onClick={initializeGlider}>Glider</button>
            </div>
        </div>
    );
};

export default GameOfLife;