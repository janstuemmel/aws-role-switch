import {
  useEffect,
  useState,
} from 'react';

export const useKeyPress = (target: string) => {
  const [pressed, setPressed] = useState<boolean>(false);
  const press = (isPressed: boolean) => (evt: KeyboardEvent) => {
    if (evt.key == target) {
      evt.preventDefault();
      setPressed(isPressed);
    }
  };
  const down = press(true), up = press(false); 

  useEffect(() => {
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []); 

  return pressed;
};
