import { Box, Container } from "@mui/material";
import { Outlet } from "react-router";
import Header from "./header";
import Footer from "./footer";

function Layout() {
    return (<Box sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    }}>
        <Header/>
        <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
            <Container maxWidth="lg">
                <Outlet/>
            </Container>
        </Box>
        <Footer/>

    </Box>);
}

export default Layout;