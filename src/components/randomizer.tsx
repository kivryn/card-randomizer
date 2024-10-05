import { useEffect, useState } from "react";
import { CardComponent } from "./card";
import { sample } from "lodash";
import { SButton } from "../constants/styleConstants";
import styled from "styled-components";
export interface RandomizerProps {
  cards: string[];
}

const SButtonRow = styled("div")`
  display: flex;
  justify-content: center;
  margin: 2rem;
`;

export const CardRandomizer = ({ cards }: RandomizerProps) => {
  const [previousCard, setPreviousCard] = useState("");
  const [currentCard, setCurrentCard] = useState("");
  const [nextCard, setNextCard] = useState("");

  useEffect(() => {
    setPreviousCard("");
    setNextCard("");
    setCurrentCard(sample(cards) || "");
  }, [cards]);

  const handlePreviousClick = () => {
    setNextCard(currentCard);
    setCurrentCard(previousCard);
    setPreviousCard("");
  };

  const handleNextClick = () => {
    setPreviousCard(currentCard);
    if (nextCard) {
      setCurrentCard(nextCard);
      setNextCard("");
    } else {
        const newCard = sample(cards);
        if (newCard) {
          setCurrentCard(newCard);
        }
    }
  };

  return (
    <>
      <CardComponent text={currentCard} />{" "}
      <SButtonRow>
        {!!previousCard && (
          <SButton variant="contained" color="secondary" onClick={handlePreviousClick}>
            Previous Card
          </SButton>
        )}
        <SButton variant="contained" onClick={handleNextClick}>
          Next Card
        </SButton>
      </SButtonRow>
    </>
  );
};
