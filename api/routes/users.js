import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyAdmin, verifyUser, verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

/*router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("Hello user, you are logged in!");
});

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("Hello user, you are logged in and you can delete your account!");
});

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send("Hello admin, you are logged in and you can delete all accounts!");
});*/

//UPDATE & VERIFY (hem user'ler hem de adminler update user işlemini yapabilirler)
router.put("/:id", verifyUser, updateUser);

//DELETE & VERIFY (hem user'ler hem de adminler delete user işlemini yapabilirler)
router.delete("/:id",verifyUser, deleteUser);

//GET & VERIFY (hem user'ler hem de adminler get user işlemini yapabilirler)
router.get("/:id", verifyUser, getUser);

//GET ALL & VERIFY (sadece adminler get all users işlemini yapabilirler)
router.get("/", verifyAdmin, getUsers);

export default router;
