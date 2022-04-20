import React, { useState } from "react";
import "./Reservation.css";
import "react-calendar/dist/Calendar.css";
import { Calendar } from "react-calendar";
import { useTable } from "react-table/dist/react-table.development";
import 'reactjs-popup/dist/index.css';
import Popup from './Popup';
import { db } from './firebase'
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";

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

  const data = React.useMemo(
    () => [
      {
        col1: "8:00",
        col2: "",
        col3: "",
        col4: "",
        col5: "",
        col6: "",

      },
      {
        col1: "9:00",
        col2: "",
      },
      {
        col1: "10:00",
        col2: "",
      },
      {
        col1: "11:00",
        col2: "",
      },
      {
        col1: "12:00",
        col2: "",
      },
      {
        col1: "13:00",
        col2: "",
      },
      {
        col1: "14:00",
        col2: "",
      },
      {
        col1: "15:00",
        col2: "",
      },
      {
        col1: "16:00",
        col2: "",
      },
      {
        col1: "17:00",
        col2: "",
      },
      {
        col1: "18:00",
        col2: "",
      },
      {
        col1: "19:00",
        col2: "",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Aika",
        accessor: "col1", // Accessor is the 'key' in the data (kinda like id)
      },
      {
        Header: "Maanantai",
        accessor: "col2",
      },
      {
        Header: "Tiistai",
        accessor: "col3",
      },
      {
        Header: "Keskiviikko",
        accessor: "col4",
      },
      {
        Header: "Torstai",
        accessor: "col5",
      },
      {
        Header: "Perjantai",
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


    // Testaus tarkoitus
    console.log("Varattu päivä: " + reserveDate)
    console.log("Varattu aika: " + reserveTime)

    // TULEE LISÄTÄ -- Navigoi asiakkaan varauksiin homen sijaan
    navigate('/home')
    alert("Varaus Onnistui!")

  } 
  
  return (
    <div className="home">
      <div className="home_container">
        <div className="home_form">
          
          
          <div className="home_calendarNav">
            <Calendar showWeekNumbers />
          </div>
          <div className="home_calendar">
            <Table
            columns={columns}
            data={data} 
            getColumnProps={column => ({
              
              onClick: () =>{
                // Jos headerin arvo valitussa kohdassa on Aika, älä tee mitään.
                if (column.Header === "Aika") {
                  console.log("Et voi varata aikaa tähän")

                }
                // Jos headerin arvo on mikä tahansa muu kuin Aika - Avaa popup ikkuna
                else{
                  setPopupWindow(true)
                // testing purposes
                console.log(column.Header)
                // Valitsee klikatun rivin headerin arvon (viikonpäivä)
                setReservedate(column.Header)

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
