import { useState } from "react";
import { Button, Tab, Tabs, TextField, Paper, CircularProgress } from "@mui/material";

export function UserAuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/dashboard";
    }, 1500);
  }

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} centered>
        <Tab label="Login" value="login" />
        <Tab label="Register" value="register" />
      </Tabs>

      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        {activeTab === "login" ? (
          <form onSubmit={onSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              required
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>
          </form>
        ) : (
          <form onSubmit={onSubmit}>
            <TextField
              fullWidth
              label="Name"
              type="text"
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              required
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Create Account"}
            </Button>
          </form>
        )}
      </Paper>
    </div>
  );
}
