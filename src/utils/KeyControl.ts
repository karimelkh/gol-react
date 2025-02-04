import Keybindings from '../types/Keybindings';

export function handleKeybinds(
  kbinds: Keybindings,
): (e: KeyboardEvent) => void {
  return (e: KeyboardEvent) => {
    if (e.repeat) return;
    if (kbinds[e.key]) {
      e.preventDefault(); // Prevent default browser behavior
      e.stopPropagation(); // Prevent propagation
      kbinds[e.key]();
    }
  };
}
