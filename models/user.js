const db = require('../config/config');
const bcrypt = require('bcryptjs');
const User = {};

User.findById = (id, result) => {
    /*
    const sql = `
        SELECT
            id,
            email,
            name,
            lastname,
            phone,
            image,
            password
        FROM 
            users
        WHERE
            id = ?
    `;
    */
    const sql = `
        SELECT
            CONVERT(U.id, char) as id,
            U.email,
            U.name,
            U.lastname,
            U.phone,
            U.image,
            U.password,
            json_arrayagg(
                json_object(
                    'id', CONVERT(R.id, char),
                    'name', R.name,
                    'image', R.image,
                    'route', R.route)
            ) as roles
        FROM 
            users as U
        INNER JOIN
            user_has_roles as UHR
        ON
            UHR.id_user = U.id
        INNER JOIN
            roles as R
        ON 
            UHR.id_rol = R.id
        WHERE
            U.id = ?
        group by
            U.id`;

    db.query(
        sql,
        [
            id
        ],
        (err, user)=> {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }else{
                console.log('Usuario obtenido: ', user[0]);
                result(null, user[0]);
            }
        }
    )
}


User.findByEmail = (email, result) => {
    /*
    const sql = `
        SELECT
            id,
            email,
            name,
            lastname,
            phone,
            image,
            password
        FROM 
            users
        WHERE
            email = ?
    `;
    */
    const sql = `
        SELECT
            U.id,
            U.email,
            U.name,
            U.lastname,
            U.phone,
            U.image,
            U.password,
            json_arrayagg(
                json_object(
                    'id', CONVERT(R.id, char),
                    'name', R.name,
                    'image', R.image,
                    'route', R.route)
            ) as roles
        FROM 
            users as U
        INNER JOIN
            user_has_roles as UHR
        ON
            UHR.id_user = U.id
        INNER JOIN
            roles as R
        ON 
            UHR.id_rol = R.id
        WHERE
            email = ?
        group by
            U.id`;
    

    db.query(
        sql,
        [
            email
        ],
        (err, user)=> {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }else{
                console.log('Usuario obtenido: ', user[0]);
                result(null, user[0]);
            }
        }
    )
    
}


User.create = async (user, result) => {

    const hash = await bcrypt.hash(user.password, 10);

    const sql = `
        INSERT INTO users(
            email,
            name,
            lastname,
            phone,
            image,
            password,
            created_at,
            updated_at
        )
        VALUES(?,?,?,?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            user.email,
            user.name,
            user.lastname,
            user.phone,
            user.image,
            hash,
            new Date(),
            new Date()
        ],
        (err, res)=> {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }else{
                console.log('Id del usuario creado: ', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}

User.update = (user, result) => {
    const sql = `
        UPDATE
            users
        SET 
            name = ?,
            lastname = ?,
            phone = ?,
            image = ?,
            updated_at = ?
        WHERE
            id = ?
    `;

    db.query(
        sql,
        [
            user.name,
            user.lastname,
            user.phone,
            user.image,
            new Date(),
            user.id
        ],
        (err, res)=> {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }else{
                console.log('Id del usuario actualizado: ', user.id);
                result(null, user.id);
            }
        }
    )

}

//Update no image
User.updateWithoutImage = (user, result) => {
    const sql = `
        UPDATE
            users
        SET 
            name = ?,
            lastname = ?,
            phone = ?,
            updated_at = ?
        WHERE
            id = ?
    `;

    db.query(
        sql,
        [
            user.name,
            user.lastname,
            user.phone,
            new Date(),
            user.id
        ],
        (err, res)=> {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }else{
                console.log('Id del usuario actualizado: ', user.id);
                result(null, user.id);
            }
        }
    )

}

User.findDeliveryMen = (result) => {
    const sql = `
    SELECT
        CONVERT(U.id, char) AS id,
        U.email,
        U.name,
        U.lastname,
        U.image,
        U.phone
    FROM
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id 
    INNER JOIN
        roles AS R
    ON
        R.id = UHR.id_rol
    WHERE
        R.id = 2;
    `;

    db.query(
        sql,
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, data);
            }
        }
    );
}

User.findAll = (result) => {
    const sql = `
        SELECT
            CONVERT(U.id, char) AS id,
            U.email,
            U.name,
            U.lastname,
            U.phone,
            U.image,
            U.password,
            json_arrayagg(
                json_object(
                    'id', CONVERT(R.id, char),
                    'name', R.name,
                    'image', R.image,
                    'route', R.route)
            ) AS roles
        FROM 
            users AS U
        INNER JOIN
            user_has_roles AS UHR
        ON
            UHR.id_user = U.id
        INNER JOIN
            roles AS R
        ON 
            UHR.id_rol = R.id
        GROUP BY
            U.id
    `;
    
    db.query(sql, (err, users) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
        } else {
            console.log('Usuarios obtenidos: ', users);
            result(null, users);
        }
    });
}

User.updateWithRol = (user, callback) => {
    const sql = `
        UPDATE users
        SET email = ?, name = ?, lastname = ?, phone = ?, image = ?, password = ?, updated_at = NOW()
        WHERE id = ?
    `;
    db.query(
        sql,
        [user.email, user.name, user.lastname, user.phone, user.image, user.password, user.id],
        callback
    );
};


module.exports = User;