import {Grid, Box, Button, Paper, Typography } from "@mui/material";
import { Headset, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import CardFeature from "../components/CardFeature";
import { useNavigate } from "react-router";

function Home() {
  const navigator = useNavigate();
  const features = [
    {
      icon: <Truck size={40} />,
      title: "Entrega Rápida",
      description: "Receba seus produtos em tempo recorde em todo o Brasil.",
    },
    {
      icon: <ShieldCheck size={40} />,
      title: "Compra Segura",
      description: "Seus dados protegidos com criptografia de ponta a ponta.",
    },
    {
      icon: <Headset size={40} />,
      title: "Suporte 24/7",
      description: "Nossa equipe de especialistas pronta para te ajudar.",
    },
  ];
  return (
    <Box>
      <Paper
        elevation={1}
        sx={{
          p: {
            xs: 4,
            md: 8,
            lg: 12,
          },
          borderRadius: 4,
          textAlign: "center",
          mb: 6,
          border: "1px solid #333333",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 800,
            color: "primary.main",
            mb: 2,
            fontSize: {
              xs: "2.5rem",
              md: "3.75rem",
            },
          }}
        >
          Tech & Code Store
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: "700px", mx: "auto" }}
        >
          A loja oficial para programadores que buscam performance, estilo e as
          melhores ferramentas para o dia a dia.
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<ShoppingBag />}
          onClick={() => navigator("/products")}
          data-testid="explore-products-button"
          sx={{
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
        >
          Explorar Produtos
        </Button>
      </Paper>
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid key={index}>
            <CardFeature
              description={feature.description}
              icon={feature.icon}
              title={feature.title}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Home;
