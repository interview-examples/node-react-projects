# Game of Life
## React.js realization
**Optimization of Neighbor Counting:** Store the neighbor count map in state alongside the live cells. Update both atomically in a reducer to ensure consistency. Use this to optimize rendering by skipping cells with stable states.

There are two main data structures used in the project:

* liveCells (Map): Stores live cells in the format "x,y" => true
* neighborCounts (Map): Stores the number of neighbors for each cell in the format “x,y” => count

Using Map instead of a two-dimensional array allows to efficiently store only live cells and their neighbors, rather than the entire grid.

## Key functions
### get8Neighbors
```js
const get8Neighbors = (x, y) => [
    [x - 1, y - 1], [x - 1, y], [x - 1, y + 1],
    [x, y - 1],             [x, y + 1],
    [x + 1, y - 1], [x + 1, y], [x + 1, y + 1]
];
```
This function returns the coordinates of 8 neighboring cells for a given cell (x, y).

### computeNextGeneration
This function calculates the next generation of cells according to the rules of the game:

1. Checks all living cells and determines if they will survive (2-3 neighbors)
1. Checks all neighbors of living cells and determines if new cells will be born (exactly 3 neighbors)
1. Updates neighbor counters for the new generation

### handleCellClick
Processes a click on a cell:

* If the cell is alive - removes it and decreases the neighbor counters
* If the cell is dead - revives it and increases the neighbor counters

## Application lifecycle
1. Initialization: An empty grid or a preset shape (such as a glider) is created
1. Rendering: The current state of the grid is displayed
1. Refresh: Clicking "Start" starts an interval that calls computeNextGeneration every 500ms
1. Interaction: The user can click on cells to change their state

### Technical Implementation in React
1. Component State: UseState hooks to store game state
1. Effects: useEffect starts and stops the refresh interval
1. Memoization: useCallback prevents unnecessary redraws
1. Rendering: The component draws a grid of cells and controls.