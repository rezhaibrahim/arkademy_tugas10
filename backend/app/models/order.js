module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define('orders', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
       }
    });
    return Order;
}