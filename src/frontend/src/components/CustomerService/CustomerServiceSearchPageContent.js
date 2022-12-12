import {Component, Fragment, useContext, useState} from 'react';
import classes from './CustomerServiceSearchPageContent.module.css';
import { BsSearch } from 'react-icons/bs';
import Request from '../../contexts/Request';

class TableRow extends Component {
    render() {
        const row = this.props.row;
        return (
            <tr>
                {row.map((val) => (
                    <td>{val}</td>
                ))}
            </tr>
        )
    }
}

class Table extends Component {
    render() {
        const columns = this.props.columns;
        const body = this.props.body;
        // body.splice(0, 1)
        console.log(body)
        
        if(body){
            return (
                <table style={{width: 500}}>
                    <thead>
                        <tr>
                            {columns.map((column) => (
                            <th key={column}>{column}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {body.map((temp) => {
                            //console.log(temp);
                            return (
                                <TableRow row={temp}/>
                            )
                        })}
                    </tbody>
                </table>)
        } else {
            return (
                <Fragment/>
            )
        }
    }
}



const CustomerServiceSearchPageContent = () => {
    const [entry, setEntry] = useState("");
    const [searchCriteria, setCriteria] = useState("email");
    const [userData, setUserData] = useState(undefined)
    const request = useContext(Request);
    let path = "/bookings/customerInfo"
    const columns = ["Booking_ID", "Email", "Theater_ID", "Theater", "Movie_ID", "Movie", "Price", "Seats"]


    const handleSearch = async () => {
        let value = entry
        let criteria = searchCriteria

        if (value !== "" && criteria !== "") {
            if(criteria === "email"){
                path = path + "?email=" + value;
            } else {
                path = path + "?userid=" + value;
            }

            let getBookings = request.getRequest(path, "");
            getBookings.then(response => {
                if(response.ok){
                    response.json()
                    .then((data) => {
                        // need some function for displaying data
                        let bookingsList = [[]]
                        data['bookingsList'].map((temp) => {
                            let reorganized_row = [temp['_id'], temp['email'], temp['theater_id'], temp['theater_name'], temp['movie_id'], temp['movie_name'], temp['price'].toString(), temp['seats'].toString()]
                            bookingsList.push(reorganized_row)
                        })
                        setUserData(bookingsList)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
            })
        }
    }

    const changeValue = (event) => {
        setEntry(event.target.value) // might not need current here?
    }

    const changeCriteria = (choice) => {
        setCriteria(choice.target.value)
    }

    // use table tag
    // predefine header, called thead for header names
    // look at line 241 of MovieBooking.js
    // for rows have state variable that will dynamically update

    return (
    <section className={classes.main}>
        <Fragment >
            <div className={classes.searchContainer}>
                <input type="text"
                    placeholder="Search"
                    onChange={changeValue}/>
                <select placeholder="Search by"
                        aria-label="Seach by"
                        // ref={searchCriteria} // makes page go blank?
                        onChange={changeCriteria}>
                    <option value="email">Email</option>
                    <option value="userID">userID</option>
                </select>
                <button onClick={handleSearch}>
                    <BsSearch/>
                </button>
            </div>
            <div className={classes.tableContainer}>
                {userData ? <Table columns={columns} body={userData}/> : <></>}
            </div>
        </Fragment>
    </section>
    );
};

export default CustomerServiceSearchPageContent;