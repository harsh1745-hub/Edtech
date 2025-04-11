import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide a name"],
      trim: true,
      maxlength: [100, "Name cannot be More than 100 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please Provide valid email"],
      index: true,
    },
    password: {
      type: String,
      required: [true, "Please Provide a Password"],
      minlength: [8, "Password must be 8 characters long"],
      select: false,
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

//Hash Password Before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

//Compare password Methods
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
//static methods to find user by email
UserSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};
//Midelware to log user creation
UserSchema.post("save", function (doc, next) {
  console.log(`User created with email: ${doc.email}`);
  next();
});

const User = mongoose.model("User", UserSchema);
export default User;
