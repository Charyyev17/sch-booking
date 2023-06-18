import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

import { createError } from "../utils/error.js";

//CREATE
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      //otellerin içerisinden eşit id'li otel bulunuyor ve onun rooms'una oluşturulan room'ların id'leri ekleniyor
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

//UPDATE
export const updateRoom = async (req, res, next) => {
  try {
    //eşit id'li odayı bulur ve günceller
    const updateRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      //update işlemi gerçekleştiğinde direkt olarak güncel veriyi göstermek için
      { new: true }
    );
    res.status(200).json(updateRoom);
  } catch (error) {
    next(error);
  }
};

//UPDATE ROOM AVAILABILITY
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      { $push: { "roomNumbers.$.unavailableDates": req.body.dates } }
    );
    res.status(200).json("Room status has been updated");
  } catch (error) {
    next(error);
  }
};

//DELETE
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  //eşit id'li odayı bulur ve siler
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      //otellerin içerisinden de çıkarır
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Room has been deleted");
  } catch (error) {
    next(error);
  }
};

//GET ROOM
export const getRoom = async (req, res, next) => {
  try {
    //eşit id'li odayı getirir
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

//GET ALL ROOMS
export const getRooms = async (req, res, next) => {
  try {
    //tüm odaları getirir
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
