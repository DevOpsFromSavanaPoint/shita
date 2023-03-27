import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { ResetPasswordToken } from '../models/resetPasswordToken';
import { sendPasswordResetEmail } from '../utils/email';

const resetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Create reset token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    const resetToken = await ResetPasswordToken.create({ userId: user._id, token });

    // Send password reset email
    await sendPasswordResetEmail(user.email, token);

    res.status(200).json({ message: 'Um e-mail foi enviado com instruções para redefinir sua senha.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

const resetPasswordConfirm = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    // Check if token is valid
    const resetToken = await ResetPasswordToken.findOne({ token });
    if (!resetToken) {
      return res.status(400).json({ error: 'Token inválido.' });
    }

    // Check if token has expired
    if (resetToken.createdAt < new Date(Date.now() - 3600000)) {
      await ResetPasswordToken.deleteOne({ _id: resetToken._id });
      return res.status(400).json({ error: 'O token expirou.' });
    }

    // Update user's password
    const user = await User.findById(resetToken.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // Delete reset token
    await ResetPasswordToken.deleteOne({ _id: resetToken._id });

    res.status(200).json({ message: 'Sua senha foi redefinida com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

export { resetPassword, resetPasswordConfirm };
