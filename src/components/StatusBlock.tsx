import GridStateType from '../types/GridStateType';

interface StatusBlockProps {
  // style: 'stack' | 'line';
  state: GridStateType;
}

function StatusBlock({ state }: StatusBlockProps) {
  // TODO: make styles
  // console.log(style);

  return (
    <div className="absolute left-0 top-0 w-fit p-5 flex text-xl bg-black/60">
      <ul className="flex flex-col flex-start">
        <li className="flex justify-between">
          <span className="shrink-0 pr-4 font-bold text-red-500">
            Generation:
          </span>
          <span className="text-right text-white">{state.generation}</span>
        </li>
        <li className="flex justify-between">
          <span className="shrink-0 pr-4 font-bold text-red-500">
            Population:
          </span>
          <span className="text-right text-white">{state.population}</span>
        </li>
        <li className="flex justify-between">
          <span className="shrink-0 pr-4 font-bold text-red-500">
            Update speed:
          </span>
          <span className="text-right text-white">{state.speed / 1000}s</span>
        </li>
        <li className="flex justify-between">
          <span className="shrink-0 pr-4 font-bold text-red-500">Size:</span>
          <span className="text-right text-white">
            {state.rows} x {state.cols}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default StatusBlock;
