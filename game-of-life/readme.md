# Game of Life

## Basic Principles of the Game of Life
The Game of Life is a cellular automaton developed by mathematician **John Conway** in 1970. 
It models the evolution of a population of cells according to simple rules:

* Survival: A living cell with 2 or 3 living neighbors survives
* Death by Solitude: A living cell with less than 2 neighbors dies
* Death by Overpopulation: A living cell with more than 3 neighbors dies
* Birth: A dead cell with exactly 3 living neighbors comes to life

## Ways to Optimize calculation & rendering
I guess that the main problem with the game of life is the calculation of the next generation, that based on calculation all neighbors for each cell, which is not a good idea.
So neighbor counting is the core bottleneck in the Game of Life. Instead of checking all 8 neighbors for each cell every time, precompute or incrementally update neighbor counts.

**Idea**: Maintain a "neighbor count" grid or map that tracks how many live neighbors each cell has. When a cell changes state *(live to dead or vice versa)*:
* Update the neighbor counts for its 8 neighbors incrementally.
* Use these counts to determine the next state without recalculating neighbors from scratch.

**Why it works**: This trades memory for computation speed. Incremental updates reduce the need to scan neighbors repeatedly, especially in stable configurations.
