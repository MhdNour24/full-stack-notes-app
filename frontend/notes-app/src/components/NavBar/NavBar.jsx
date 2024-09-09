// material ui components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// react router dom
import { useNavigate } from "react-router-dom";
// components
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";

function NavBar({userInfo,onSearchNote,handleClearSearch,disabledPage}) {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleSearch = () => {
    if(searchQuery) {
      onSearchNote(searchQuery)
    }
  };
  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch()
  };



  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="relative">
        <Toolbar>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            <Typography variant="h6" component="div">
              Notes
            </Typography>
            {!disabledPage ? (<SearchBar
              value={searchQuery}
              onchange={({ target }) => {
                setSearchQuery(target.value);
              }}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
            ></SearchBar>):<></>}
            {!disabledPage ? (<ProfileInfo userInfo={userInfo} onLogout={onLogout}></ProfileInfo>):null}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
