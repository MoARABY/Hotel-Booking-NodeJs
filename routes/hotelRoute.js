const router = require('express').Router();
const {createHotel,getHotels,getHotel,updateHotel,deleteHotel,countByCity,countByType,getHotelRooms} =require('../controllers/hotelController');
const {verifyToken,verifyTokenAndAdmin}=require("../utils/verifyToken")



router.post('/',verifyToken,createHotel);
router.get('/',verifyToken,getHotels);
router.get('/:id',getHotel)
router.delete('/:id',verifyTokenAndAdmin,deleteHotel);
router.put('/:id',verifyTokenAndAdmin,updateHotel);
router.get('/count/countByCity',verifyToken,countByCity);
router.get('/count/countByType',verifyToken,countByType);
router.get('/room/:id',verifyToken,getHotelRooms);




module.exports = router;