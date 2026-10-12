import type { Request, Response, NextFunction } from 'express';
import { AdminUser } from '../models/AdminUser.js';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    userEmail?: string;
    userRole?: string;
    userName?: string;
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (!req.session || !req.session.userId) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized: Session required. Please log in.',
    });
    return;
  }

  try {
    const user = await AdminUser.findById(req.session.userId).select('-passwordHash');
    if (!user || !user.isActive) {
      req.session.destroy(() => {});
      res.status(401).json({
        success: false,
        message: 'Unauthorized: Account deactivated or invalid session.',
      });
      return;
    }

    (req as any).user = user;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error during session authentication.',
    });
  }
}

export function requireRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;
    if (!user || !allowedRoles.includes(user.role)) {
      res.status(403).json({
        success: false,
        message: 'Forbidden: Insufficient privileges for this action.',
      });
      return;
    }
    next();
  };
}

