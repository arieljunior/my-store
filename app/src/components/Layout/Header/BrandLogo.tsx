import { Typography } from "@mui/material";
import { Store } from "lucide-react";
import { Link as RouterLink } from "react-router";

function BrandLogo() {
    return <Typography
    variant="h6"
    component={RouterLink}
    to="/"
    sx={{
      textDecoration: "none",
      color: "inherit",
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      gap: 1,
      flexGrow: { xs: 1, md: 0 },
      mr: { md: 4 },
    }}
  >
    <Store color="gold" /> MyStore
  </Typography>;
}

export default BrandLogo;