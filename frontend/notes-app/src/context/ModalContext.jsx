import { createContext, useState } from "react";
import Modal from "react-modal";
import AddEditNotes from "../pages/Home/AddEditNotes";
import axiosInstance from "../utils/axiosInstace";

export const ModalContext = createContext({});

export const ModalProvider = ({ children }) => {
  const [openAddEditNotes, setOpenAddEditNotes] = useState({
    isshown: false,
    type: "add",
    data: null,
  });

  const onClose = () => {
    setOpenAddEditNotes({
      isshown: false,
      type: "add", // أو اجعلها حسب الحاجة إذا كانت هناك حالة محددة
      data: null,
    });
  };


  return (
    <ModalContext.Provider
      value={{
        onClose,
        setOpenAddEditNotes
      }}
    >
      <Modal
        isOpen={openAddEditNotes.isshown}
        onRequestClose={() => onClose()}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className=" max-h-3/4 w-[85%] sm:w-[70%] md:w-[60%] lg:w-[50%] bg-white rounded-md mx-auto mt-20 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditNotes.type}
          noteData={openAddEditNotes.data}
        />
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};
