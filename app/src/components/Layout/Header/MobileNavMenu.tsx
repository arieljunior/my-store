import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { NAVIGATION_LINKS } from "../../../constants";
import { Link as RouterLink } from "react-router";

function MobileNavMenu() {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(
    null,
  );

  const openMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const closeMobileMenu = () => {
    setMobileMenuAnchor(null);
  };
  return (
    <Box sx={{ display: { xs: "flex", md: "none" } }}>
      <IconButton size="large" onClick={openMobileMenu} color="inherit">
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={mobileMenuAnchor}
        keepMounted
        open={Boolean(mobileMenuAnchor)}
        onClose={closeMobileMenu}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {NAVIGATION_LINKS.map((link) => (
          <MenuItem key={link.path} onClick={closeMobileMenu}>
            <Button color="inherit" component={RouterLink} to={link.path}>
              {link.label}
            </Button>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

export default MobileNavMenu;
