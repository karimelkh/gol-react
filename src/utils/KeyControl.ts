import Keybindings from '../types/Keybindings';

export function handleKeybinds(kbinds: Keybindings) {
  window.addEventListener('keydown', (event) => {
    if (event.repeat) return;
    if (kbinds[event.key]) {
      event.preventDefault(); // Prevent default browser behavior
      event.stopPropagation(); // Prevent propagation
      kbinds[event.key]();
    }
  });
}
