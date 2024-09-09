import { Container } from "@mui/material";
import NoteCard from "../../components/Cards/NoteCard";
import AddIcon from "@mui/icons-material/Add";
import AddEditNotes from "./AddEditNotes";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstace";
import NavBar from "../../components/NavBar/NavBar";
import UserBanner from "../../components/Input/UserBanner";
import { animations } from "../../utils/animations";
import AnimationSelector from "../../components/Selectors/AnimationSelector";
import EmptyCard from "../../components/Cards/EmptyCard";
import addNoteImg from "../../assets/images/add_note.png";
import ShowOrNot from "../../utils/showOrNot";
import { useContext } from "react";
import CircularProgress from "../../components/Progresses/CircularProgress"
import { ToastContext } from "../../context/ToastContext";
import { ModalContext } from "../../context/ModalContext";
// redux import
import { useSelector, useDispatch } from "react-redux";
import {
  deleteNote,
  onSearchNote,
  updateIsPinned,
  getAllNotes,
} from "../../features/NoteSlices";

function Home() {
  const dispatch = useDispatch();
  const isLoading=useSelector((state)=>{
    return state.notes.loading
  })
  const allNotes=useSelector((state)=>{
    return state.notes.allNotes
  })
  const {  setOpenAddEditNotes } = useContext(ModalContext);
  const [isSearch, setIsSearch] = useState(false);
  const [selectedAnimation, setSelectedAnimation] = useState("pulse");
  const { handleCloseToast, showToastMessage } = useContext(ToastContext);

  const handleAnimationChange = (event) => {
    setSelectedAnimation(event.target.value);
  };

  const handleEdit = (noteDetails) => {
    setOpenAddEditNotes({ isshown: true, data: noteDetails, type: "edit" });
  };

  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/users");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  //  delete note
  const deleteNoteFunc =  (data) => {
    dispatch(deleteNote({ data: data,showToastMessage }));
  };
  const onSearchNoteFunc = (query) => {
    dispatch(onSearchNote({ query: query }));
  };
  const handleClearSearch = () => {
    setIsSearch(false);
    dispatch(getAllNotes());
  };
  useEffect(() => {
    console.log("useEffect called");
    dispatch(getAllNotes());
    getUserInfo();
  }, []);

  const updateIsPinnedFunc =  (noteData) => {
    dispatch(updateIsPinned({ noteData ,showToastMessage}));
  };
  return (
    <>
      <NavBar
        userInfo={userInfo}
        onSearchNote={onSearchNoteFunc}
        handleClearSearch={handleClearSearch}
      ></NavBar>
      <ShowOrNot data={allNotes}>
        <UserBanner
          fullName={userInfo?.fullName}
          selectedAnimation={selectedAnimation}
        />
      </ShowOrNot>

      {/* استخدام المكون الجديد */}
      <Container maxWidth={false} sx={{ width: "80%", marginTop: "5vh" }}>
        <ShowOrNot data={allNotes}>
          <AnimationSelector
            selectedValue={selectedAnimation}
            onchange={handleAnimationChange}
          ></AnimationSelector>
        </ShowOrNot>
        {allNotes?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {allNotes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={note.createdOn}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => handleEdit(note)}
                onDelete={() => deleteNoteFunc(note)}
                onPinNote={() => {
                  updateIsPinnedFunc(note);
                }}
              ></NoteCard>
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={addNoteImg}
            message={`Start creating your first note! Click the "add" button to jot down your thoughts`}
          ></EmptyCard>
        )}
      </Container>
      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 fixed right-10 bottom-10"
        onClick={() => {
          setOpenAddEditNotes({
            isshown: true,
            type: "add",
            data: null,
          });
        }}
      >
        <AddIcon sx={{ color: "white", fontSize: "35px" }}></AddIcon>
      </button>

      {/* Apply Selected Animation */}
      <style>{animations[selectedAnimation]}</style>
    </>
  );
}

export default Home;
