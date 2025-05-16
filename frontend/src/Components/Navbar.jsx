import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const logout = () => {
    localStorage.removeItem("authTokens");
    navigate("/login");
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-blue-400 font-semibold"
      : "text-white hover:text-blue-400";

  return (
    <AppBar position="sticky" className="bg-black bg-opacity-80 shadow-md">
      <Toolbar className="flex justify-between">
        <Typography variant="h5" component="div" className="text-blue-400 font-bold">
          <Link to="/dashboard" className="text-decoration-none">WedManager</Link>
        </Typography>

        {/* Buttons Container */}
        <div className="hidden md:flex space-x-4 ml-auto">
          <Button
            color="inherit"
            component={Link}
            to="/dashboard"
            className={`transition-all duration-200 ${isActive("/dashboard")} hover:bg-blue-600 hover:text-white`}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/wedding-details"
            className={`transition-all duration-200 ${isActive("/wedding-details")} hover:bg-blue-600 hover:text-white`}
          >
            Wedding List
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/guest-list"
            className={`transition-all duration-200 ${isActive("/guest-list")} hover:bg-blue-600 hover:text-white`}
          >
            Guests
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/todo-list"
            className={`transition-all duration-200 ${isActive("/todo-list")} hover:bg-blue-600 hover:text-white`}
          >
            Tasks
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={logout}
            className="hover:bg-red-600 transition-all duration-200"
          >
            Logout
          </Button>
        </div>

        {/* Icon Button visible only in mobile view */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          className="block md:hidden" // Ensure the button is visible only on small screens
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>

        {/* Mobile Menu */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} className="md:hidden">
          <MenuItem onClick={handleMenuClose}>
            <Link to="/dashboard" className={`w-full ${isActive("/dashboard")}`}>Home</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/wedding-details" className={`w-full ${isActive("/wedding-details")}`}>Wedding List</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/guest-list" className={`w-full ${isActive("/guest-list")}`}>Guests</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/todo-list" className={`w-full ${isActive("/todo-list")}`}>Tasks</Link>
          </MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); logout(); }}>
            <Button variant="contained" color="error" className="w-full hover:bg-red-600 transition-all duration-200">Logout</Button>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
