module.exports = (sequelize, Sequelize) => {
    const Comments = sequelize.define('comment', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment: {
            type: Sequelize.STRING
        }
    });
    return Comments;
}