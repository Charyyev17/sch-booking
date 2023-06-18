import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE & VERIFY (sadece adminler otel oluşturabilirler)
router.post("/", verifyAdmin, createHotel);

//UPDATE & VERIFY (sadece adminler oteli güncelleyebilirler)
router.put("/:id", verifyAdmin, updateHotel);

//DELETE & VERIFY (sadece adminler oteli silebilirler)
router.delete("/:id", verifyAdmin, deleteHotel);

//GET (belirli id'li oteli getirir)
router.get("/find/:id", getHotel);

//GET ALL (sırasıyla: tümünü, şehire göre, tipine göre otelleri getirir)
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

//GET (belirli otelin odalarını getirir)
router.get("/room/:id", getHotelRooms);

export default router;
