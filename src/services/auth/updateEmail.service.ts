import { Request, Response } from 'express';
import { User } from '../models/User';

export const updateEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findById(req.user.id);
    
    // Verifica se o usuário existe
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verifica se o novo email já está sendo usado por outro usuário
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.id !== req.user.id) {
      return res.status(400).json({ message: 'Esse email já está sendo usado por outro usuário' });
    }

    // Atualiza o email do usuário
    user.email = email;
    await user.save();

    return res.status(200).json({ message: 'Email atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao atualizar email do usuário' });
  }
};
