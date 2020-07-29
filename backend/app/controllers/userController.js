const db = require("../config/db.js");
const User = db.user;
const Role = db.role;
const RoleUser = db.user_roles;
const asyncMiddleware = require("express-async-handler");
var bcrypt = require("bcryptjs");

exports.users = asyncMiddleware(async (req, res) => {
    const user = await User.findAll({
        attributes: ["id", "name", "username", "email"],
        include: [
            {
                model: Role,
                attributes: ["id", "name"],
                through: {
                    attributes: ["userId", "roleId"]
                }
            }
        ]
    });
    res.status(200).json({
        description: "All User",
        user: user
    });
});

//get profile user id by token
exports.userId = asyncMiddleware(async (req, res) => {
    const userId = req.userId;

    const user = await User.findOne(
        {
            where: {
                id: userId
            },
        })
    if (!user) {
        res.status(404).send({
            status: "Book Show ID Not Found",
        });
    } else {
        res.status(200).send(user);
    }
});


exports.editProfile = asyncMiddleware(async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.userId
        }
    });
    if (!user) {
        return res.status(404).send({
            error: true,
            status: "User Not Found!"
        });
    }
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    console.log(passwordIsValid)
    if (!passwordIsValid) {
        return res.status(401).send({
            error: true,
            status: "Invalid Password!"
        });
    }
    const profile = await User.update(
        {
            name: req.body.name,
        },
        {
            where: {
                id: req.userId
            }
        }
    );
    res.status(200).send({
        status: "Profile has been updated",
        data: profile
    });
});


//update user id
exports.putUserRole = asyncMiddleware(async (req, res) => {
    try {
        const idUser = req.params.id
        const userRole = await RoleUser.update({
            roleId: req.body.roleId
        }, {
            where: {
                userId: idUser
            }
        })
        res.status(201).send({
            data: userRole,
            massage: "user role successfuly update"
        })
    } catch (error) {
        res.status(500).send({
            error: error,
            massage: "failed to update user role"
        })
    }
});


exports.userContent = asyncMiddleware(async (req, res) => {
    const user = await User.findOne({
        where: { id: req.userId },
        attributes: ["name", "username", "email"],
        include: [
            {
                model: Role,
                attributes: ["id", "name"],
                through: {
                    attributes: ["userId", "roleId"]
                }
            }
        ]
    });
    res.status(200).json({
        description: "User Content Page",
        user: user
    });
});

exports.adminBoard = asyncMiddleware(async (req, res) => {
    const user = await User.findOne({
        where: { id: req.userId },
        attributes: ["name", "username", "email"],
        include: [
            {
                model: Role,
                attributes: ["id", "name"],
                through: {
                    attributes: ["userId", "roleId"]
                }
            }
        ]
    });
    res.status(200).json({
        description: "Admin Board",
        user: user
    });
});

exports.managementBoard = asyncMiddleware(async (req, res) => {
    const user = await User.findOne({
        where: { id: req.userId },
        attributes: ["name", "username", "email"],
        include: [
            {
                model: Role,
                attributes: ["id", "name"],
                through: {
                    attributes: ["userId", "roleId"]
                }
            }
        ]
    });
    res.status(200).json({
        description: "Management Board",
        user: user
    });
});
