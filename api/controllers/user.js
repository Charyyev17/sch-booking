import User from "../models/User.js";

//UPDATE
export const updateUser = async (req, res, next) => {
  try {
    //eşit id'li user'i bulur ve günceller
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};

//DELETE
export const deleteUser = async (req, res, next) => {
  try {
    //eşit id'li user'i bulur ve siler
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    next(error);
  }
};

//GET USER
export const getUser = async (req, res, next) => {
  try {
    //eşit id'li user'i getirir
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//GET ALL USERS
export const getUsers = async (req, res, next) => {
  try {
    //tüm user'leri getirir
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
