const router = require("express").Router();

const authorController =  require("../controllers/authorController");



// add author
router.post("/",authorController.addAuthor);

// get all author
router.get("/", authorController.getAllAuthor);

//get an author
router.get("/:id", authorController.getAnAuthor);
router.put("/:id", authorController.updateAuthor);
router.delete("/:id", authorController.deleteAuthor);

module.exports = router; 