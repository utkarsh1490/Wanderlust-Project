const Joi = require("joi");
module.exports.listingSchema = Joi.object({
    listing : Joi.object({
        title:Joi.string().required(),
        image : Joi.string().allow("",null),
        description : Joi.string().required(),
        price : Joi.number().required().min(0),
        location : Joi.string().required(),
        country : Joi.string().required(),
    }).required()
});
module.exports.reviewSchema = Joi.object({
    reviews : Joi.object({
        rating : Joi.number().min(1).max(5).required(),
        comment : Joi.string().required()
    }).required()
});
module.exports.userSchema = Joi.object({
    user : Joi.object({
        email : Joi.string().required(),
        username : Joi.string().required(),
        password : Joi.string().required()
    }).required()
});