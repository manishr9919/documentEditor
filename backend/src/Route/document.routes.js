const express = require("express");
const Document = require("../model/document.model");
const authMiddleware = require("../Midleware/auth");

const router = express.Router();
router.use(authMiddleware);

// CREATE
router.post("/create", async (req, res) => {
  try {
    const { title, content, visibility } = req.body;
    const newDoc = new Document({
      title,
      content,
      visibility,
      author: req.user._id,
    });
    await newDoc.save();
    console.log(newDoc);
    res.status(201).json({ message: "Document created", doc: newDoc });
  } catch (error) {
    res.status(500).json({ message: "Error creating document", error });
    console.log(error.message);
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const docs = await Document.find();
    res.json(docs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching documents", error });
  }
});

// READ SINGLE
router.get("/:id", async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json(doc);
  } catch (error) {
    res.status(500).json({ message: "Error fetching document", error });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedDoc = await Document.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDoc) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Document updated", doc: updatedDoc });
  } catch (error) {
    res.status(500).json({ message: "Error updating document", error });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deletedDoc = await Document.findByIdAndDelete(req.params.id);
    if (!deletedDoc) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Document deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting document", error });
  }
});

module.exports = router;
