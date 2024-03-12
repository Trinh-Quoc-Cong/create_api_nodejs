const {Author,Book} = require("../model/model");

const authorController = {
    // add author
    addAuthor: async(req, res) => {
       try {
        const newAuthor = new Author(req.body);
        const savedAuthor = await newAuthor.save();
        res.status(200).json(savedAuthor);
       } catch (err) {
        res.status(500).json(err);// http request code
       }
    },
    getAllAuthor: async(req,res) => {
        try {
            const authors = await Author.find();
            res.status(200).json(authors);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAnAuthor: async(req,res) => {
        try {
            const author = await Author.findById(req.params.id).populate("books");

            res.status(200).json(author);

        } catch (err) {
            res.status(500).json(err);
            
        }
    },
    updateAuthor: async (req,res) => {
        try {
            const book = await Author.findById(req.params.id);
            await book.updateOne({$set: req.body});
            res.status(200).json("update author successfully");
            
        } catch (error) {
            res.status(500).json(error);
            
        }
    },
    deleteAuthor: async(req,res) => {
        try {
            // update ở trong Book với thuộc tính là author , chuyển về null . nếu là mảng thì dùng pull để kéo ra
            await Book.updateMany({author: req.params.id}, {author:null});
            await Author.findByIdAndDelete(req.params.id);
            res.status(200).json("delete author seccessfully");
        } catch (error) {
            res.status(500).json(error);
        }

    }
}

module.exports = authorController