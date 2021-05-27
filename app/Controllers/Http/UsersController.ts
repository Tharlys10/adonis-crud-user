import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

interface IRequest {
  name: string;
  username: string;
  email: string;
}

export default class UsersController {
  public async create({ request }: HttpContextContract) {
    const { name, username, email }: IRequest = request.only(["name", "username", "email"]);

    const checkUserAlreadyExists = await User.findBy('username', username);

    if (checkUserAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      username,
      email
    });

    return user;
  }

  public async all() {
    return await User.all();
  }

  public async index({ request }: HttpContextContract) {
    const { id } = request.params();

    const user = await User.find(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  public async delete({ request }: HttpContextContract) {
    const { id } = request.params();

    const user = await User.find(id);

    if (!user) {
      throw new Error("User not found");
    }

    await user.delete();

    return true;
  }
}
