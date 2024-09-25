import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TagInput from "../../components/Input/TagInput";
import { useState, useContext } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContext } from "../../context/ToastContext";
import { ModalContext } from "../../context/ModalContext";
// redux import 
import {useDispatch} from "react-redux"
import { addNewNote,editNote } from "../../features/NoteSlices";

const AddEditNotes = ({ noteData, type }) => {
  const dispatch=useDispatch()

  const {onClose } =
    useContext(ModalContext);
  const { handleCloseToast, showToastMessage } = useContext(ToastContext);
  const [data, setData] = useState({
    title: noteData?.title || "",
    content: noteData?.content || "",
  });
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  // add new note
  const addNewNoteFunc = () => {
    dispatch(addNewNote({ noteData: { title: data.title, content: data.content, tags: tags }, onClose,showToastMessage }));
  };

  // Edit note
  const editNoteFunc = () => {
    const noteId = noteData._id;
    dispatch(editNote({ noteId, data: { title: data.title, content: data.content, tags: tags }, onClose,showToastMessage }));
  };

  const handleAddNote = () => {
    if (!data.title) {
      setError("Please provide a title");
      return;
    }
    if (!data.content) {
      setError("Please provide content");
      return;
    }
    setError("");
    if (type === "edit") {
      editNoteFunc();
    } else if (type === "add") {
      addNewNoteFunc();
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <IconButton
        sx={{ position: "absolute", top: -10, right: -10 }}
        aria-label="closeAddEditNotes"
        color="black"
        onClick={() => {
          onClose();
        }}
      >
        <CloseIcon fontSize="small" color="primary"></CloseIcon>
      </IconButton>
      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <TextField
          fullWidth
          hiddenLabel
          label="Title"
          id="Title"
          value={data.title}
          onChange={({ target }) => {
            setData({ ...data, title: target.value });
          }}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">Content</label>
        <Textarea
          placeholder="Content"
          minRows={7}
          maxRows={10}
          sx={{ width: "100%" }}
          value={data.content}
          onChange={({ target }) => {
            setData({ ...data, content: target.value });
          }}
        />
      </div>
      <div className="mt-3">
        <label className="input-label">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
      <Button
        sx={{ marginTop: "25px" }}
        variant="contained"
        endIcon={<AddIcon />}
        fullWidth
        onClick={handleAddNote}
      >
        {type}
      </Button>
    </div>
  );
};

export default AddEditNotes;
