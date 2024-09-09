const express = require("express");
const router = express.Router();

// middleware
const varificationToken = require("../middleware/VerificationToken");
// controllers
const notesController = require("../controllers/notes.controller");
// routes

// create a note
router.post(
  "/",
  varificationToken.authenticationToken,
  notesController.addNote
);

// edit the data of a note
router.put(
  "/:noteId",
  varificationToken.authenticationToken,
  notesController.editNote
);

// get all notes of a specific user
router.get(
  "/",
  varificationToken.authenticationToken,
  notesController.getAllNotes
);

// delete note
router.delete(
  "/:noteId",
  varificationToken.authenticationToken,
  notesController.deleteNote
);

// update the case of pinning of a note
router.patch(
  "/:noteId",
  varificationToken.authenticationToken,
  notesController.updatePin
);

// search for notes of a specific user
router.get(
  "/search-notes",
  varificationToken.authenticationToken,
  notesController.searchNotes
);

module.exports = router;
