import NeighboursType from '../types/NeighboursType';
import SetStateAliase from '../aliases/SetStateAliase';
import IntervalRefAliase from '../aliases/IntervalRefAliase';

export function playGame(
  setState: SetStateAliase,
  intervalRef: IntervalRefAliase,
) {
  setState((prevState) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(
      () => nextStep(setState),
      prevState.speed,
    );
    return {
      ...prevState,
      isRunning: true,
    };
  });
}

export function pauseGame(
  setState: SetStateAliase,
  intervalRef: IntervalRefAliase,
) {
  setState((prevState) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    return {
      ...prevState,
      isRunning: false,
    };
  });
}

export function nextStep(setState: SetStateAliase) {
  setState((prevState) => {
    const [newPopulation, newGrid]: [number, boolean[][]] = nextGenerationGrid(
      prevState.grid,
    );
    return {
      ...prevState,
      population: newPopulation,
      grid: newGrid,
      generation: prevState.generation + 1,
    };
  });
}

export function prevStep(setState: SetStateAliase) {
  setState((prevState) => {
    const [newPopulation, newGrid]: [number, boolean[][]] = prevGenerationGrid(
      prevState.grid,
    );
    return {
      ...prevState,
      population: newPopulation,
      grid: newGrid,
      generation: prevState.generation - 1,
    };
  });
}

function nextGenerationGrid(arr: boolean[][]): [number, boolean[][]] {
  let population: number = 0;
  for (let i: number = 0; i < arr.length; i++) {
    for (let j: number = 0; j < arr[0].length; j++) {
      const n: NeighboursType = getNeighbours(arr, i, j);
      if (n.IsUnderpopulated || n.IsOverpopulated) arr[i][j] = false;
      else if (n.IsReproducible) arr[i][j] = true;
      if (arr[i][j]) population++;
    }
  }
  return [population, arr];
}

function prevGenerationGrid(arr: boolean[][]): [number, boolean[][]] {
  let population: number = 0;
  for (let i: number = arr.length - 1; i >= 0; i--) {
    for (let j: number = arr[0].length - 1; j >= 0; j--) {
      const n: NeighboursType = getNeighbours(arr, i, j);
      if (n.IsUnderpopulated || n.IsOverpopulated) arr[i][j] = false;
      else if (n.IsReproducible) arr[i][j] = true;
      if (arr[i][j]) population++;
    }
  }
  return [population, arr];
}

export function getNeighbours(
  arr: boolean[][],
  x: number,
  y: number,
): NeighboursType {
  const n: NeighboursType = {
    nw: [x - 1, y + 1],
    n: [x, y + 1],
    ne: [x + 1, y + 1],
    w: [x - 1, y],
    c: [x, y],
    e: [x + 1, y],
    sw: [x - 1, y - 1],
    s: [x, y - 1],
    se: [x + 1, y - 1],
    liveCellesCount: 0,
    IsUnderpopulated: false,
    IsOverpopulated: false,
    IsReproducible: false,
  };

  if (isCellAlive(arr, n.nw)) {
    n.liveCellesCount++;
  }

  if (isCellAlive(arr, n.n)) {
    n.liveCellesCount++;
  }

  if (isCellAlive(arr, n.ne)) {
    n.liveCellesCount++;
  }

  if (isCellAlive(arr, n.w)) {
    n.liveCellesCount++;
  }

  if (isCellAlive(arr, n.e)) {
    n.liveCellesCount++;
  }

  if (isCellAlive(arr, n.sw)) {
    n.liveCellesCount++;
  }

  if (isCellAlive(arr, n.s)) {
    n.liveCellesCount++;
  }

  if (isCellAlive(arr, n.se)) {
    n.liveCellesCount++;
  }

  if (arr[n.c[0]][n.c[1]] && n.liveCellesCount < 2) n.IsUnderpopulated = true;
  else if (arr[n.c[0]][n.c[1]] && n.liveCellesCount > 3)
    n.IsOverpopulated = true;
  else if (!arr[n.c[0]][n.c[1]] && n.liveCellesCount === 3)
    n.IsReproducible = true;

  return n;
}

export function isCellAlive(arr: boolean[][], n: [number, number]): boolean {
  return (
    n[0] >= 0 &&
    n[1] >= 0 &&
    n[0] < arr.length &&
    n[1] < arr[0].length &&
    arr[n[0]][n[1]]
  );
}
