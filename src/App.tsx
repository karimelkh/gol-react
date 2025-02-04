import { useEffect, useRef, useState } from 'react';
import { playGame, pauseGame, nextStep } from './utils/GameLogic';
import { sendMessage } from './utils/Communication';
import { handleKeybinds } from './utils/KeyControl';
import { resetBoard } from './utils/BoardControl';
import { changeSpeed } from './utils/SpeedControl';
import GridConvas from './components/GridConvas';
import PlayPauseButton from './components/PlayPauseButton';
import SeedButton from './components/SeedButton';
import ResetButton from './components/ResetButton';
import StatusBlock from './components/StatusBlock';
import { NextStepButton } from './components/NextStepButton';
import { FasterButton, SlowerButton } from './components/SpeedButtons';
import GridStateType from './types/GridStateType';
import Keybindings from './types/Keybindings';
import IntervalRefAliase from './aliases/IntervalRefAliase';
import { seedBoard } from './utils/BoardControl';

function App() {
  const defaultRows: number = 20;
  const defaultCols: number = defaultRows * 2;

  const intervalRef: IntervalRefAliase = useRef<number | null>(null);

  const [state, setState] = useState<GridStateType>({
    speed: 200,
    generation: 0,
    population: 0,
    rows: defaultRows,
    cols: defaultCols,
    grid: Array(defaultRows)
      .fill(null)
      .map(() => Array(defaultCols).fill(false)),
    isRunning: false,
  });

  const keyConfigs: Keybindings = {
    k: () => {
      if (state.isRunning) pauseGame(setState, intervalRef);
      else playGame(setState, intervalRef);
    },
    l: () =>
      !state.isRunning
        ? nextStep(setState)
        : sendMessage(
            "Can't go to the next step while the game is running. Stop it first!",
          ),
    j: () => console.log('[TODO] prevStep'), // TODO: waiting for the	`prevStep` impl
    s: () => seedBoard(setState),
    '>': () => changeSpeed(setState, -200),
    '<': () => changeSpeed(setState, 200),
    r: () => resetBoard(setState, intervalRef),
    n: () =>
      !state.isRunning
        ? nextStep(setState)
        : sendMessage(
            "Can't go to the next step while the game is running. Stop it first!",
          ),
    p: () => console.log('[TODO] prevStep'),
  };

  useEffect(() => {
    if (state.isRunning) playGame(setState, intervalRef);
  }, [state.speed, state.isRunning]);

  document.addEventListener(
    'DOMContentLoaded',
    () => {
      handleKeybinds(keyConfigs);
    },
    { once: true },
  );

  return (
    <div className="relative w-screen h-screen bg-cerulean">
      <h1 className="header">game of life</h1>
      <div className="container mx-auto">
        <ul className="mb-10 flex justify-center gap-2">
          <li>
            <PlayPauseButton
              intervalRef={intervalRef}
              st={{ state, setState }}
            />
          </li>
          <li>
            <NextStepButton st={{ state, setState }} />
          </li>
          <li>
            <SeedButton setState={setState} />
          </li>
          <li>
            <ResetButton intervalRef={intervalRef} setState={setState} />
          </li>
          <li>
            <SlowerButton setState={setState} />
          </li>
          <li>
            <FasterButton setState={setState} />
          </li>
        </ul>
        {/* <StatusBlock style="stack" state={state} /> */}
        <StatusBlock state={state} />
        <div className="flex items-center justify-center">
          {/* FIX: https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key */}
          <GridConvas st={{ state, setState }} />
        </div>
      </div>
    </div>
  );
}

export default App;
