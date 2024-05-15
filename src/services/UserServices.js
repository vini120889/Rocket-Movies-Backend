const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");

class UserServices {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async createUser({ name, email, password }) {
        const checkUserExists = await this.userRepository.findUserByEmail(email);

        if(checkUserExists) {
            throw new AppError("Esse e-mail já está em uso!")
        }

        const hashedPassword = await hash(password, 8)

        const createdUser = await this.userRepository.createUser({name, email, password: hashedPassword});

        return createdUser;
    }

    async updateUser({ name, email, password, old_password, user_id }) {
        const user = await this.userRepository.findUserById(user_id);

        if(!user) {
            throw new AppError("Usuário não encontrado")
        };

        const userWithUpdatedEmail = await this.userRepository.findUserByEmail(email);
        
        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("Este e-mail já está em uso!")
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if(password && !old_password) {
            throw new AppError("Você precisa informar a senha antiga para realizar a atualização da senha");
        }

        if(password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);

            if(!checkOldPassword) {
                throw new AppError("A senha antiga não confere");
            }

            user.password = await hash(password, 8)
        }

        const updatedUser = await this.userRepository.updateUser({
            name: user.name,
            email: user.email,
            password: user.password,
            user_id
        });

        return updatedUser;
        
    }
}

module.exports = UserServices;