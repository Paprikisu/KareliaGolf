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



function Reservationsimulaatio() {
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const [reserveDate, setReservedate] = useState();
  const [reserveData, setReservedata] = useState([]);
  const [reserveTime, setReservetime] = useState();
  const [popupWindow, setPopupWindow] = useState();
  const [userEmail, setUserEmail] = useState(user ? user.email : "");
  const [rows, setDataRows] = useState([]);
  const [color, setColor] = useState({"td": { borderTop: 1, borderRight: 1, background: "lightgreen" },
  "th": {borderTop: 1, borderRight: 1, width: 50}});


  // Tekee tämän käynnistyessä
  useEffect(() => {
    db.collection("Simulaatiotaulukko")
      .get()
      .then((querySnapshot) => {
        let item;
        querySnapshot.forEach((doc) => {
          // item.id = doc.id;
          item = doc.data();
          reserveData.push(item);
        });
        setDataRows(reserveData);
        doColoring(); // Värittää varatut ruudut punaiseksi
      });
  }, []);

  let headerMonday = moment().weekday(1).format("D.M");
  let headerTuesday = moment().weekday(2).format("D.M");
  let headerWednesday = moment().weekday(3).format("D.M");
  let headerThursday = moment().weekday(4).format("D.M");
  let headerFriday = moment().weekday(5).format("D.M");

  const doReservation = (e) => {
    e.preventDefault();

    db.collection("reservations")
      .add({
        Varaaja: userEmail,
        Varauspäivä: reserveDate,
        Varausaika: reserveTime,
        created: new Date()
      })
      .then(function (docRef) {
        let reservationId = docRef.id;
        return reservationId;
      })
      .then(function (reservationId) {
        var ovikoodit = db.collection("ovikoodit");
        var query = ovikoodit.where("__name__", ">=", reservationId);
        var snapshot = query
          .orderBy("__name__")
          .limit(1)
          .get()
          .then(function (snapshot) {
            //Make a new query if snapshot is empty
            if (snapshot.empty == true) {
              var ovikoodit = db.collection("ovikoodit");
              var query = ovikoodit.where("__name__", "<", reservationId);
              var newSnapshot = query
                .orderBy("__name__")
                .limit(1)
                .get()
                .then(function (newSnapshot) {
                  newSnapshot.forEach((doc) => {
                    let docData = doc.data();
                    var varausRef = db
                      .collection("reservations")
                      .doc(reservationId);

                    return varausRef
                      .update({
                        ovikoodi: docData.koodi,
                      })
                      .then(console.log("Reservation data updated"))
                      .then(
                        alert("Varaus onnistui! Ovikoodi on " + docData.koodi)
                      )
                      .then(navigate("/home"));
                  });
                });
            } else {
              snapshot.forEach((doc) => {
                let docData = doc.data();
                var varausRef = db
                  .collection("reservations")
                  .doc(reservationId);

                return varausRef
                  .update({
                    ovikoodi: docData.koodi,
                  })
                  .then(console.log("Reservation data updated"))
                  .then(alert("Varaus onnistui! Ovikoodi on " + docData.koodi))
                  .then(navigate("/home"));
              });
            }
          });
      })
      .catch(function (error) {
        alert("Virhe ajanvarauksessa. Ole hyvä ja yritä uudelleen.");
      });


    // Kutsuu varaustaulukon päivittävää funktiota
    updateSpecificDoc();
    alert("Varaus Onnistui!");
  };

  let table = document.getElementById("myTable");

  const openReservationWindow = () => {
    let cells = table.getElementsByTagName("td");
    let length = cells.length;
    for (var i = 0; i < length; i++) {
      cells[i].onclick = function () {
        if (this.cellIndex != 0 && this.innerHTML == "Vapaa") {
          // asettaa varausikkunaan ajan
          setReservetime(this.parentElement.children[0].textContent);

          // console.log(this.innerHTML);

          var th = table.getElementsByTagName("th")[this.cellIndex];

          // asettaa varausikkunaan päivän
          setReservedate(th.innerHTML);

          // Lopuksi avaa popup varausikkuna
          setPopupWindow(true);
        }
      };
    }
  };
  const doColoring = () => {
    var td = document.querySelectorAll('td')
    for (let cell of td){
      if(cell.innerHTML === 'Varattu'){
        cell.style.backgroundColor = '#C76666'
      }
    }

  }

  // Funktio vastaa varaustaulukon päivittämisestä varatuksi tietokantaan.
  const updateSpecificDoc = () => {
    db.collection("Simulaatiotaulukko")
      .where("Aika", "==", reserveTime) // etsii documentseista ajan (kaikissa docseissa unique aika) ja päivittää sen perusteella
      .get()
      .then((querySnapshot) => {
        let item;
        querySnapshot.forEach((doc) => {
          // Käy läpi reserveDaten sisältö ja toimi päivämäärän mukaisesti (Päivittää päiväkohtaisesti ajankohdan varatuksi)

          if (reserveDate.includes("Maanantai")) {
            doc.ref.update({
              Maanantai: "Varattu",
            });
          }
          // Jos tiistai, päivitä tila varatuksi
          if (reserveDate.includes("Tiistai")) {
            doc.ref.update({
              Tiistai: "Varattu",
            });
          }
          if (reserveDate.includes("Keskiviikko")) {
            doc.ref.update({
              Keskiviikko: "Varattu",
            });
          }
          if (reserveDate.includes("Torstai")) {
            doc.ref.update({
              Torstai: "Varattu",
            });
          }
          if (reserveDate.includes("Perjantai")) {
            doc.ref.update({
              Perjantai: "Varattu",
            });
          }

          // doc.data() is never undefined for query doc snapshots
        });
      })
      .catch((error) => {

      });
  };

  return (
    <div className="home">
      <div className="home_container">
        <div className="home_form">
          <div className="home_title">
            <p> Simulaatio </p>
          </div>
          <div className="home_buttons">
          </div>
          <div className="home_calendar">
            <div>
              <TableContainer style={{ maxHeight: 900, maxWidth: 1500}} component={Paper}>
                <Table
                  stickyHeader
                  id="myTable"
                  sx={{ maxWidth: 1500, minWidth: 1200, margin: 'auto' }}
                  size="medium"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow 
                      sx={{
                        "th": {background: '#4BD2D7', borderRight: 1}
                      }}
                    >
                      <TableCell>Aika</TableCell>
                      <TableCell scope="col" align="center">
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
                        "td": { border: 1, backgroundColor: 'lightgreen'},
                        "th": {borderTop: 1, borderRight: 1, width: 50}
                        }}
                        onClick={openReservationWindow}
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
              <p> Haluatko varata ajan simulaatioon?</p>
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

export default Reservationsimulaatio;
