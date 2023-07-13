const express = require("express");
const router = express.Router();
var fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
//Route 1: Get all the notes .Login Required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.send(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Error");
  }
});

router.post(
  "/addnote",
  fetchUser,
  [
    //This is authentication performed by EXPRESS VALIDATOR
    body("title", "Enter a valid title of more then 3 character").isLength({
      min: 3,
    }),
    body("description", "Description is too short").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.send(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error");
    }
  }
);

//Update a user note ..lOGIN Required;
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newnote = {};
    if (title) {
      newnote.title = title;
    }
    if (description) {
      newnote.description = description;
    }
    if (tag) {
      newnote.tag = tag;
    }

    // this part is for safety purpose from hacker
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note Not Found");
    }

    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not Allowed"); // Save from hacking if anyone else try to update any otherv person notes
    }

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Error");
  }
});


//Delete a User....LOGIN REQUIRED
router.put("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    

    // this part is for safety purpose from hacker
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note Not Found");
    }

    if (note.user.toString() != req.user.id) {
      return res.status(401).send("Not Allowed"); // Save from hacking if anyone else try to update any otherv person notes
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note has been deleted",note:note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Error");
  }
});


module.exports = router;
