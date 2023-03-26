import { Response, Request } from 'express';
import { User } from '../models/User';

export const UserService = {
  getAllUsers : async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
   getUserById : async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json    ({ message: error.message });
  }
  },
  
   createUser : async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    // verifica se o e-mail já está cadastrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'E-mail already registered' });
    }
    // cria um novo usuário
    const newUser = new User({
      name,
      email,
      password
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  },
  
   updateUser : async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    // verifica se o usuário existe
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // atualiza os dados do usuário
    user.name = name;
    user.email = email;
    user.password = password;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  },
  
   deleteUser : async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // verifica se o usuário existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // exclui o usuário

    await user.remove();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  }
}

