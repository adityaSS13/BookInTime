const mongoose = require('mongoose');
const connectDB = require("../dbconnect");
const Booking = require("../Models/Bookings");

try{
    connectDB();
    var conn = mongoose.connection;
    

    // const booking = new Booking();

    // get the current week
    const now = new Date();
    const onejan = new Date(now.getFullYear(), 0, 1);
    const weeknum = Math.ceil((((now.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
    

    let booking = new Booking();
    booking.user_id = "ABCDE";
    booking.fname = "Indiana";
    booking.lname = "Jones";
    booking.usertype= "customer";
    booking.email="example_account@gmail.com";
    booking.theater_id ="1234";
    booking.theater_name ="AMC 12";
    booking.movie_id = "4321";
    booking.movie_name = "Raiders of the Lost Ark";
    booking.price = 24;
    booking.seats = 2;
    booking.transactionId= 142515;
    booking.reservation_date= "2022-12-25";
    booking.reservation_time= "1:00";
    booking.seatIDs= ["A24", "A25"].toString();
    booking.booking_year= "2022";
    booking.booking_month= "12";
    booking.booking_day= "25";
    booking.booking_week= "51";
    booking.paymentSuccess=true;

    // save the record to the database regardless of the paymentSuccess status
    booking.save();
    console.log('booking 1 saved')

    let booking2 = new Booking();
    booking2.user_id = "ABCDE";
    booking2.fname = "Indiana";
    booking2.lname = "Jones";
    booking2.usertype= "customer";
    booking2.email="example_account@gmail.com";
    booking2.theater_id ="1234";
    booking2.theater_name ="AMC 12";
    booking2.movie_id = "832495";
    booking2.movie_name = "Akira";
    booking2.price = 30;
    booking2.seats = 3;
    booking2.transactionId= 87134;
    booking2.reservation_date= "2022-04-05";
    booking2.reservation_time= "10:00";
    booking2.seatIDs= ["J4", "J5", "J6"].toString();
    booking2.booking_year= "2022";
    booking2.booking_month= "04";
    booking2.booking_day= "05";
    booking2.booking_week= "13";
    booking2.paymentSuccess=true;

    // save the record to the database regardless of the paymentSuccess status
    booking2.save();
    console.log('booking 2 saved')


    let booking3 = new Booking();
    booking3.user_id = "ABCDE";
    booking3.fname = "Indiana";
    booking3.lname = "Jones";
    booking3.usertype= "customer";
    booking3.email="example_account@gmail.com";
    booking3.theater_id ="1234";
    booking3.theater_name ="AMC 12";
    booking3.movie_id = "1094";
    booking3.movie_name = "Star Wars";
    booking3.price = 20;
    booking3.seats = 2;
    booking3.transactionId= 89175;
    booking3.reservation_date= "2022-10-03";
    booking3.reservation_time= "4:30";
    booking3.seatIDs= ["A24", "A25"].toString();
    booking3.booking_year= "2022";
    booking3.booking_month= "10";
    booking3.booking_day= "03";
    booking3.booking_week= "40";
    booking3.paymentSuccess=true;

    // save the record to the database regardless of the paymentSuccess status
    booking3.save();
    console.log('booking 3 saved')



    // let moviedata = JSON.parse(fs.readFileSync('moviedump.json')); 
    // const importData = async () => {
        // try {
          // await Movie.create(moviedata)
          // console.log('data successfully imported')
          // // to exit the process
          // process.exit();

        // } catch (error) {
          // console.log('error', error);
          // process.exit();
        // }
      // }


}catch(err){
    console.log(err);
}

