import { Box, Container, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "background.paper", py: 3, mt: "auto" }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} MyStore. Todos os direitos reservados.
        </Typography>
        <Typography variant="caption" color="text.secondary" align="center" display="block">
            Icones: Lucide
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
