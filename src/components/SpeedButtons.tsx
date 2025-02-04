import { changeSpeed } from '../utils/SpeedControl';
import SetStateAliase from '../aliases/SetStateAliase';

interface SpeedControlProps {
  setState: SetStateAliase;
}

export function FasterButton({ setState }: SpeedControlProps) {
  return (
    <button
      className="btn"
      onClick={() => {
        changeSpeed(setState, -200);
      }}
    >
      faster
    </button>
  );
}

export function SlowerButton({ setState }: SpeedControlProps) {
  return (
    <button
      className="btn"
      onClick={() => {
        changeSpeed(setState, 200);
      }}
    >
      slower
    </button>
  );
}
