import { Box, Button } from "@mui/material";
import { NAVIGATION_LINKS } from "../../../constants";
import { Link as RouterLink } from "react-router";

function DesktopNavMenu() {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 2 }}>
      {NAVIGATION_LINKS.map((link) => (
        <Button
          key={link.path}
          color="inherit"
          component={RouterLink}
          to={link.path}
        >
          {link.label}
        </Button>
      ))}
    </Box>
  );
}

export default DesktopNavMenu;
