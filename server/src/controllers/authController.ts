import type { Request, Response } from 'express';
import { AdminUser } from '../models/AdminUser.js';
import { logger } from '../utils/logger.js';

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  try {
    const user = await AdminUser.findOne({ email: email.toLowerCase() });
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email address or password.',
      });
      return;
    }

    if (!user.isActive) {
      res.status(403).json({
        success: false,
        message: 'Account is deactivated. Please contact an administrator.',
      });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid email address or password.',
      });
      return;
    }

    // Regenerate session to prevent session fixation
    req.session.regenerate((err) => {
      if (err) {
        logger.error('[Auth] Session regeneration error:', err);
        res.status(500).json({ success: false, message: 'Failed to establish secure session' });
        return;
      }

      req.session.userId = user._id.toString();
      req.session.userEmail = user.email;
      req.session.userRole = user.role;
      req.session.userName = user.name;

      user.lastLogin = new Date();
      user.save().catch((e) => logger.warn('[Auth] Failed to update lastLogin:', e));

      res.status(200).json({
        success: true,
        message: 'Authentication successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          lastLogin: user.lastLogin,
        },
      });
    });
  } catch (error) {
    logger.error('[Auth] Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during login.',
    });
  }
}

export async function logout(req: Request, res: Response): Promise<void> {
  req.session.destroy((err) => {
    if (err) {
      logger.error('[Auth] Logout error:', err);
      res.status(500).json({ success: false, message: 'Failed to destroy session.' });
      return;
    }

    res.clearCookie('thepapare.sid');
    res.status(200).json({
      success: true,
      message: 'Logged out successfully.',
    });
  });
}

export async function getMe(req: Request, res: Response): Promise<void> {
  if (!req.session || !req.session.userId) {
    res.status(401).json({
      success: false,
      message: 'Not authenticated',
      user: null,
    });
    return;
  }

  try {
    const user = await AdminUser.findById(req.session.userId).select('-passwordHash');
    if (!user || !user.isActive) {
      req.session.destroy(() => {});
      res.status(401).json({
        success: false,
        message: 'User no longer valid or active',
        user: null,
      });
      return;
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving current session' });
  }
}

