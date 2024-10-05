import { useContext, useState } from "react";
import { CardsContext } from "../contexts/cardsContext";
import { useCSVReader, usePapaParse } from "react-papaparse";
import { HeaderText, SButton } from "../constants/styleConstants";
import { songs } from "../assets/songs";
import { styled } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const SConfigureRow = styled("div")`
  display: flex;
  justify-content: center;
`;

export const Configure = () => {
  const { cards, setCards } = useContext(CardsContext);
  const [showConfigure, setShowConfigure] = useState(false);
  const { readString } = usePapaParse();
  const { CSVReader } = useCSVReader();
  const parseSongList = () => {
    readString(songs, {
      header: true,
      worker: true,
      complete: (results: any) => {
        const songList: string[] = [];
        results.data.map((d: any) => {
          const song = Object.values(d)[0] as string;
          if (song) songList.push(song);
        });
        setCards(songList);
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
          <SButton variant="contained" onClick={parseSongList}>
            Play Song Game
          </SButton>
          <CSVReader
            onUploadAccepted={(results: any) => {
              const value: string[][] = results.data;
              const filtered = value.filter((_, i) => i !== 0);
              setCards(value.map((val) => val[0]));
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
