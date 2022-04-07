import React, { useState } from "react";
import "./Reservation.css";
import "react-calendar/dist/Calendar.css";
import { Calendar } from "react-calendar";
import { useTable } from "react-table/dist/react-table.development";

function Table({ columns, data,  }) {
  const [selectedId, setSelectedId] = useState(-1)
  const [column, setColumn] = useState(-1)
  const [style, setStyle] = useState("tdColorBasic")

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

  const getCellValue = (e, j) => {
    setSelectedId(e.row.id)
    setColumn(j)
    
  };

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

              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells

                  row.cells.map((cell, j) => {
                    // Apply the cell props

                    return (
                      <td className={style}

                      onClick={() => getCellValue(cell,j) }
                      
                      style={{
                        background: selectedId === row.id && column === j ? 'green' : 'white'
                      }}
                      
                      
                      
                      
                      
                       {...cell.getCellProps()}>
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
  const [value, onChange] = useState(new Date());

  const [status, setStatus] = useState();

  const data = React.useMemo(
    () => [
      {
        col1: "8:00",
        col2: "",
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
            
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
