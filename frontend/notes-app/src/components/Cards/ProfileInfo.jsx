import Button from "@mui/material/Button";
import { getInitials } from "../../utils/helper";
function ProfileInfo({userInfo,onLogout}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 grid place-items-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials(userInfo?.fullName)}
      </div>
      <Button variant="text" sx={{ textTransform: "none",color:"white" }} onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
}

export default ProfileInfo;
