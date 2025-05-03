import React, { useState, useEffect } from 'react';
import './GameOfLife.css';
import config from '../../config/gameConfig.json';
import {
    initialGameState,
    computeNextGeneration,
    handleCellClick,
    initializePattern,
    clearGrid,
    toggleRunning
} from '../../services/gameLogic';

const GameOfLife = () => {
    const [gameState, setGameState] = useState(initialGameState);

    useEffect(()=> {
        let interval;
        if (gameState.isRunning) {
            interval = setInterval(() => {
                setGameState(prevState => computeNextGeneration(prevState));
            }, config.updateInterval);
        }
        return () => clearInterval(interval);
    }, [gameState.isRunning]);

    const renderGrid = () => {
        const cells = [];

        for (let y = 0; y < config.cellSize; y++) {
            for (let x = 0; x < config.gridSize; x++) {
                const key = `${x},${y}`;
                const isLive = gameState.liveCells.has(key);
                cells.push(
                    <div
                        key={key}
                        className={`cell ${isLive ? 'live' : ''}`}
                        style={{
                            width: config.cellSize,
                            height: config.cellSize,
                            left: x * config.cellSize,
                            top: y * config.cellSize
                        }}
                        onClick={() => setGameState(prevState => handleCellClick(prevState, x, y))}
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
                    width: config.gridSize * config.cellSize,
                    height: config.cellSize * config.cellSize
                }}
            >
                {renderGrid()}
            </div>
            <div className="controls">
                <button onClick={() => setGameState(prevState => toggleRunning(prevState))}>
                    {gameState.isRunning ? 'Stop' : 'Start'}
                </button>
                <button onClick={() => setGameState(prevState => computeNextGeneration(prevState))}>
                    Step
                </button>
                <button onClick={() => setGameState(prevState => clearGrid(prevState))}>
                    Clear
                </button>
                <button onClick={() => setGameState(prevState => initializePattern(prevState, 'glider'))}>
                    Glider
                </button>
            </div>
        </div>
    );
};

export default GameOfLife;