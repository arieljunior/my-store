import { AppBar, Toolbar } from "@mui/material";
import MobileNavMenu from "./MobileNavMenu";
import BrandLogo from "./BrandLogo";
import DesktopNavMenu from "./DesktopNavMenu";
import UserAuthenticationActions from "./UserAuthenticationActions";

function Header() {
    return (
    <AppBar position="static" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <MobileNavMenu />

        <BrandLogo />

        <DesktopNavMenu />

        <UserAuthenticationActions />
      </Toolbar>
    </AppBar>
  );
}

export default Header;