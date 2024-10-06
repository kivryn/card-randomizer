import { useContext, useState } from "react";
import { shuffle } from "lodash";
import { styled } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { CardsContext } from "../contexts/cardsContext";
import { useCSVReader, usePapaParse } from "react-papaparse";
import { HeaderText, SButton } from "../constants/styleConstants";
import { songs } from "../assets/songs";
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
    loadLocalFile(waysToPlay, true);
  };

  const parseSongList = () => {
    loadLocalFile(songs, false);
  };

  const loadLocalFile = (local: string, isRules = false) => {
    readString(local, {
      header: true,
      worker: true,
      complete: (results: any) => {
        const songList: string[] = [];
        results.data.map((d: any) => {
          const song = Object.values(d)[0] as string;
          if (song) songList.push(song);
        });
        setCards(isRules ? songList : shuffle(songList));
        setCardColor(isRules ? COLORS.cordovan : COLORS.mblue);
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
          <SButton variant="contained" color="secondary" onClick={showRules}>
            How to Play
          </SButton>
          <SButton variant="contained" onClick={parseSongList}>
            Play Song Game
          </SButton>
          <CSVReader
            onUploadAccepted={(results: any) => {
              const songList: string[] = [];
              const value: string[][] = results.data;
              value.forEach((val) => {
                if (val[0]) songList.push(val[0]);
              });
              setCards(shuffle(songList));
              setShowConfigure(false);
            }}
            config={{ worker: true }}
            noDrag
          >
            {({
              getRootProps,
              acceptedFile,
              ProgressBar,
              getRemoveFileProps,
              Remove,
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
                    <SButton variant="contained">Upload Custom Cards</SButton>
                  )}
                </div>
              </>
            )}
          </CSVReader>
          {!!cards.length && (
            <SButton variant="contained" onClick={() => setCards([])}>
              Clear Cards
            </SButton>
          )}
        </>
      )}
    </>
  );
};
