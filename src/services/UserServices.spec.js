const UserServices = require("./UserServices");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("User Service", () => {
    let userRepositoryInMemory = null;
    let userServices = null;

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory();
        userServices = new UserServices(userRepositoryInMemory);
    });
    
    it("create user", async () => {
        const user ={
           name: "User test",
           email: "test@test.com",
           password: "123" 
        }
    
        const userCreated = await userServices.createUser(user);
    
        expect(userCreated).toHaveProperty("id");
    });

    it("create user with email already exists", async () => {
        const user1 = {
            name: "User test 1",
            email: "test@test.com",
            password: "123" 
        }

        const user2 = {
            name: "User test 2",
            email: "test@test.com",
            password: "123" 
        }

        await userServices.createUser(user1);
        await expect(userServices.createUser(user2)).rejects.toEqual(new AppError("Esse e-mail já está em uso!"));
    });

    it("Update user", async () => {
        const user = {
            name: "User test",
            email: "test@test.com",
            password: "123"
        }

        const updatedUser = {
            name: "User test updated",
            email: "updated@updated.com"
        }

        const userCreated = await userServices.createUser(user);
        const userUpdated = await userServices.updateUser(userCreated.id, updatedUser);
        

        expect(userUpdated).toHaveProperty("user_id");

    });

});
