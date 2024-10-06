import { useContext, useState } from "react";
import { CardsContext } from "../contexts/cardsContext";
import { HeaderText, SButton, SButtonRow } from "../constants/styleConstants";

export const Counter = () => {
  const { cards } = useContext(CardsContext);
  const [counter, setCounter] = useState(0);
  return (
    <>
      {!!cards.length && (
        <>
          <HeaderText variant="h4" sx={{ p: 1 }}>
            {counter}
          </HeaderText>
          <SButtonRow>
            <SButton
              variant="outlined"
              color="warning"
              onClick={() => setCounter(0)}
            >
              Reset
            </SButton>
            <SButton
              variant="outlined"
              color="error"
              onClick={() => setCounter(counter <= 1 ? 0 : counter - 1)}
            >
              -
            </SButton>
            <SButton
              variant="outlined"
              color="success"
              onClick={() => setCounter(counter + 1)}
            >
              +
            </SButton>
          </SButtonRow>
        </>
      )}
    </>
  );
};
