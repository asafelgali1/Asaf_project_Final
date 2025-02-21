const Toy = require("../models/toysModel");

//  שליפת כל הצעצועים
const getAllToys = async (req, res) => {
  try {
    const toys = await Toy.find();
    res.json(toys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  חיפוש צעצועים לפי שם או מידע
const searchToys = async (req, res) => {
  try {
    const search = req.query.s || "";
    const toys = await Toy.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { info: { $regex: search, $options: "i" } }
      ]
    });
    res.json(toys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  שליפת צעצועים לפי קטגוריה
const getToysByCategory = async (req, res) => {
  try {
    const { catname } = req.params;
    const toys = await Toy.find({ category: catname });
    res.json(toys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  שליפת צעצועים בטווח מחירים
const getToysByPriceRange = async (req, res) => {
  try {
    const min = parseFloat(req.query.min) || 0;
    const max = parseFloat(req.query.max) || Infinity;
    const toys = await Toy.find({ price: { $gte: min, $lte: max } });
    res.json(toys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  שליפת צעצוע יחיד לפי ID
const getSingleToy = async (req, res) => {
  try {
    const toy = await Toy.findById(req.params.id);
    if (!toy) return res.status(404).json({ message: "Toy not found" });
    res.json(toy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  ספירת כמות הצעצועים
const getToysCount = async (req, res) => {
  try {
    const count = await Toy.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  יצירת צעצוע חדש
const createToy = async (req, res) => {
  try {
    const toy = new Toy(req.body);
    await toy.save();
    res.status(201).json(toy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//  עדכון צעצוע לפי ID
const updateToy = async (req, res) => {
  try {
    const toy = await Toy.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!toy) return res.status(404).json({ message: "Toy not found" });
    res.json(toy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//  מחיקת צעצוע לפי ID
const deleteToy = async (req, res) => {
  try {
    const toy = await Toy.findByIdAndDelete(req.params.id);
    if (!toy) return res.status(404).json({ message: "Toy not found" });
    res.json({ message: "Toy deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  ייצוא כל הפונקציות
module.exports = {
  getAllToys,
  searchToys,
  getToysByCategory,
  getToysByPriceRange,
  getSingleToy,
  getToysCount,
  createToy,
  updateToy,
  deleteToy
};
