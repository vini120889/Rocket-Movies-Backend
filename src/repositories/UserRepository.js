const sqliteConnection = require("../database/sqlite");

class UserRepository {

    async findUserByEmail(email) {
        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        return user;
    }

    async findUserById(id) {
        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);

        return user;
    }

    async createUser({name, email, password}) {

        const database = await sqliteConnection();

        const userId = await database.run(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
            [name, email, password]
        );

        return { id: userId }

    }

    async updateUser({name, email, password, old_password, user_id}) {

        const database = await sqliteConnection();

        await database.run(
            `UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [name, email, password, user_id]
        );
    }
}

module.exports = UserRepository;
