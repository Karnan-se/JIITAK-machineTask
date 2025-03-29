
import { useState } from "react"
import AppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import HowToVoteIcon from "@mui/icons-material/HowToVote"
import Avatar from "@mui/material/Avatar"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import Logout from "@mui/icons-material/Logout"
import PersonIcon from "@mui/icons-material/Person"
import { useDispatch } from "react-redux"
import { setUserCredentials } from "../../Features/slices/authSlice"
import { userLogout } from "../../Features/slices/authSlice"
import { userLogoutApi } from "../../Features/api/logoutapi"


export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const dispatch = useDispatch()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async() => {
    dispatch(userLogout());
    await userLogoutApi()
    handleClose()
    // Redirect to login page or home page
    // navigate('/login');
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: "black", mb: 4 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <HowToVoteIcon sx={{ mr: 2, color: "white" }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "white" }}>
            Poll System
          </Typography>

          {/* Avatar with dropdown */}
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: "white", color: "black" }}>A</Avatar>
            </IconButton>
          </Tooltip>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >

            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

