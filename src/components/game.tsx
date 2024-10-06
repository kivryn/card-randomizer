import { useContext } from "react";
import { CardsContext } from "../contexts/cardsContext";
import { CardRandomizer } from "./randomizer";
import { Counter } from "./counter";

export const Game = () => {
  const { cards } = useContext(CardsContext);
  return (
    <>
      {!!cards?.length && (
        <>
          <CardRandomizer cards={cards} />
          <Counter />
        </>
      )}
    </>
  );
};
