import { useEffect, useRef, useState } from 'react';
import { playGame, pauseGame, nextStep } from './utils/GameLogic';
import { sendMessage } from './utils/Communication';
import { handleKeybinds } from './utils/KeyControl';
import { resetBoard } from './utils/BoardControl';
import { changeSpeed } from './utils/SpeedControl';
import { seedBoard } from './utils/BoardControl';
import Board from './components/Board';
import Button from './components/Button';
import StatusBlock from './components/StatusBlock';
import GridStateType from './types/GridStateType';
import Keybindings from './types/Keybindings';
import IntervalRefAliase from './aliases/IntervalRefAliase';

function App() {
  const defaultRows: number = 40;
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

  useEffect(() => {
    if (state.isRunning) playGame(setState, intervalRef);
  }, [state.speed, state.isRunning]);

  useEffect(() => {
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
      c: () => resetBoard(setState, intervalRef),
      n: () =>
        !state.isRunning
          ? nextStep(setState)
          : sendMessage(
              "Can't go to the next step while the game is running. Stop it first!",
            ),
      p: () => console.log('[TODO] prevStep'),
    };

    const listener = handleKeybinds(keyConfigs);
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [state.isRunning]);

  return (
    <div className="relative w-screen h-screen bg-cerulean">
      <h1 className="header">game of life</h1>
      <div className="container mx-auto">
        <ul className="my-12 flex justify-center gap-2">
          <li>
            <Button
              text={state.isRunning ? 'pause' : 'play'}
              tooltip="play/pause the game [K]"
              callback={() => {
                if (state.isRunning) pauseGame(setState, intervalRef);
                else playGame(setState, intervalRef);
              }}
            />
          </li>
          <li>
            <Button
              text="next step"
              tooltip="move to the next board [N]"
              callback={() =>
                !state.isRunning
                  ? nextStep(setState)
                  : sendMessage(
                      "Can't go to the next step while the game is running. Stop it first!",
                    )
              }
            />
          </li>
          <li>
            <Button
              text="seed"
              tooltip="seed the board randomly [S]"
              callback={() => seedBoard(setState)}
            />
          </li>
          <li>
            <Button
              text="reset"
              tooltip="reset the board [C]"
              callback={() => resetBoard(setState, intervalRef)}
            />
          </li>
          <li>
            <Button
              text="slower"
              tooltip="slow down the update speed [<]"
              callback={() => {
                changeSpeed(setState, 200);
              }}
            />
          </li>
          <li>
            <Button
              text="faster"
              tooltip="speed up the update speed [>]"
              callback={() => {
                changeSpeed(setState, -200);
              }}
            />
          </li>
        </ul>
        {/* <StatusBlock style="stack" state={state} /> */}
        <StatusBlock state={state} />
        <div className="flex items-center justify-center">
          {/* FIX: https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key */}
          <Board st={{ state, setState }} />
        </div>
      </div>
    </div>
  );
}

export default App;
