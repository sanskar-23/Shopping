import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "./../helpers/authHelper.js";

export const registerController = async () => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) return res.send({ error: "Name is Required" });
    if (!email) return res.send({ error: "Email is Required" });
    if (!password) return res.send({ error: "Password is Required" });
    if (!phone) return res.send({ error: "Phone no is Required" });
    if (!address) return res.send({ error: "Address is Required" });

    // checking user
    const existingUser = await userModel.findOne({ email });
    // existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered with this email",
      });
    }
    // register user
    const hashedPassword = await hashPassword(password);

    // saving the new registered user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};
