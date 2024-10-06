import React, { createContext, ReactElement, useState } from "react";
import { COLORS } from "../constants/constants";
interface CardsContextProps {
  cardColor: string;
  setCardColor: React.Dispatch<React.SetStateAction<string>>;
  cards: string[];
  setCards: React.Dispatch<React.SetStateAction<string[]>>;
}

export const CardsContext = createContext<CardsContextProps>({
  cardColor: COLORS.mblue,
  setCardColor: () => {},
  cards: [],
  setCards: () => {},
});

export const CardsProvider = ({ children }: { children: ReactElement }) => {
  const [cards, setCards] = useState<string[]>([]);
  const [cardColor, setCardColor] = useState<string>(COLORS.mblue);

  return (
    <CardsContext.Provider value={{ cards, setCards, cardColor, setCardColor }}>
      {children}
    </CardsContext.Provider>
  );
};
