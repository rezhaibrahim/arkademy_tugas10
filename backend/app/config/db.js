const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    logging: false,

    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.js')(sequelize, Sequelize);
db.role = require('../models/role.js')(sequelize, Sequelize);
db.user_roles = require('../models/user_roles.js')(sequelize, Sequelize);
db.book = require('../models/book.js')(sequelize, Sequelize);
db.order = require('../models/order.js')(sequelize, Sequelize);
db.comment = require('../models/coment.js')(sequelize, Sequelize);

db.book.hasMany(db.comment);
db.comment.belongsTo(db.book);

db.user.hasMany(db.comment);
db.comment.belongsTo(db.user);

db.book.belongsToMany(db.user, { through: {model:'orders', unique : false}, foreignKey: 'bookId', otherKey: 'userId' });
db.user.belongsToMany(db.book, { through: {model:'orders', unique : false}, foreignKey: 'userId', otherKey: 'bookId' });

db.role.belongsToMany(db.user, { through: {model:'user_roles', unique : false}, foreignKey: 'roleId', otherKey: 'userId' });
db.user.belongsToMany(db.role, { through: {model:'user_roles', unique : false}, foreignKey: 'userId', otherKey: 'roleId' });

module.exports = db;