import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import HowToVoteIcon from "@mui/icons-material/HowToVote";

export default function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "black", mb: 4 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <HowToVoteIcon sx={{ mr: 2, color: "white" }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "white" }}>
            Poll System
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
