import SetStateAlise from '../aliases/SetStateAliase';
import { pauseGame } from '../utils/GameLogic';
import IntervalRefAliase from '../aliases/IntervalRefAliase';

export function resetBoard(
  setState: SetStateAlise,
  intervalRef: IntervalRefAliase,
) {
  setState((prevState) => {
    pauseGame(setState, intervalRef);

    return {
      ...prevState,
      grid: prevState.grid.map((row) => row.map(() => false)),
      population: 0,
      generation: 0,
    };
  });
}

export function seedBoard(setState: SetStateAlise) {
  setState((prevState) => {
    const [newPopulation, newGrid]: [number, boolean[][]] = getRandGrid(
      prevState.rows,
      prevState.cols,
    );
    return {
      ...prevState,
      grid: newGrid,
      population: newPopulation,
    };
  });
}

function getRandGrid(rows: number, cols: number): [number, boolean[][]] {
  const grid: boolean[][] = [[false]];
  let population: number = 0;

  for (let i = 0; i < rows; i++) {
    const row: boolean[] = [false];
    for (let j = 0; j < cols; j++) {
      const cellValue: boolean = Math.random() <= 0.15;
      if (cellValue) population++;
      row[j] = cellValue;
    }
    grid[i] = row;
  }

  // WARN: not working yet + Testing performance
  // grid = Array(rows)
  //   .fill(null)
  //   .map(() =>
  //     Array(cols).fill(() => {
  //       const cellValue: boolean = Math.random() <= 0.15;
  //       if (cellValue) population++;
  //       return cellValue;
  //     }),
  //   );

  return [population, grid];
}
