import SetStateAlise from '../aliases/SetStateAliase';

interface BoxProps {
  boxClass: string;
  boxId: string;
  row: number;
  col: number;
  setState: SetStateAlise;
}

function selectBox(
  setState: SetStateAlise,
  newState: boolean,
  row: number,
  col: number,
) {
  setState((prevState) => ({
    ...prevState,
    population: prevState.population + (newState ? 1 : -1),
    grid: reverseValueAt(prevState.grid, row, col),
  }));
}

function Box({ setState, row, col, boxClass, boxId }: BoxProps) {
  const oldState: boolean = boxClass.split(' ').includes('on');
  return (
    <span
      className={boxClass}
      id={boxId}
      onClick={() => selectBox(setState, !oldState, row, col)}
    />
  );
}

function reverseValueAt(
  arr: boolean[][],
  row: number,
  col: number,
): boolean[][] {
  const newArr: boolean[][] = arr.map((innerArr, rowIndex) =>
    rowIndex === row ? [...innerArr] : innerArr,
  );
  newArr[row][col] = !newArr[row][col];
  return newArr;
}

export default Box;
