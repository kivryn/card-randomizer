import { useContext, useState } from "react";
import { shuffle } from "lodash";
import { styled } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { CardsContext } from "../contexts/cardsContext";
import { useCSVReader, usePapaParse } from "react-papaparse";
import { HeaderText, SButton } from "../constants/styleConstants";
import { songs } from "../assets/songs";
import { conversation } from "../assets/conversation";
import { waysToPlay } from "../assets/waystoplay";
import { COLORS } from "../constants/constants";

const SConfigureRow = styled("div")`
  display: flex;
  justify-content: center;
`;

export const Configure = () => {
  const { cards, setCards, setCardColor } = useContext(CardsContext);
  const [showConfigure, setShowConfigure] = useState(false);
  const { readString } = usePapaParse();
  const { CSVReader } = useCSVReader();
  const showRules = () => {
    loadLocalFile(waysToPlay, false, COLORS.rules);
  };

  const parseSongList = () => {
    loadLocalFile(songs, true, COLORS.lapislazuli);
  };

  const parseConversationList = () => {
    loadLocalFile(conversation, true, COLORS.cordovan);
  }

  const loadLocalFile = (local: string, shouldShuffle: boolean, color = COLORS.mblue) => {
    readString(local, {
      header: true,
      worker: true,
      delimiter: ";",
      complete: (results: any) => {
        const list: string[] = [];
        results.data.forEach((d: any) => {
          const item = Object.values(d)[0] as string;
          if (item) list.push(item);
        });
        setCards(shouldShuffle ? shuffle(list): list);
        setCardColor(color);
        setShowConfigure(false);
      },
    });
  };

  return (
    <>
      {!!cards.length && !showConfigure ? (
        <SConfigureRow>
          <SettingsIcon onClick={() => setShowConfigure(true)} />
        </SConfigureRow>
      ) : (
        <>
          {!!cards.length && (
            <SConfigureRow>
              <SettingsIcon onClick={() => setShowConfigure(false)} />
            </SConfigureRow>
          )}
          <SConfigureRow>
            <SButton variant="contained" color="success" onClick={showRules}>
              How to Play
            </SButton>
          </SConfigureRow>
          <SConfigureRow>
            <SButton variant="contained" onClick={parseSongList}>
              Play Song Game
            </SButton>
          </SConfigureRow>
          <SConfigureRow>
            <SButton variant="contained" onClick={parseConversationList}>
              Play Conversation Game
            </SButton>
          </SConfigureRow>
          <CSVReader
            onUploadAccepted={(results: any) => {
              const songList: string[] = [];
              const value: string[][] = results.data;
              value.forEach((val) => {
                if (val[0]) songList.push(val[0]);
              });
              setCards(shuffle(songList));
              setCardColor(COLORS.mblue);
              setShowConfigure(false);
            }}
            config={{ worker: true }}
            noDrag
          >
            {({
              getRootProps,
              acceptedFile,
            }: any) => (
              <>
                <div {...getRootProps()}>
                  {acceptedFile ? (
                    <>
                      <HeaderText variant="h6" sx={{ pt: 2 }}>
                        Custom Cards Uploaded
                      </HeaderText>
                      <SButton variant="contained" onClick={() => setCards([])}>
                        Change Custom Cards
                      </SButton>
                    </>
                  ) : (
                    <SButton variant="contained" >Upload Custom Cards</SButton>
                  )}
                </div>
              </>
            )}
          </CSVReader>
          {!!cards.length && (
            <SButton variant="contained" onClick={() => setCards([])} color="warning">
              Clear Cards
            </SButton>
          )}
        </>
      )}
    </>
  );
};
