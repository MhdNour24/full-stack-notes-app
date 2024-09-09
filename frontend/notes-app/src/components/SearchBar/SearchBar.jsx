import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ClearIcon from '@mui/icons-material/Clear';  
function SearchBar({ value, onchange, handleSearch, onClearSearch }) {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 text-black rounded-lg">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onchange}
      />

      {value && (<IconButton aria-label="delete" onClick={onClearSearch}>
        <ClearIcon color="error"></ClearIcon>
      </IconButton >)}
      <IconButton aria-label="search" onClick={()=>{handleSearch()}}>
        <SearchIcon  color="primary"></SearchIcon>
      </IconButton>
    </div>
  );
}

export default SearchBar;
