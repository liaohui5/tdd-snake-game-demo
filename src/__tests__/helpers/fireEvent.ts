export const fireEvent = {
  keyup(eventInitDict?: KeyboardEventInit | undefined) {
    window.dispatchEvent(new KeyboardEvent("keyup", eventInitDict));
  },
};
