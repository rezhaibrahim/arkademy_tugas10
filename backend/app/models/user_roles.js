module.exports = (sequalize, Sequalize) => {
    const User_Roles = sequalize.define('user_roles', {
        status : {
            type: Sequalize.STRING,
            defaultValue: "unblocked"
        }
    });
    return User_Roles;
}