import PushPinIcon from "@mui/icons-material/PushPin";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment"
const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex  items-center justify-between">
        <div>
          <h6 className="text-sm font-medium ">{title}</h6>
          <span className="text-xs text-slate-500">{moment(date).format('Do MMM YYYY')}</span>
        </div>
        <IconButton aria-label="PushPin" onClick={onPinNote}>
          <PushPinIcon color={isPinned ? "primary" : "disabled"}></PushPinIcon>
        </IconButton>
      </div>
      <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>
      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">{tags.map((item)=>`#${item} `)}</div>
        <div className="flex items-center gap-2">
          <IconButton aria-label="PushPin" onClick={onEdit}>
            <EditIcon color="secondary"></EditIcon>
          </IconButton>
          <IconButton aria-label="PushPin" onClick={onDelete}>
            <DeleteIcon color="error"></DeleteIcon>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
