const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    infolog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Infolog',
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:false
    },
    bio:{
        type:String,
        required:false
    },
    tag:{
        type:[String],
    },
    image:{
        type:String,
        default:'../image/profiles/profileImage.jpg'
    },
    friends:{
        type:[String]
    },
    ip:{
        type:[String],
        default:req.ip
    },
    rank:{
        type:Number,
        default:0
    },
    usage:{
        type:Number,
        default:0
    }

},{timestamps:true})
exports.User=mongoose.model('User',userSchema)