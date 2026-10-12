import bcrypt from 'bcryptjs';
import { connectDB, disconnectDB } from '../config/db.js';
import { env } from '../config/env.js';
import { AdminUser } from '../models/AdminUser.js';

async function resetAdmin(): Promise<void> {
  await connectDB();

  if (!mongooseConnectionIsReady()) {
    throw new Error('MongoDB is not reachable; the admin password was not changed.');
  }

  const email = env.INITIAL_ADMIN_EMAIL.toLowerCase();
  const passwordHash = await bcrypt.hash(env.INITIAL_ADMIN_PASSWORD, 12);
  const user = await AdminUser.findOneAndUpdate(
    { email },
    {
      $set: {
        name: env.INITIAL_ADMIN_NAME,
        passwordHash,
        role: 'superadmin',
        isActive: true,
      },
    },
    { new: true },
  );

  if (!user) {
    await AdminUser.create({
      name: env.INITIAL_ADMIN_NAME,
      email,
      passwordHash,
      role: 'superadmin',
      isActive: true,
    });
  }

  console.log(`[Admin] Password reset for ${email}.`);
}

function mongooseConnectionIsReady(): boolean {
  return AdminUser.db.readyState === 1;
}

resetAdmin()
  .then(() => disconnectDB())
  .catch(async (error: unknown) => {
    console.error('[Admin] Password reset failed:', error);
    await disconnectDB();
    process.exitCode = 1;
  });
