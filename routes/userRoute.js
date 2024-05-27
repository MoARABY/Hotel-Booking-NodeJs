const router=require('express').Router();

const {showUser,showUsers,updateUser,deleteUser} = require('../controllers/userController');
const {verifyToken,verifyTokenAndAdmin,verifyTokenAndAuthorized}=require("../utils/verifyToken")

router.get('/',verifyTokenAndAdmin , showUsers);
router.get('/:id',verifyTokenAndAdmin , showUser);
router.put('/:id',verifyTokenAndAuthorized , updateUser);
router.delete('/:id',verifyTokenAndAuthorized , deleteUser);


module.exports = router;