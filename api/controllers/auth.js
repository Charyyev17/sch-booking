import User from "../models/User.js";
//hash şifreleme işlemi için kullanılır
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    //hash şifreleme işlemi
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created succesfully!");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    //önce db'den user'i arar
    const user = await User.findOne({ username: req.body.username });
    //user yoksa hata mesajı verir
    if (!user) return next(createError(404, "User not found"));

    //eğer varsa user'in şifresi ile girilen şifre karşılaştırılır
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    //eğer şifre yanlışsa hata mesajı verir
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username"));

    //doğruysa da token oluşturuluyor
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    //password ve isAdmin göndermek istemediğimiz için onları separate ediyoruz
    const { password, isAdmin, ...otherDetails } = user._doc;

    //buradaki httpOnly client'in cookie'ye erişmemesi için kullanıldı, daha güvenli oluyor
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};
