import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function AnimationSelector({ selectedValue, onchange }) {
  return (
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="animation-select-label" sx={{zIndex:-1}}>Select Animation</InputLabel>
        <Select
          labelId="animation-select-label"
          value={selectedValue}
          label="Select Animation"
          onChange={onchange}
        >
          <MenuItem value={"pulse"}>Pulse</MenuItem>
          <MenuItem value={"slideDown"}>Slide Down</MenuItem>
          <MenuItem value={"textGlow"}>Text Glow</MenuItem>
          <MenuItem value={"rotate"}>Rotate</MenuItem>
          <MenuItem value={"fadeInOut"}>Fade In/Out</MenuItem>
          <MenuItem value={"slideIn"}>Slide In</MenuItem>
          <MenuItem value={"zoomIn"}>Zoom In</MenuItem>
          <MenuItem value={"shake"}>Shake</MenuItem>
          <MenuItem value={"multicolorBlink"}>Multicolor Blink</MenuItem>
          <MenuItem value={"bounce"}>Bounce</MenuItem>
        </Select>
      </FormControl>
  );
}

export default AnimationSelector;
