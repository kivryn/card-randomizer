import { useState } from "react";
import { sample } from "lodash";
import { HeaderText } from "../constants/styleConstants";
import { styled, TextField } from "@mui/material";
import { COLORS } from "../constants/constants";

const HeaderContainer = styled("div")`
  padding: 1rem;
  color: ${COLORS.mintcream};
`;

const hellos = [
  "Hello",
  "Hola",
  "你好",
  "Bonjour",
  "Guten Tag",
  "Konnichiwa",
  "Anyoung haseyo",
  "Ciao",
  "Hej",
];

export const Header = () => {
  const [name, setName] = useState("Friend");
  const [isSetting, setIsSetting] = useState(false);
  const [randomHello, setRandomHello] = useState(sample(hellos));

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedName = e.target.value;
    setName(updatedName);
  };

  return (
    <HeaderContainer>
      {!isSetting && (
        <HeaderText
          variant="h4"
          sx={{ pt: 2 }}
          onClick={() => setIsSetting(true)}
        >
          {randomHello}, {name}.
        </HeaderText>
      )}
      {isSetting && (
        <TextField
          id="standard-basic"
          label="Your Name"
          variant="standard"
          sx={{ color: "#FFFFFF" }}
          value={name === "friend" ? "" : name}
          onChange={changeName}
          onBlur={() => {
            setIsSetting(false);
            setRandomHello(sample(hellos));
          }}
          autoFocus
        ></TextField>
      )}
    </HeaderContainer>
  );
};
