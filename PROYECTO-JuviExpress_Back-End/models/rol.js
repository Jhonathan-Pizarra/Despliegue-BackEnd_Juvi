const db = require('../config/config');

const Rol = {};

Rol.create = (id_user, id_rol, result) => {
    const sql = `
        INSERT INTO user_has_roles(
            id_user,
            id_rol,
            created_at,
            updated_at
        )
        VALUES(?,?,?,?)
    `;

    db.query(
        sql,
        [
            id_user,
            id_rol,
            new Date(),
            new Date()
        ],
        (err, res)=> {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }else{
                console.log('Id - Role del usuario creado: ', res.insertId);
                result(null, res.insertId);
            }
        }
    )


};

Rol.deleteUserRoles = (userId, callback) => {
    const sql = `
        DELETE FROM user_has_roles
        WHERE id_user = ?
    `;
    db.query(sql, [userId], callback);
};

Rol.createUserRole = (userId, roleId, callback) => {
    const sql = `
        INSERT INTO user_has_roles (id_user, id_rol, created_at, updated_at)
        VALUES (?, ?, NOW(), NOW())
    `;
    db.query(sql, [userId, roleId], callback);
};


module.exports = Rol;

