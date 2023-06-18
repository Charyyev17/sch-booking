import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.js";

const router = express.Router();

//CREATE & VERIFY (sadece adminler oda oluşturabilirler)
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE & VERIFY (sadece adminler odayı güncelleyebilirler)
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);

//DELETE & VERIFY (sadece adminler odayı silebilirler)
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//GET (belirli id'li odayı getirir)
router.get("/:id", getRoom);

//GET ALL (belirli otelin tüm odalarını getirir)
router.get("/", getRooms);

export default router;
