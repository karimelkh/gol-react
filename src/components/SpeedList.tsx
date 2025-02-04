import { useState } from 'react';
import SetStateAliase from '../aliases/SetStateAliase';

interface SpeedListProps {
  setState: SetStateAliase;
}

function SpeedList({ setState }: SpeedListProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button
        className="px-4 py-2 bg-lime-500 text-white font-semibold rounded-m hover:bg-lime-600 duration-200"
        onClick={toggleMenu}
      >
        Speed
      </button>
      {isOpen && (
        <ul className="absolute flex flex-col bg-white">
          <li
            onClick={() => {
              changeSpeed(setState, 2000);
            }}
            className="cursor-pointer font-medium text-center hover:bg-gray-400 duration-200"
          >
            2s
          </li>
          <li
            onClick={() => {
              changeSpeed(setState, 1000);
            }}
            className="cursor-pointer font-medium text-center hover:bg-gray-400 duration-200"
          >
            1s
          </li>
          <li
            onClick={() => {
              changeSpeed(setState, 500);
            }}
            className="cursor-pointer font-medium text-center hover:bg-gray-400 duration-200"
          >
            0.5s
          </li>
          <li
            onClick={() => {
              changeSpeed(setState, 250);
            }}
            className="cursor-pointer font-medium text-center hover:bg-gray-400 duration-200"
          >
            0.25s
          </li>
          <li
            onClick={() => {
              changeSpeed(setState, 100);
            }}
            className="cursor-pointer font-medium text-center hover:bg-gray-400 duration-200"
          >
            0.10s
          </li>
        </ul>
      )}
    </>
  );
}

function changeSpeed(setState: SetStateAliase, newSpeed: number) {
  setState((prevState) => ({
    ...prevState,
    speed: newSpeed,
  }));
}

export default SpeedList;
