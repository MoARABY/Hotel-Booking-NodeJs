const hotelModel=require('../models/hotelModel');
const roomModel=require("../models/roomModel")

const createHotel=async(req,res)=>{
    try {
        const newHotel = await hotelModel.create(req.body);
        newHotel?res.status(201).json({newHotel}):res.status(400).json({error:"hotel not created"});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

const getHotels=async(req,res)=>{
    try {
        const featured= req.query.featured
        const rating= req.query.rating
        if(featured){
            const hotels=await hotelModel.find({featured:true}).sort({createdAt:-1});
            return res.status(200).json({hotels})
        }
        if(rating){
            const hotels=await hotelModel.find({rating:{$gte:rating}}).sort({createdAt:-1});
            return res.status(200).json({hotels})
        }
        // const hotels=await hotelModel.find(req.query).limit(req.query.limit).sort({createdAt:-1});
        const hotels=await hotelModel.find()
        hotels?res.status(200).json({hotels}):res.status(404).json({error:"hotels not found"});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

const getHotel=async(req,res)=>{
    try {
        const findHotel=await hotelModel.findById(req.params.id);
        findHotel?res.status(200).json({findHotel}):res.status(404).json({error:"hotel not found"});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

const updateHotel=async(req,res)=>{
    try {
        const findHotel=await hotelModel.findById(req.params.id);
        if(findHotel){
            const updateHotel = await hotelModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
            updateHotel?res.status(200).json({updateHotel}):res.status(400).json({error:"hotel not updated"});
        } else {
            return res.status(404).json({error:"hotel not found"});
        }
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

const deleteHotel=async(req,res)=>{
    try {
        const findHotel=await hotelModel.findById(req.params.id);
        if(findHotel){
           const deleteHotel= await hotelModel.findByIdAndDelete(req.params.id);
            deleteHotel?res.status(200).json({deleteHotel}):res.status(400).json({error:"hotel not deleted"});
        } else {
            return res.status(404).json({error:"hotel not found"});
        }
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

const countByCity=async (req,res)=>{
    try {
        const cities=req.query.cities.split(",")
        const list = await Promise.all(cities.map((city)=>{
            return hotelModel.countDocuments({city:city})
        }))
        res.status(200).json(list)
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

const countByType= async (req,res)=>{
    try {
        // const types = req.query.types.split(",")
        // const list = await Promise.all(types.map((type)=>{
        //     return hotelModel.countDocuments({type:type})
        // }))
        // res.status(200).json(list)
        const hotelCount = await hotelModel.countDocuments({ type: "hotel" });
        const apartmentCount = await hotelModel.countDocuments({ type: "apartment" });
        const resortCount = await hotelModel.countDocuments({ type: "resort" });
        const villaCount = await hotelModel.countDocuments({ type: "villa" });
        const cabinCount = await hotelModel.countDocuments({ type: "cabin" });

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartments", count: apartmentCount },
            { type: "resorts", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount },
        ]);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

const getHotelRooms = async (req, res, next) => {
    const hotel=await hotelModel.findById(req.params.id)
    const rooms= await Promise.all(hotel.rooms.map((room)=>{
        return roomModel.findById(room)
    }))
    res.status(200).json(rooms)
}

module.exports={createHotel,getHotels,getHotel,updateHotel,deleteHotel,countByCity,countByType,getHotelRooms}