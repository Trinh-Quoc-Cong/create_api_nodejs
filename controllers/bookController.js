const { Author, Book } = require("../model/model");


const bookController = {
    // add author
    addBook: async (req, res) => {
        try {
            const newBook = new Book(req.body);
            const savedBook = await newBook.save();
            if(req.body.author) {
               
                const author = await Author.findById(req.body.author);
              
                await author.updateOne({$push: {books: savedBook._id}});
               
            }
            res.status(200).json(savedBook);
        } catch (err) {
            res.status(500).json(err);// http request code
        }
    },
    getAllBook: async (req, res) => {
        try {
            const allBooks = await Book.find();
            res.status(200).json(allBooks);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAnBook: async (req,res)=> {
        try {
            const book = await Book.findById(req.params.id).populate("author");
            res.status(200).json(book);
        } catch (err) {
            res.status(500).json(err);
            
        }
    },
    updateBook: async (req,res) => {
        try {
            const book = await Book.findById(req.params.id);
            await book.updateOne({$set: req.body});
            res.status(200).json("update successfully");
            
        } catch (error) {
            res.status(500).json(error);
            
        }
    },
    deleteBook: async (req,res) => {
        try {
            // update author sau khi lấy id của books và kéo cái id của nó ra khỏi books bằng lệnh pull( sử dụng trong mảng)
            await Author.updateMany(
                {books: req.params.id},
                {$pull: {
                    books: req.params.id
                }}
            );

            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json("delete successfully");


            
        } catch (error) {
            res.status(500).json(error)
            
        }
    }
}
   


module.exports = bookController