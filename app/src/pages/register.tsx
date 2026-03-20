import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";

function Register() {
    const isError = true;
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Criar Conta
        </Typography>

        {isError && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            Erro ao criar conta. Verifique os dados.
          </Alert>
        )}

        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nome de Usuário"
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            // disabled={isPending}
          >
            {/* {isPending ? 'Cadastrando...' : 'Registrar'} */}
            Registrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
