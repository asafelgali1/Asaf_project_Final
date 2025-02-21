const express = require("express");
const router = express.Router();
const toyController = require("../controllers/toyController");
const auth = require("../middlewares/auth");

router.get("/", toyController.getAllToys);
router.get("/search", toyController.searchToys);
router.get("/category/:catname", toyController.getToysByCategory);
router.get("/prices", toyController.getToysByPriceRange);
router.get("/single/:id", toyController.getSingleToy);
router.get("/count", toyController.getToysCount);

//  הוספת `auth` רק לפעולות רגישות
router.post("/", auth, toyController.createToy);
router.put("/:id", auth, toyController.updateToy);
router.delete("/:id", auth, toyController.deleteToy);

module.exports = router;
