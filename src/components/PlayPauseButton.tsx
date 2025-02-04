import { pauseGame, playGame } from '../utils/GameLogic';
import StateType from '../types/StateType';
import IntervalRefAliase from '../aliases/IntervalRefAliase';

interface PlayPauseButtonProps {
  st: StateType;
  intervalRef: IntervalRefAliase;
}

function PlayPauseButton({ intervalRef, st }: PlayPauseButtonProps) {
  let action: string;
  if (st.state.isRunning) action = 'Pause';
  else action = 'Play';
  return (
    <button
      className="btn"
      onClick={() =>
        st.state.isRunning
          ? pauseGame(st.setState, intervalRef)
          : playGame(st.setState, intervalRef)
      }
    >
      {action}
    </button>
  );
}

export default PlayPauseButton;
