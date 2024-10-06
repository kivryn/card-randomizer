import { useEffect, useState } from "react";
import { CardComponent } from "./card";
import { SButton, SButtonRow } from "../constants/styleConstants";

export interface RandomizerProps {
  cards: string[];
}

export const CardRandomizer = ({ cards }: RandomizerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(0);

  useEffect(() => {
    setLastIndex(cards.length - 1);
    setCurrentIndex(0);
  }, [cards]);

  const handlePreviousClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex > lastIndex ? 0 : nextIndex);
  };

  return (
    <>
      <CardComponent text={cards[currentIndex]} />{" "}
      <SButtonRow>
        {!!currentIndex && (
          <SButton
            variant="contained"
            color="secondary"
            onClick={handlePreviousClick}
          >
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
