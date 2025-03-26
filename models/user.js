const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      default: "/public/images/defaultProfileImage.png",
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();

  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashPassword;

  next();
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error("invalid email");
  if (!password) throw new Error("Password is required");

  const salt = user.salt;
  const hashPassword = user.password;

  const userProvideHash = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (userProvideHash !== hashPassword) throw new Error("Password not match");

  return { ...user, password: undefined };
});

module.exports = model("User", userSchema);
