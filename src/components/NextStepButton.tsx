import StateType from '../types/StateType';
import { nextStep, prevStep } from '../utils/GameLogic';
import { sendMessage } from '../utils/Communication';

export function NextStepButton({ st }: { st: StateType }) {
  return (
    <button
      className="btn"
      onClick={() =>
        !st.state.isRunning
          ? nextStep(st.setState)
          : sendMessage(
              "Can't go to the next step while the game is running. Stop it first!",
            )
      }
    >
      Next Step
    </button>
  );
}

export function PrevStepButton({ st }: { st: StateType }) {
  return (
    <button
      className="btn"
      onClick={() =>
        !st.state.isRunning
          ? prevStep(st.setState)
          : sendMessage(
              "Can't go to the next step while the game is running. Stop it first!",
            )
      }
    >
      Prev Step
    </button>
  );
}
