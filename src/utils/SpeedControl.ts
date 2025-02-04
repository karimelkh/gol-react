import SetStateAliase from '../aliases/SetStateAliase';

export function changeSpeed(setState: SetStateAliase, inc: number) {
  setState((prevState) => {
    const newSpeed: number = prevState.speed + inc;
    // 0s <= speed <= 4s
    if (0 <= newSpeed && newSpeed <= 4000) {
      return {
        ...prevState,
        speed: newSpeed,
      };
    }
    return {
      ...prevState,
    };
  });
}
