import { Button, Typography } from "@mui/material";
import styled from "styled-components";
import { COLORS } from "./constants";

export const HeaderText = styled(Typography)`
    color: ${COLORS.mintcream};
    && {
      font-weight: 500;
    }
`;

export const SButtonRow = styled("div")`
  display: flex;
  justify-content: center;
  align-items: middle;
  margin: 1rem;
`;

export const SButton = styled(Button)`
  margin: 0.5rem;
  width: 15rem;
`;
