import { createContext, FC, useState, useEffect } from 'react';

type FlashContextType = {
  setFlash: (message: string | undefined) => void;
  flash: string | undefined;
};

export const FlashContext = createContext<FlashContextType | undefined>(undefined);

export const FlashProvider: FC = ({ children }) => {
  const [flash, setFlash] = useState<string | undefined>(undefined);

  return (
    <FlashContext.Provider
      value={{
        setFlash,
        flash,
      }}
    >
      {children}
    </FlashContext.Provider>
  );
};
