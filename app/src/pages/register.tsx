import {
  Alert,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { api } from "../services/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { AuthResponse } from "../types";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post<AuthResponse>("/auth/local/register", {
        username,
        email,
        password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      // dispatch(setCredentials({ user: data.user, token: data.jwt }));
      toast.success("Cadastro realizado com sucesso!");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate();
  };
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

        {registerMutation.isError && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            Erro ao criar conta. Verifique os dados.
          </Alert>
        )}

        <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nome de Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? 'Cadastrando...' : 'Registrar'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
