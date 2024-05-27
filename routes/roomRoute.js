const router = require('express').Router();
const {createRoom,showRooms,showRoom,deleteRoom,updateRoom}= require('../controllers/roomController');
const {verifyToken,verifyTokenAndAdmin}=require("../utils/verifyToken")




router.get('/',verifyToken , showRooms);
router.get('/:id', verifyToken, showRoom);
router.post('/:hotelId',verifyTokenAndAdmin , createRoom);
router.put('/:id',verifyTokenAndAdmin , updateRoom);
router.delete('/:id/:hotelId',verifyTokenAndAdmin , deleteRoom);

module.exports = router;