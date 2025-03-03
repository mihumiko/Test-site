import { useParams } from "react-router-dom";
import { info } from "../../data";
import { Box, Typography } from "@mui/material";
//import './InfoPage.css'

export default function InfoPage() {
  const { name } = useParams();
  const currentInfo = info.find((item) => item.name === name);

  if (!currentInfo) {
    return <h2>Информация не найдена</h2>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          maxWidth: "60vw",
          width: "100%",
          flexDirection: "column",
          border: 2,
          boxShadow: 3,
          margin: "20px auto",
          padding: "10px",
        }}
      >
        <Typography variant="h1">{currentInfo.name}</Typography>
        <Typography
          variant="body1"
          sx={{ wordWrap: "break-word" }}
          dangerouslySetInnerHTML={{ __html: currentInfo.description }}
        />
      </Box>
    </Box>
  );
}
