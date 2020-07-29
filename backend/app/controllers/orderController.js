const db = require("../config/db.js");
const Order = db.order;
const asyncMiddleware = require("express-async-handler");

// create orders
exports.addOrder = asyncMiddleware(async (req, res) => {
    const userId = req.body.userId;
    if (userId) {
        const order = await Order.create({
            userId: req.body.userId,
            bookId: req.body.bookId
        });
        res.status(201).send({
            status: "Order berhasil ditambahkan!"
        });
    }else{
        res.status(201).send({
            status: "Order gagal ditambah!"
        });
    }
});

//view all orders
exports.viewOrder = asyncMiddleware(async (req, res) => {
    const order = await Order.findAll({
        attributes: ["id", "bookId", "userId"]
    });
    res.status(201).send({
        status: "Order aman bos aya kabeh",
        data: order
    });
});

//view orders id
exports.viewIdUser = asyncMiddleware(async (req, res) => {
    const id_user = req.params.id
    const order = await Order.findOne(
        {
            where: {
                id: id_user
            }
        }
    )
    res.status(201).send({
        status: "Order aya euy",
        data: order
    });
});
