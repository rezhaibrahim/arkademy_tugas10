const db = require("../config/db.js");
const Book = db.book;
const User = db.user;
const Comment = db.comment;
const asyncMiddleware = require("express-async-handler");

//create book
exports.addBook = asyncMiddleware(async (req, res) => {
    // Save book to Database
    const book = await Book.create({
        title: req.body.title,
        author: req.body.author,
        published_date: req.body.published_date,
        pages: req.body.pages,
        language: req.body.language,
        publisher_id: req.body.publisher_id
    });
    res.status(201).send({
        status: "Books create successfully!"
    });
});

//view all books
exports.viewBook = asyncMiddleware(async (req, res) => {
    const book = await Book.findAll({
        attributes: ["id", "title", "author", "published_date", "pages", "language", "publisher_id"]
        // include:[
        //     {
        //         model: Comment,
        //         attributes:['id','comment'],
        //         include:[
        //             {
        //                 model: User,
        //                 attributes:['id','username']
        //             }
        //         ]
        //     }
        // ]
    });
    res.status(201).send({
        status: "Buku aman bos aya kabeh",
        book: book
    });
});

//view books id
exports.viewIdBook = asyncMiddleware(async (req, res) => {
    const id_book = req.params.id
    const book = await Book.findOne(
        {
            where: {
                id: id_book
            }
            // include:[
            //     {
            //         model: Comment,
            //         attributes:['id','comment'],
            //         include:[
            //             {
            //                 model: User,
            //                 attributes:['id','username']
            //             }
            //         ]
            //     }
            // ]
        }
    )
    res.status(201).send({
        status: "Buku na kapanggih cuy",
        book: book
    });
});

//update book
exports.updateBook = asyncMiddleware(async (req, res) => {
    const id_book = req.params.id

    const {title, author, published_date, pages, language, publisher_id } = req.body;

    const book = await Book.update(
        {
            title: title,
            author: author,
            published_date: published_date,
            pages: pages,
            language: language,
            publisher_id: publisher_id
        },
        {
            where: {
                id: id_book
            }
        }
    );
    res.status(201).send({
        status: "Books has been update!"
    });
});

//delete book
exports.deleteBook = asyncMiddleware(async (req, res) => {
    const id_book = req.params.id

    const book = await Book.destroy(
        {
            where: {
                id: id_book
            }
        }
    );
    res.status(201).send({
        status: "buku sudah di hapus "
    });
});

//detail books
exports.detailBook = asyncMiddleware(async (req, res) => {
    const detail = await Book.findOne({
        where:{
            id:req.params.id
        },
        include:[
            {
                model: Comment,
                attributes:['id','comment'],
                include:[
                    {
                        model: User,
                        attributes:['id','username']
                    }
                ]
            }
        ]
    });
    res.status(201).send({
        status: "Buku aman bos aya kabeh",
        data: detail
    });
});
