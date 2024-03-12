const router = require("express").Router();

const bookController = require("../controllers/bookController");



// add author
router.post("/", bookController.addBook);

// get all author
router.get("/", bookController.getAllBook);
router.get("/:id", bookController.getAnBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router; 