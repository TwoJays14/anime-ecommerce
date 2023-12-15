import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';

const userCredentialsSchema = new Schema({
  username: {
    type: String,
    unique: [true, 'Username already exists'],
    required: [true, 'Username is required'],
  },
  password: {
    type: String,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/,
      'Password must be 8-20 characters long, include uppercase and lowercase letters, numbers, and special characters',
    ],
  },
});

userCredentialsSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const SALT_ROUNDS = process.env.BCRYPT_SALT as string;
    console.log('SALT_ROUNDS: ', SALT_ROUNDS);

    // Check if SALT_ROUNDS is a valid number
    const saltRounds = parseInt(SALT_ROUNDS, 10);

    if (isNaN(saltRounds)) {
      throw new Error('Invalid BCRYPT_SALT value. It must be a number.');
    }

    if (typeof this.password === 'string') {
      try {
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword;
        next();
      } catch (err) {
        console.log(err);
      }
    } else {
      next(new Error('Password is not a valid string.'));
    }
  } else {
    next();
  }
});

const credentialsUser =
  models.credentialsUser || model('credentialsUser', userCredentialsSchema); // checks if model exists before creating it to avoid OverwriteModelError

export default credentialsUser;
