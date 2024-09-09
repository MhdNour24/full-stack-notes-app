import TextField from "@mui/material/TextField";

function Input({value,onchange,placeholder}) {
  return (
    <TextField
      id={placeholder}
      value={value}
      onChange={onchange}
      label={placeholder}
      variant="outlined"
      sx={{ width: "100%", marginBottom: "20px" }}
    />
  );
}

export default Input;
