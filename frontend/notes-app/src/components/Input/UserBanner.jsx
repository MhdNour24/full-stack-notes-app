// src/components/UserBanner.js
import { Box, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const UserBanner = ({ fullName, selectedAnimation }) => {
  const splitFullName = (fullName, size) => {
    const splitedName = fullName.split(" ");
    
    if (splitedName.length > size) {
      return splitedName.slice(0, size).join(" ");
    }

    return fullName;
  }
  
  return (
    fullName && (
      <Box
        sx={{
          backgroundColor: "#e0f7fa",
          padding: "15px 0",
          textAlign: "center",
          color: "#004d40",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
          animation: `${selectedAnimation} 2s infinite`,
        }}
      >
        <AccountCircleIcon sx={{ fontSize: "35px", verticalAlign: "middle", marginRight: "10px", color: "#004d40" }} />
        <Typography
          variant="h6"
          sx={{
            display: "inline-block",
            animation: `${selectedAnimation} 2s infinite`,
            textTransform: "uppercase",
          }}
        >
          {splitFullName(fullName,3)}
        </Typography>
      </Box>
    )
  );
};

export default UserBanner;
