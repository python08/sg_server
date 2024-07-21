import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserInput {
  email: string;
  name: string;
  password: string;
  role: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;

  if (!user.isModified("password")) {
    return next();
  }

  const saltWorkFactor = parseInt(process.env.SALT_WORK_FACTOR) ;

  const salt = await bcrypt.genSalt(saltWorkFactor);

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as UserDocument;

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("users", userSchema);

export default UserModel;
