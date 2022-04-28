import React, { useState } from "react";
import "./Reservation.css";
import Popup from "./Popup";
import { db } from "./firebase";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";

function createData(aika, maanantai, tiistai, keskiviikko, torstai, perjantai) {
  return { aika, maanantai, tiistai, keskiviikko, torstai, perjantai };
}


function Reservation() {
  const [reserveDate, setReservedate] = useState();
  const [reserveData, setReservedata] = useState([]);
  const [reserveTime, setReservetime] = useState();
  const [popupWindow, setPopupWindow] = useState();
  const [rows, setDataRows] = useState([reserveData]);

  let headerMonday = moment().weekday(1).format("DD.M");
  let headerTuesday = moment().weekday(2).format("DD.M");
  let headerWednesday = moment().weekday(3).format("DD.M");
  let headerThursday = moment().weekday(4).format("DD.M");
  let headerFriday = moment().weekday(5).format("DD.M");

  const doReservation = () => {
    setPopupWindow(true);
  };

  const addTestData = () => {
    let i = rows.push(createData("Hello", "World"));
    console.log(rows);
  };

  const getData = () => {
    db.collection("testikansio")
      .get()
      .then((querySnapshot) => {
        
        let item;
        querySnapshot.forEach((doc) => {
          // item.id = doc.id;
          item = doc.data();
          reserveData.push(item);
          console.log(item)
        });
         setDataRows(reserveData)

        // createData(setDataRows(reserveData))

        // console.log(rows)

        // rows.push(reserveData)

        // addAllItemsToTable(reserveData)
        rows.forEach((row) => {
          console.log(row)
        })
      });
  };

  const getDataRealTime = () => {
    db.collection("testikansio").onSnapshot((querySnapshot) => {
      let reserveData = [];
      let item;
      querySnapshot.forEach((doc) => {
        item = doc.data();
        reserveData.push(item);
      });
      setDataRows(reserveData);
      // addAllItemsToTable(reserveData)
    });
  };
  const doSomething = () => {
    console.log("Hello");
  };

  return (
    <div className="home">
      <div className="home_container">
        <div className="home_form">
          <div className="home_title">
            <p> Varauskalenteri </p>
          </div>
          <div className="home_buttons">
            <button onClick={addTestData}> Hello </button>
            <button onClick={doReservation}>Avaa ikkuna</button>
            <button onClick={getData}>Tarkista tiedot</button>
          </div>
          <div className="home_calendar">
            <div>
              <TableContainer component={Paper}>
                <Table
                  sx={{ maxWidth: 1500, minWidth: 900 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Aika</TableCell>
                      <TableCell align="center">
                        Maanantai {headerMonday}
                      </TableCell>
                      <TableCell align="center">
                        Tiistai {headerTuesday}
                      </TableCell>
                      <TableCell align="center">
                        Keskiviikko {headerWednesday}
                      </TableCell>
                      <TableCell align="center">
                        Torstai {headerThursday}
                      </TableCell>
                      <TableCell align="center">
                        Perjantai {headerFriday}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.Aika}                        
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.Aika}
                        </TableCell>
                        <TableCell align="center">{row.Maanantai}</TableCell>
                        <TableCell align="center">{row.Tiistai}</TableCell>
                        <TableCell align="center">{row.Keskiviikko}</TableCell>
                        <TableCell align="center">{row.Torstai}</TableCell>
                        <TableCell align="center">{row.Perjantai}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            <Popup trigger={popupWindow} setTrigger={setPopupWindow}>
              <h3> Varaa aika</h3>
              <p> Haluatko varata ajan?</p>
              <p className="popup_weekday">{reserveDate}</p>
              <p className="popup_reserveTime">{reserveTime}</p>
              <button className="popup_reserveBtn" onClick={doReservation}>
                Varaa
              </button>
            </Popup>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
