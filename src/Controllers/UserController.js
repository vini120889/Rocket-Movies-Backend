const UserRepository = require("../repositories/UserRepository");
const UserServices = require("../services/UserServices");

/**
 * @Controller: fica responsável somente por receber a requisição, chamar o service e devolver uma resposta
 * @UserRepository: é responsável por fazer as operações no banco de dados
 * @UserServices: é responsável por fazer as regras de negócio da aplicação (criação, atualização, etc)
 */

class UserController {
    async create (request, response) {

      const { name, email, password } = request.body;

      const userRepository = new UserRepository();
      const userServices = new UserServices(userRepository);

      await userServices.createUser({ name, email, password });

      return response.status(201).json()
    }

    async update(request, response) {
        const { name, email, password, old_password } = request.body;
        const user_id = request.user.id;

        const userRepository = new UserRepository();
        const userServices = new UserServices(userRepository);

        await userServices.updateUser({ name, email, password, old_password, user_id });
      
        return response.json();
    }

}

module.exports = UserController;