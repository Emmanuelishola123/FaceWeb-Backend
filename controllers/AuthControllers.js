const Users = require("../models/Users");
const sendResponse = require("../utils/response");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthControllers {
  static async register(req, res) {
    const { email, password, name, user_id } = req.body;

    try {
      const user = await Users.findOne({ email });

      if (user) {
        return sendResponse(
          req,
          res,
          403,
          true,
          false,
          "User already exist, login with your details"
        );
      }

      const salt = bcrypt.genSaltSync(10);
      const _password = bcrypt.hashSync(password, salt);

      const new_user = await Users.create({
        name,
        user_id,
        email,
        password: _password,
      });

      delete new_user._doc.password;
      delete new_user._doc.__v;

      const token = jwt.sign(new_user._doc, process.env.JWT_SECRET);

      //    await sendEmailService({
      //     to: email,
      //     data: {
      //       name: email,
      //       link: `${Secrets.WEB_PRODUCTION_URL}/create_account/${newResetToken}`,
      //     },
      //     path: "signup",
      //     subject: `You are invited to Mamamoni as a ${role}`,
      //   });

      return sendResponse(
        req,
        res,
        201,
        false,
        token,
        "User account created successfully."
      );
    } catch (error) {
      console.log(error);
      return sendResponse(req, res, 501, true, false, error.message);
    }
  }

  static async login(req, res) {
    const { email, user_id, password } = req.body;

    try {
      let user = await Users.findOne({ email });
      if (!user) {
        user = await Users.findOne({ user_id });
      }
      if (!user){
        return sendResponse(req, res, 403, true, false, 'User does not exist')
      }

      const comparePassword = bcrypt.compareSync(password, user._doc.password);

      if(!comparePassword) return sendResponse(req, res, 403, true, false, 'Incorrect password')

      delete user._doc.password;
      delete user._doc.__v;

      const token = jwt.sign(user._doc, process.env.JWT_SECRET);

      //    await sendEmailService({
      //     to: email,
      //     data: {
      //       name: email,
      //       link: `${Secrets.WEB_PRODUCTION_URL}/create_account/${newResetToken}`,
      //     },
      //     path: "signup",
      //     subject: `You are invited to Mamamoni as a ${role}`,
      //   });

      return sendResponse(
        req,
        res,
        200,
        false,
        token,
        "Logging successfully"
      );

    } catch (error) {
      console.error(error);
      return sendResponse(req, res, 501, true, false, error.message);
    }
  }
}

module.exports = AuthControllers;
