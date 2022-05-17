import { createContext, FC, useState } from 'react';

type PageErrorContextType = {
  setPageError: (error: Error | undefined) => void;
  pageError: Error | undefined;
};

export const PageErrorContext = createContext<PageErrorContextType | undefined>(
  undefined,
);

export const PageErrorProvider: FC = ({ children }) => {
  const [pageError, setPageError] = useState<Error | undefined>(undefined);

  return (
    <PageErrorContext.Provider
      value={{
        setPageError,
        pageError,
      }}
    >
      {children}
    </PageErrorContext.Provider>
  );
};
