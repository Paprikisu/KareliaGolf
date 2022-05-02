import React, { useState, useEffect } from "react";
import "./Reservation.css";
import Popup from "./Popup";
import { db } from "./firebase";
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";

// function createData(aika, maanantai, tiistai, keskiviikko, torstai, perjantai) {
 // return { aika, maanantai, tiistai, keskiviikko, torstai, perjantai };
// }


function Reservation() {

  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const [reserveDate, setReservedate] = useState();
  const [reserveData, setReservedata] = useState([]);
  const [reserveTime, setReservetime] = useState();
  const [popupWindow, setPopupWindow] = useState();
  const [userEmail, setUserEmail] = useState(user ? user.email : "")
  const [rows, setDataRows] = useState([]);

  let headerMonday = moment().weekday(1).format("DD.M");
  let headerTuesday = moment().weekday(2).format("DD.M");
  let headerWednesday = moment().weekday(3).format("DD.M");
  let headerThursday = moment().weekday(4).format("DD.M");
  let headerFriday = moment().weekday(5).format("DD.M");

  const doReservation = e => {

    e.preventDefault();

    db
    .collection("reservations")
    .add({
      Varaaja: userEmail,
      Varauspäivä: reserveDate,
      Varausaika: reserveTime
    })
    .then(function(docRef) {
      let reservationId = docRef.id
      console.log(reservationId)
      return reservationId
    })
    .then(function(reservationId) {

      var ovikoodit = db.collection("ovikoodit")            
      var query = ovikoodit.where("__name__", ">=", reservationId)
      var snapshot = query.orderBy("__name__").limit(1).get().then(function(snapshot) {

         //Make a new query if snapshot is empty
        if (snapshot.empty == true) {
          var ovikoodit = db.collection("ovikoodit")
          var query = ovikoodit.where("__name__", "<", reservationId)
          var newSnapshot = query.orderBy("__name__").limit(1).get().then(function(newSnapshot) {

            newSnapshot.forEach(doc => {
              let docData = doc.data()
              console.log(doc.id, " => ", docData.koodi)
              var varausRef = db.collection("reservations").doc(reservationId)                                        

              return varausRef.update({
                ovikoodi: docData.koodi
              })
              .then(                
                console.log("Reservation data updated")                
              )
              .then(
                alert("Varaus onnistui! Ovikoodi on " + docData.koodi)                
              )  
              .then(
                navigate('/home')
              )                                          
            })

          })

        } else {
          snapshot.forEach(doc => {
            let docData = doc.data()
            console.log(doc.id, " => ", docData.koodi)            
            var varausRef = db.collection("reservations").doc(reservationId)                          

            return varausRef.update({
              ovikoodi: docData.koodi
            })
            .then(             
              console.log("Reservation data updated")
            )
            .then(
              alert("Varaus onnistui! Ovikoodi on " + docData.koodi)              
            )
            .then(
              navigate('/home')
            )                      
          })
        }
      })
    })
    .catch(function(error) {
      alert("Virhe ajanvarauksessa. Ole hyvä ja yritä uudelleen.")
    })


    // Testaus tarkoitus
    console.log("Varattu päivä: " + reserveDate)
    console.log("Varattu aika: " + reserveTime)

    // TULEE LISÄTÄ -- Navigoi asiakkaan varauksiin homen sijaan
    alert("Varaus Onnistui!")
  };

 
    useEffect(() =>{
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
      });
    }, []);


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
  let table = document.getElementById('myTable')

 

  const openReservationWindow = () => {
    let cells = table.getElementsByTagName('td')
    for (var i = 0, len = cells.length; i < len; i++) {
      cells[i].onclick = function () {


        // asettaa varausikkunaan ajan
        setReservetime(this.parentElement.children[0].textContent)

        // console.log(this.innerHTML);
        // console.log(this.cellIndex);

        var th = table.getElementsByTagName('th')[this.cellIndex];

        // asettaa varausikkunaan päivän
        setReservedate(th.innerHTML);
    }

    }


    setPopupWindow(true);

    
    
    
    
  };

  // Alla oleva funktio saa klikatun cellin arvon luettua konsoliin
  // onClick={({target}) => console.log(target.textContent)}
  // onClick={({target}) => console.log(target.parentElement.children[0])
  return (
    <div className="home">
      <div className="home_container">
        <div className="home_form">
          <div className="home_title">
            <p> Varauskalenteri </p>
          </div>
          <div className="home_buttons">
          </div>
          <div className="home_calendar">
            <div>
              <TableContainer component={Paper}>
                <Table
                  id="myTable"
                  sx={{ maxWidth: 1500, minWidth: 900 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow onClick={({target}) => console.log(target.tagName)}>
                      <TableCell class="time">Aika</TableCell>
                      <TableCell class="monday" scope="col" align="center">
                        Maanantai {headerMonday}
                      </TableCell>
                      <TableCell scope="col" align="center">
                        Tiistai {headerTuesday}
                      </TableCell>
                      <TableCell scope="col" align="center">
                        Keskiviikko {headerWednesday}
                      </TableCell>
                      <TableCell scope="col" align="center">
                        Torstai {headerThursday}
                      </TableCell>
                      <TableCell scope="col" align="center">
                        Perjantai {headerFriday}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow 
                        key={row.Aika}                        
                        sx={{
                          "&:last-child td, &:last-child th": { border: 1 },
                        }}
                        onClick={openReservationWindow}
                      >
                        <TableCell component="th" scope="row">
                          {row.Aika}
                        </TableCell>
                        <TableCell  align="center">{row.Maanantai}</TableCell>
                        <TableCell  align="center">{row.Tiistai}</TableCell>
                        <TableCell  align="center">{row.Keskiviikko}</TableCell>
                        <TableCell  align="center">{row.Torstai}</TableCell>
                        <TableCell  align="center">{row.Perjantai}</TableCell>
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
