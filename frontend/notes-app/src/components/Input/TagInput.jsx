import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const addNewTag = () => {
    if(inputValue.trim() !==""){
      setTags([...tags,inputValue.trim()])
      setInputValue("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      addNewTag();
    }
  };
  const handleRemoveTag=(tagToRemove)=>{
    setTags(tags.filter((tag)=> tag!==tagToRemove))
  }
  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((oneTag, index) => (
            <span key={index} style={{marginRight:"2px"}} className="text-base bg-slate-200 px-3 py-1 rounded-md">
              # {oneTag}
              <IconButton  aria-label="closeicons" onClick={() => {handleRemoveTag(oneTag)}}>
                <CloseIcon fontSize="small" color="primary"></CloseIcon>
              </IconButton>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-3">
        <Grid container spacing={2}>
          <Grid item xs={6} md={10}>
            <TextField
              onKeyDown={handleKeyDown}
              fullWidth
              value={inputValue}
              id="addTag"
              label="addTag"
              variant="outlined"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} md={2} sx={{ margin: "auto" }}>
            <IconButton
              aria-label=""
              onClick={() => {
                addNewTag();
              }}
            >
              <AddIcon color="primary"></AddIcon>
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default TagInput;
