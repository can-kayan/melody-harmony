const { default: mongoose } = require("mongoose");
const errorMessages = require("../messageHandling/ErrorHandling");
const rPost=async(modelName,domainInfo)=>{
    const Model =mongoose.model(modelName)
    const posts = new Model(domainInfo)
    const postsitem = posts.save();
    if(!postsitem){
        return errorMessages.anUnexpectedErrorOccurred
    }
    else return postsitem
}
module.exports={rPost}