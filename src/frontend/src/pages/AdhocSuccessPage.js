import classes from './SuccessPage.module.css';
import {useLocation} from 'react-router-dom';
import { Button } from "react-bootstrap";

const AdhocSuccessPage = () => {
  const location = useLocation()
  const bookingConfirmation = location.state.bookingDetails

  const printDiv = (event) => {
    // event.preventDefault()
    // var printContents = document.getElementById("print").innerHTML;
    // var originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    window.print();
    // document.body.innerHTML = originalContents;
  }

  return (
    <>
      <div>
        <section className={classes.adhocCard}>
            <div id="print">
                <h3>Booking Successful</h3>
                <table>
                    <tbody>
                    <tr>
                        <td><span className={classes.label}>Booking Id </span></td>
                        <td><span className={classes.value}>{bookingConfirmation.transactionId}</span></td>
                    </tr>
                    <tr>
                        <td><span className={classes.label}>Movie Name </span></td>
                        <td><span className={classes.value}>{bookingConfirmation.movie_name}</span></td>
                    </tr>
                    <tr>
                        <td><span className={classes.label}>Theater Name </span></td>
                        <td><span className={classes.value}>{bookingConfirmation.theater_name}</span></td>
                    </tr>
                    <tr>
                        <td><span className={classes.label}>Date</span></td>
                        <td><span className={classes.value}>{bookingConfirmation.booking_date}</span></td>
                    </tr>
                    <tr>
                        <td><span className={classes.label}>Show Time</span></td>
                        <td><span className={classes.value}>{bookingConfirmation.booking_time}</span></td>
                    </tr>
                    <tr>
                        <td><span className={classes.label}>Number of Seats</span></td>
                        <td><span className={classes.value}>{bookingConfirmation.seats}</span></td>
                    </tr>
                    <tr>
                        <td><span className={classes.label}>Seat Numbers</span></td>
                        <td><span className={classes.value}>{bookingConfirmation.seatIDs}</span></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        <Button style={{marginLeft:"36%"}} onClick={printDiv}>Print Ticket</Button>
        </section>
      </div>
    </>
  );
};

export default AdhocSuccessPage;