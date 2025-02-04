import StateType from '../types/StateType';
import Box from './Box';

interface GridConvasProps {
  st: StateType;
}

function GridConvas({ st }: GridConvasProps) {
  const grid = [];

  for (let i: number = 0; i < st.state.rows; i++) {
    for (let j: number = 0; j < st.state.cols; j++) {
      const boxId: string = `box_${i}_${j}`;
      const boxClass: string =
        'box' + ' ' + (st.state.grid[i][j] ? 'on' : 'off');
      grid.push(
        <Box
          setState={st.setState}
          row={i}
          col={j}
          boxClass={boxClass}
          boxId={boxId}
        />,
      );
    }
  }
  return (
    <div>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${st.state.cols}, minmax(0, min-content))`,
        }}
      >
        {grid}
      </div>
    </div>
  );
}

// function getRandColor(): string {
//   const colors: string[] = [
//     'red',
//     'orange',
//     'amber',
//     'yellow',
//     'lime',
//     'green',
//     'emerald',
//     'teal',
//     'cyan',
//     'sky',
//     'blue',
//     'indigo',
//     'violet',
//     'purple',
//     'fuchsia',
//     'pink',
//     'rose',
//     'slate',
//     'gray',
//     'zinc',
//     'neutral',
//     'stone',
//   ];
//
//   const degrees: number[] = [
//     50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
//   ];
//
//   const randomColor: string = colors[Math.floor(Math.random() * colors.length)];
//   const randomDegree: number =
//     degrees[Math.floor(Math.random() * degrees.length)];
//
//   console.log(`bg-${randomColor}-${randomDegree}`);
//
//   return `bg-${randomColor}-${randomDegree}`;
// }

export default GridConvas;
