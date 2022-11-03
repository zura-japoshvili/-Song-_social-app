const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');

// Update User 
router.put("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated");
    } catch (err) {
        return res.status(500).json(err);
    }
})


router.get("/profile/:userName", async (req, res) => {
    try {
        const user = await User.findOne({username: req.params.userName});
        if(user){
            res.status(200).json(user);
        }
        else{
            return res.status(404).json('User Not Found');
        }
    } catch (error) {
        res.status(500).json(error);
    }
})


router.put("/:id/follow", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if(!user.followers.includes(req.body.userId)){
            await user.updateOne( {$push: {followers: req.body.userId }});
            await currentUser.updateOne( {$push: {followings: req.params.id }} );

            res.status(200).json('User has been followed');
        }else{
            await user.updateOne({ $pull: { followers: req.body.userId } });
            await currentUser.updateOne({ $pull: { followings: req.params.id } });

            res.status(200).json('User has been unfollowed');
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;