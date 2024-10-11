import { Paper, styled } from "@mui/material";
import { HeaderText } from "../constants/styleConstants";
import { useContext } from "react";
import { CardsContext } from "../contexts/cardsContext";

const CardContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SCard = styled(Paper)`
  background-color: ${props => props.bgcolor};
  margin: 1rem;
  width: 75vw;
  height: 80vh;
  max-width: 20rem;
  max-height: 27rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export interface CardComponentProps {
  text: string
}

export const CardComponent = ({text}: CardComponentProps) => {
  const { cardColor } = useContext(CardsContext);
  return (
    <CardContainer>
      <SCard elevation={8} bgcolor={cardColor}>
        <HeaderText variant="h4" sx={{ px: 5 }}>{text}</HeaderText>
      </SCard>
    </CardContainer>
  );
};
