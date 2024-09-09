import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ModalContext } from "../context/ModalContext";
import axiosInstance from "../utils/axiosInstace";
export const addNewNote = createAsyncThunk(
  "notes/addNewNote",
  async ({ noteData, onClose ,showToastMessage}) => {
    try {
      const response = await axiosInstance.post("/api/notes", {
        title: noteData.title,
        content: noteData.content,
        tags: noteData.tags,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note Added Successfully", "add");
        const result = await axiosInstance.get("/api/notes");
        if (result.data && result.data.notes) {
          onClose(); // Close the modal after successful addition
          return { allNotes: result.data.notes, error: "" };
        }
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return { allNotes: [], error: error.response.data.message };
      }
    }
  }
);

export const editNote = createAsyncThunk(
  "notes/editNote",
  async ({ noteId, data, onClose,showToastMessage }) => {
    try {
      const response = await axiosInstance.put("/api/notes/" + noteId, {
        title: data.title,
        content: data.content,
        tags: data.tags,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note Edited Successfully", "edit");
        const result = await axiosInstance.get("/api/notes");
        if (result.data && result.data.notes) {
          onClose(); // Close the modal after successful edit
          return { allNotes: result.data.notes, error: "" };
        }
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return { allNotes: [], error: error.response.data.message };
      }
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (action) => {
    const noteId = action.data._id;
    try {
      const response = await axiosInstance.delete("/api/notes/" + noteId);
      if (response.data && !response.data.error) {
          action.showToastMessage("Note Deleted Successfully", "delete");
        try {
          const result = await axiosInstance.get("/api/notes");
          if (result.data && result.data.notes) {
            return { allNotes: result.data.notes, error: "" };
          }
        } catch (error) {
          return { allNotes: [], error: error.message };
        }
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return {
          allNotes: [],
          error: "An unexpected error occurred. Please try again",
        };
      }
    }
  }
);

export const updateIsPinned = createAsyncThunk(
    "notes/updateIsPinned",
    async (action) => {
      const noteId = action.noteData._id; // تأكد من قراءة الـ ID بشكل صحيح
      try {
        const response = await axiosInstance.patch("/api/notes/" + noteId, {
          isPinned: !action.noteData.isPinned, // تعديل هنا لتعمل مع action.noteData
        });
        if (response.data && response.data.note) {
          action.showToastMessage("Note Updated Successfully", "edit");
          try {
            const result = await axiosInstance.get("/api/notes");
            if (result.data && result.data.notes) {
              return { allNotes: result.data.notes, error: "" };
            }
          } catch (error) {
            return { allNotes: [], error: error.message };
          }
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          return {
            allNotes: [],
            error: "An unexpected error occurred. Please try again",
          };
        }
      }
    }
  );
  
export const onSearchNote = createAsyncThunk(
  "notes/onSearchNote",
  async (action) => {
    const query = action.query;
    try {
      const response = await axiosInstance.get("/api/notes/search-notes", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        return { allNotes: response.data.notes, error: "" };
      }
    } catch (error) {
      return { allNotes: [], error: error.message };
    }
  }
);
export const getAllNotes = createAsyncThunk("/notes/getAllNotes", async () => {
  try {
    const response = await axiosInstance.get("/api/notes");
    if (response.data && response.data.notes) {
      return { allNotes: response.data.notes, error: "" };
    }
  } catch (error) {
    return {
      allNotes: [],
      error: "An unexpected error occurred. Please try again",
    };
  }
});
const notesSlice = createSlice({
  name: "notes",
  initialState: {
    allNotes: [],
    error: "",
    loading: false,
  },
  extraReducers(builder) {
    builder
      .addCase(addNewNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewNote.fulfilled, (state, action) => {
        state.allNotes = action.payload.allNotes;
        state.error = action.payload.error;
        state.loading = false;
      })
      .addCase(addNewNote.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(editNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(editNote.fulfilled, (state, action) => {
        state.allNotes = action.payload.allNotes;
        state.error = action.payload.error;
        state.loading = false;
      })
      .addCase(editNote.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.allNotes = action.payload.allNotes;
        state.error = action.payload.error;
        state.loading = false;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(updateIsPinned.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateIsPinned.fulfilled, (state, action) => {
        state.allNotes = action.payload.allNotes;
        state.error = action.payload.error;
        state.loading = false;
      })
      .addCase(updateIsPinned.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(onSearchNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(onSearchNote.fulfilled, (state, action) => {
        state.allNotes = action.payload.allNotes;
        state.error = action.payload.error;
        state.loading = false;
      })
      .addCase(onSearchNote.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(getAllNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.allNotes = action.payload.allNotes;
        state.error = action.payload.error;
        state.loading = false;
      })
      .addCase(getAllNotes.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default notesSlice.reducer;
