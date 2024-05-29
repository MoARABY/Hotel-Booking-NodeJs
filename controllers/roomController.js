const roomModel=require("../models/roomModel")
const hotelModel=require("../models/hotelModel")




const createRoom= async(req,res)=>{
    try {
        const hotelId=req.params.hotelId
        const newRoom=await roomModel.create(req.body)
        if(!newRoom){return res.status(400).json("cannot create room")}
        const updateHotel=await hotelModel.findByIdAndUpdate(hotelId,{$push:{rooms:newRoom._id}})
        updateHotel ? res.status(201).json({msg:"room Created Successully",room:newRoom}) : res.status(400).json("cannot Create room")
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const showRooms= async(req,res)=>{
    try {
        const rooms=await roomModel.find().sort({ createdAt: -1 }).limit(10);
        rooms ? res.status(200).json(rooms) : res.status(400).send("rooms cannot find")
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const showRoom = async(req,res)=>{
    try {
        res.status(200).send("room created")
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const updateRoom = async(req,res)=>{
    try {
        const updateRoom=await roomModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        updateRoom ?res.status(200).json(updateRoom):res.status(400).json("cannot update")
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const updateRoomAvailability = async (req, res) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (error) {
    res.status(500).json({error:error.message})
  }
};


const deleteRoom = async(req,res)=>{
    try {
        const hotelId=req.params.hotelId
        const deleteRoom=await roomModel.findByIdAndDelete(req.params.id)
        const updateHotel=await hotelModel.findByIdAndUpdate(hotelId,{$pull :{rooms:req.params.id}})
        deleteRoom ? res.status(200).send("room deleted") : res.status(200).send("cannot delete")
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


module.exports={createRoom,showRooms,showRoom,deleteRoom,updateRoom,updateRoomAvailability}