"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Avatar, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setUserIsLoggedIn } from "@/Redux/slices/authSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { RootState } from "@/Redux/store";
export default function Navbar() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { push } = useRouter();
  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(setUserIsLoggedIn(false));
    push("/login");
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background:
            "linear-gradient(90deg, rgba(95, 42, 155, 0.72) 0%, rgba(175, 87, 199, 1) 50%, rgba(237, 83, 224, 1) 100%)",
          paddingY: "8px",
          paddingX: "22px",
        }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            component="h1"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            <Link href={"/"} underline="none" color="white">
              Connect
            </Link>
          </Typography>
          {isLoggedIn && (
            <div>
              <Avatar
                aria-label="account of current user"
                onClick={handleMenu}
                variant="circular"
                sx={{
                  bgcolor: "#8E24AA",
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "#6A1B9A",
                  },
                }}
              ></Avatar>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{ marginTop: 5.5, marginRight: 4 }}
              >
                <MenuItem onClick={handleClose} sx={{ paddingRight: 8 }}>
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose(), handleLogout();
                  }}
                  sx={{ paddingRight: 8 }}
                >
                  Log out
                </MenuItem>
              </Menu>
            </div>
          )}
          {!isLoggedIn && (
            <div>
              <Link
                underline="none"
                color="white"
                margin={1}
                fontSize={20}
                href={"/register"}
              >
                Register
              </Link>
              <Link
                underline="none"
                color="white"
                margin={1}
                fontSize={20}
                href={"/login"}
              >
                Login
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
