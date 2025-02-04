import SetStateAlise from '../aliases/SetStateAliase';
import { seedBoard } from '../utils/BoardControl';

function SeedButton({ setState }: { setState: SetStateAlise }) {
  return (
    <button className="btn" onClick={() => seedBoard(setState)}>
      Seed
    </button>
  );
}

export default SeedButton;
