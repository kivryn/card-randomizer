import { Paper, styled } from "@mui/material";
import { HeaderText } from "../constants/styleConstants";
import { COLORS } from "../constants/constants";

const CardContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SCard = styled(Paper)`
  background-color: ${COLORS.mblue};
  margin: 1rem;
  width: 75vw;
  height: 80vh;
  max-width: 20rem;
  max-height: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
`;

export interface CardComponentProps {
  text: string
}

export const CardComponent = ({text}: CardComponentProps) => {
  return (
    <CardContainer>
      <SCard elevation={8}>
        <HeaderText variant="h4" sx={{ px: 5 }}>{text}</HeaderText>
      </SCard>
    </CardContainer>
  );
};
