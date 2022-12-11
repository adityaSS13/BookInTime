const Theater = require("../Models/Theater");
const Movie = require("../Models/Movies");

const getTheatersinfo = (async (req,res)=>{
    try{
        const theaterobject = await Theater.findById(req.userid);
        res.status(200).send({theaterobject});

    }catch(err){
        console.log(err);
        return res.status(400).send('Server Error!');
    }
});


module.exports = {
    getTheatersinfo
}