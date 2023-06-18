import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

//CREATE
export const createHotel = async (req, res, next) => {
  //yeni otel oluşturulur
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

//UPDATE
export const updateHotel = async (req, res, next) => {
  try {
    //eşit id'li oteli bulur ve günceller
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      //update işlemi gerçekleştiğinde direkt olarak güncel veriyi göstermek için
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (error) {
    next(error);
  }
};

//DELETE
export const deleteHotel = async (req, res, next) => {
  try {
    //eşit id'li oteli bulur ve siler
    const deleteHotel = await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    next(error);
  }
};

//GET HOTEL
export const getHotel = async (req, res, next) => {
  try {
    //eşit id'li oteli getirir
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

//GET ALL HOTELS
export const getHotels = async (req, res, next) => {
  //query ile gelen min ve max'ı separate ediyoruz
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      //cheapestPrice'ı da min'den büyük max'dan küçük olması gerekiyor
      cheapestPrice: { $gt: min || 0, $lt: max || 9999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

//GET ALL HOTELS BY CITY NAMES
export const countByCity = async (req, res, next) => {
  //query ile gelen şehir isimlerini split yaparak dizi oluşturuyoruz
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        //eşit şehirli kaç tane otel olduğu hesaplanılıyor
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

//GET ALL BY TYPES
export const countByType = async (req, res, next) => {
  //burada da eşit tipli kaç tane otelin olduğu hesaplanılıyor
  const hotelCount = await Hotel.countDocuments({ type: "hotel" });
  const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
  const resortCount = await Hotel.countDocuments({ type: "resort" });
  const villaCount = await Hotel.countDocuments({ type: "villa" });
  try {
    res.status(200).json([
      { type: "hotels", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
    ]);
  } catch (error) {
    next(error);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    //eşit id'li otel bulunur
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      //bulunan otelin rooms'u map'lenir ve tüm odalar döndürülür
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (error) {
    next(error);
  }
};
