const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
      minLength: 3,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 30,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(
            "Password must have: minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
          );
        }
      },
    },
    gender: {
      type: String,
      lowercase: true,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    dateOfBirth: {
      type: Date,
    },
    age: {
      type: Number,
      min: 15,
      max: 80,
    },
    skills: {
      type: [String],
    },
    profilePhoto: {
      type: String,
      default:
        "https://i.pinimg.com/736x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("invalid URL");
        }
      },
    },
    about: {
      type: String,
      default:
        "Curious learner, creative thinker, problem solver, tech enthusiast. Passionate about growth, innovation, and meaningful connections. Always open to opportunities.",
      trim: true,
    },
    achievements: {
      type: [String],
    },
    socialLinks: {
      github: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      twitterX: {
        type: String,
      },
      instagram: {
        type: String,
      },
    },
    profession: {
      type: String,
    },
    isPremium: {
      type: Boolean,
    },
    membershipType: {
      type: String,
    },
    otp: {
      type: String,
    },
    otpExpiryTime: {
      type: Date,
    },
    isVerified: {
      type: Boolean
    }
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.getPasswordHash = async function (plainPasswordFromUser) {
  const passwordHash = await bcrypt.hash(plainPasswordFromUser, 10);
  return passwordHash;
};

userSchema.methods.matchPasswordWithPasswordHash = async function (
  plainPasswordFromUser
) {
  const passwordHash = this.password;
  const isPasswordMatchedWithHash = await bcrypt.compare(
    plainPasswordFromUser,
    passwordHash
  );
  return isPasswordMatchedWithHash;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
