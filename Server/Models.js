let {app,mongodb,profsche,prodsche, total} = require("./Mongo");

let profile = mongodb.model("profile",profsche);

let product = mongodb.model("products",prodsche);

let tota = mongodb.model("dollar",total);


module.exports={profile,product,tota};
