import { useContext, useState } from "react";
import { CardsContext } from "../contexts/cardsContext";
import { HeaderText, SButton, SButtonRow } from "../constants/styleConstants";
import styled from "styled-components";

const CounterRow = styled(SButtonRow)`
    padding-bottom: 2rem;
`

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
          <CounterRow>
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
          </CounterRow>
        </>
      )}
    </>
  );
};
