import { Typography, Box } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        p: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="body1">
        © 2025 Ваш сайт. Все права защищены.
      </Typography>
      <Typography variant="body2">
        <a
          href="/privacy-policy"
          style={{ color: "white", textDecoration: "none" }}
        >
          Политика конфиденциальности
        </a>
      </Typography>
    </Box>
  );
}
