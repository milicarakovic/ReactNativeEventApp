import { createContext } from 'react';

export type IOpenAbout = {
  open: boolean;
  setOpen: (value: boolean) => void;
};
const OpenAboutDefault: IOpenAbout = {
  open: false,
  setOpen: () => null,
};

export const OpenContext = createContext<IOpenAbout>(OpenAboutDefault);
