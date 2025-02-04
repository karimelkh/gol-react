import IntervalRefAliase from '../aliases/IntervalRefAliase';
import SetStateAliase from '../aliases/SetStateAliase';
import { resetBoard } from '../utils/BoardControl';

interface ResetButtonProps {
  setState: SetStateAliase;
  intervalRef: IntervalRefAliase;
}

function ResetButton({ setState, intervalRef }: ResetButtonProps) {
  return (
    <button className="btn" onClick={() => resetBoard(setState, intervalRef)}>
      Reset
    </button>
  );
}

export default ResetButton;
