import React, { useState } from "react";
import "./Reservation.css";
import "react-calendar/dist/Calendar.css";
import { useTable } from "react-table/dist/react-table.development";
import 'reactjs-popup/dist/index.css';
import Popup from './Popup';
import { db } from './firebase'
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";
import moment from "moment"
import { add, addDays, setDate, sub } from "date-fns";
import { subDays } from "date-fns/esm";


const defaultPropGetter = () => ({})





function Table({ 
  columns,
  data, 
  getTrProps = props => props,
  getColumnProps = defaultPropGetter,
  getRowProps = defaultPropGetter,
  getCellProps = defaultPropGetter,  
}) {

 

  const {
    getTableProps,

    getTableBodyProps,

    headerGroups,

    rows,

    prepareRow,
  } = useTable({
    columns,
    data,
  });

  

  

  return ( 
   
    <table className="reactTable" {...getTableProps()}>
      <thead>
        {
          // Loop over the header rows

          headerGroups.map((headerGroup) => (
            // Apply the header row props

            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row

                headerGroup.headers.map((column) => (
                  // Apply the header cell props

                  <th {...column.getHeaderProps()}>
                    {
                      // Render the header

                      column.render("Header")
                    }
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>

      {/* Apply the table body props */}

      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows

          rows.map((row) => {
            // Prepare the row for display

            prepareRow(row);

            return (
              // Apply the row props

              <tr {...row.getRowProps()}{...getTrProps(row)}>
                {
                  // Loop over the rows cells

                  row.cells.map((cell) => {
                    // Apply the cell props
                    

                    return (
                      <td 
                      // Return an array of prop objects and react-table will merge them appropriately
                      
                      {...cell.getCellProps([
                      {
                        className: cell.column.className,
                        style: cell.column.style,
                      },
                        getColumnProps(cell.column),
                        getCellProps(cell),
                        
                      ])}
                      
                      >
                        {
                          // Render the cell contents
                          cell.render("Cell")
                          
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>

      
    </table>
    

    

    
    
  );

  
}





function Reservation() {

  const [popupWindow, setPopupWindow] = useState(false);

  const [{ user }, dispatch] = useStateValue();

  const today = new Date();
  const tomorrow = new Date(today);
  let [dateCounter , setDatecounter] = useState("")


  const data = React.useMemo(
    () => [
      {
        col1: "6:00",
        col2: "",
        col3: "",
        col4: "",
        col5: "",
        col6: "",

      },
      {
        col1: "6:30",
        col2: "",
        col3: "",
        col4: "",
        col5: "",
        col6: "",

      },
      {
        col1: "7:00",
        col2: "",
        col3: "",
        col4: "",
        col5: "",
        col6: "",

      },
      {
        col1: "7:30",
        col2: "",
        col3: "",
        col4: "",
        col5: "",
        col6: "",

      },
      
      {
        col1: "8:00",
        col2: "",
        col3: "",
        col4: "",
        col5: "",
        col6: "",

      },
      {
        col1: "8:30",
        col2: "",
      },
      {
        col1: "9:00",
        col2: "",
      },
      {
        col1: "9:30",
        col2: "",
      },
      {
        col1: "10:00",
        col2: "",
      },
      {
        col1: "10:30",
        col2: "",
      },
      {
        col1: "11:00",
        col2: "",
      },
      {
        col1: "11:30",
        col2: "",
      },
      {
        col1: "12:00",
        col2: "",
      },
      {
        col1: "12:30",
        col2: "",
      },
      {
        col1: "13:00",
        col2: "",
      },
      {
        col1: "13:30",
        col2: "",
      },
      {
        col1: "14:00",
        col2: "",
      },
      {
        col1: "14:30",
        col2: "",
      },
      {
        col1: "15:00",
        col2: "",
      },
      {
        col1: "15:30",
        col2: "",
      },
      {
        col1: "16:00",
        col2: "",
      },
      {
        col1: "16:30",
        col2: "",
      },
      {
        col1: "17:00",
        col2: "",
      },
      {
        col1: "17:30",
        col2: "",
      },
      {
        col1: "18:00",
        col2: "",
      },
      {
        col1: "18:30",
        col2: "",
      },
      {
        col1: "19:00",
        col2: "",
      },
      {
        col1: "19:30",
        col2: "",
      },
      {
        col1: "20:00",
        col2: "",
      },
      {
        col1: "20:30",
        col2: "",
      },

      {
        col1: "21:00",
        col2: "",
      },{
        col1: "21:30",
        col2: "",
      },

    ],
    []
  );

  const [dateTest, setDateTest] = useState(new Date())


const goForward = () =>{
  setDateTest(addDays(dateTest, 7))
  console.log(dateTest)
  setColumnUpdate(columnUpdate)
  
}


const goBack = () =>{
  setDateTest(subDays(dateTest, 7))
  console.log(dateTest)

}

let headerMonday = moment().weekday(1).format('DD.M')
let headerTuesday = moment().weekday(2).format('DD.M')
let headerWednesday = moment().weekday(3).format('DD.M')
let headerThursday = moment().weekday(4).format('DD.M')
let headerFriday = moment().weekday(5).format('DD.M')


  const columns = React.useMemo(
    () => [
      {
        Header: "Aika",
        accessor: "col1", // Accessor is the 'key' in the data (kinda like id)
      },
      {
        Header: "Maanantai " + dateTest ,
        accessor: "col2",
      },
      {
        Header: "Tiistai " + headerTuesday  ,
        accessor: "col3",
      },
      {
        Header: "Keskiviikko " + headerWednesday  ,
        accessor: "col4",
      },
      {
        Header: "Torstai " + headerThursday  ,
        accessor: "col5",
      },
      {
        Header: "Perjantai " + headerFriday  ,
        accessor: "col6",
      },
    ],
    []
  );

  const navigate = useNavigate();
  const [reserveTime, setReservetime] = useState("")
  const [reserveDate, setReservedate] = useState("")
  const [userEmail, setUserEmail] = useState(user ? user.email : "")



  // Lisää varaus firestoren tietokantaan
  const doReservation = e =>{
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
          console.log("Snapshot is empty!")
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
                console.log("Reservation data updated and door code added")                
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
              console.log("Reservation data updated and door code added")
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
      console.log("Error in registration or door code delivery")
    })


    // Testaus tarkoitus
    console.log("Varattu päivä: " + reserveDate)
    console.log("Varattu aika: " + reserveTime)

    // TULEE LISÄTÄ -- Navigoi asiakkaan varauksiin homen sijaan
    alert("Varaus Onnistui!")

  } 

  const updateDatabase = () => {
    db.collection("reservations").doc("")
    .onSnapshot((doc) =>{
      console.log("Current data: ", doc.data());
    });

  }

  const [columnUpdate, setColumnUpdate] = useState(columns)


  let reservationsRef = db.collection("reservations")
  let query = reservationsRef.where("Varaaja", "==", true)

  const testiFunktio = () => {
    db.collection("reservations").where("Varauspäivä", "==", "Maanantai")
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
  }



  
  return (
    <div className="home">
      <div className="home_container">
        <div className="home_form">
          
          
          <div className="home_title">
            <p>Varauskalenteri</p>
            
          </div>
          <div className="home_buttons">
            <button onClick={testiFunktio}>Lue varaukset testi</button>
            <button onClick={updateDatabase}>Lue tietokanta</button>
            <button onClick={goBack}>Taaksepäin </button>
            <button onClick={goForward}>Eteenpäin</button>
          </div>
          <div className="home_calendar">
            
            <Table
            columns={columnUpdate}
            data={data} 
            getColumnProps={column => ({
              
              onClick: () =>{
                // Jos headerin arvo valitussa kohdassa on Aika, älä tee mitään.
                if (column.Header === "Aika") {
                  console.log("Et voi varata aikaa tähän")

                }
                // Jos headerin arvo on mikä tahansa muu kuin Aika - Avaa popup ikkuna
                else{
                    // Jos käyttäjä on kirjautunut sisään
                  if(user){
                    setPopupWindow(true)
                     // testing purposes
                      console.log(column.Header)
                    // Valitsee klikatun rivin headerin arvon (viikonpäivä)
                       setReservedate(column.Header)

                  }
                  else{
                    alert("Et ole kirjautunut sisään tehdäksesi varausta")
                  }
                  
                }
                

              } 

              
            })}
            getTrProps={row =>({
              onClick: (e) =>{
                 // testing purposes
                console.log(row.cells[0].value)
                // Valitsee klikatun rivin ensimmäisen lapsen arvon (Aika)
                setReservetime(row.cells[0].value)

                
                
              }
            })}

            

            
            
            
            />
            

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
