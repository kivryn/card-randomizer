import React, { createContext, ReactElement, useState } from "react";
interface CardsContextProps {
  cards: string[];
  setCards: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CardsContext = createContext<CardsContextProps>({
  cards: [],
  setCards: () => {},
});

export const CardsProvider = ({ children }: { children: ReactElement }) => {
  const [cards, setCards] = useState<string[]>([]);

  return (
    <CardsContext.Provider value={{ cards, setCards }}>
      {children}
    </CardsContext.Provider>
  );
};
