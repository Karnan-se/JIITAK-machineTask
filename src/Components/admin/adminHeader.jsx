import { Avatar, Button, Menu, MenuItem, Typography, IconButton } from "@mui/material";
import { Logout, Settings, Person } from "@mui/icons-material";
import { useState } from "react";

export function AdminHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <Typography variant="h4" fontWeight="bold">
          Dashboard
        </Typography>
        <Typography variant="body2" color="textSecondary" className="mt-1">
        
            "Manage your polls and view voting results"
           
        </Typography>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2">
          <div className="text-right">
            <Typography variant="body2" fontWeight="medium">
              John Doe
            </Typography>
            <Typography variant="caption" color="textSecondary" className="capitalize">
            
            </Typography>
          </div>
        </div>

        <IconButton onClick={handleClick}>
          <Avatar src="/placeholder.svg?height=40&width=40" alt="User">
            JD
          </Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Typography variant="subtitle2" className="px-4 py-2">
            My Account
          </Typography>
          <MenuItem onClick={handleClose}>
            <Person fontSize="small" className="mr-2" />
            Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Settings fontSize="small" className="mr-2" />
            Settings
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Logout fontSize="small" className="mr-2" />
            Log out
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
