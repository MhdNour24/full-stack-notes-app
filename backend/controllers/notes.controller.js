const Note = require("../models/note.model");

const addNote = async (req, res, next) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;
  if (title.trim().length === 0) {
    return res.status(400).json({ error: true, message: "title is required" });
  }
  if (content.trim().length === 0) {
    return res
      .status(400)
      .json({ error: true, message: "content is required" });
  }
  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });
    await note.save();
    return res
      .status(200)
      .json({ error: false, note, message: "Note added successfully" });
  } catch (error) {
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

const editNote = async (req, res, next) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  // const {user}=req.user;
  if (!title && !content && !tags) {
    return res
      .status(400)
      .json({ error: true, message: "no changes provided" });
  }
  try {
    const note = await Note.findOne({ _id: noteId });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }
    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;
    await note.save();
    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const getAllNotes = async (req, res, next) => {
  const { user } = req.user;
  const id = user._id;
  try {
    const notes = await Note.find({ userId: id }).sort({ isPinned: -1 });
    return res.json({
      error: false,
      notes,
      message: "All notes retrieved successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const deleteNote = async (req, res, next) => {
  const noteId = req.params.noteId;
  const { user } = req.user;
  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.status(400).json({ error: true, message: "Note not found" });
    }
    await Note.deleteOne({ _id: noteId, userId: user._id });
    res.json({ error: false, note, message: "Note deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
      errorMessge: error.message,
    });
  }
};

const updatePin = async (req, res, next) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const { user } = req.user;

  try {
    const note = await Note.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not found" });
    }
    note.isPinned = isPinned || false;
    await note.save();
    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const searchNotes = async (req, res, next) => {
  const { user } = req.user;
  const { query } = req.query;
  if (query.trim().length===0) {
    return res
      .status(400)
      .json({ error: true, message: "Search query is requested" });
  }
  try {
    const matchingNotes = await Note.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
        { tags: { $regex: new RegExp(query, "i") } },
      ],
    });
    return res.json({
      error: false,
      notes:matchingNotes,
      message: "Notes matching the search query retrieved successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error",errorMessge:error.message });
  }
};

module.exports = {
  addNote,
  editNote,
  getAllNotes,
  deleteNote,
  updatePin,
  searchNotes,
};
