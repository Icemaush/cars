import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { CarSearchFilterObject, Car } from "../interfaces/Car.types";
import CarSearchFilter from "./CarSearchFilter";
import DataTable from "./DataTable/DataTable";
import { DataTableRow } from "./DataTable/DataTable.types";
import Loader from "./Loader";
import * as signalr from "@microsoft/signalr";

const Registrations = () => {
  const [filters, setFilters] = useState<CarSearchFilterObject>({
    make: "",
    model: "",
  })
  const [rows, setRows] = useState<DataTableRow[] | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  const rowsRef = useRef<DataTableRow[] | undefined>(rows)

  const columns = [
    "ID",
    "Make",
    "Model",
    "Year",
    "Colour",
    "Registration",
    "Status"
  ]

  const getUrl = () => {
    let url = import.meta.env.VITE_API_URL + "cars"

    let filtersApplied = false
    Object.entries(filters).forEach((filter) => {
      const key = filter[0]
      const value = filter[1]

      if (value.toString() !== "") {
        url += filtersApplied ? "&" : "?"
        url += `${key}=${value}`
        filtersApplied = true
      }
    })

    return url
  }

  const handleFetchData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(getUrl())

      if (response.status == 200) {
        const data: Car[] = response.data
        setRows(formatRows(data))
      }

      setLoading(false)
    } catch (e) {
      console.log(e)
      alert("Unable to load data.")
    }
  }

  const formatRows = (apiData: Car[]) => {
    return apiData.map((car) => {
      const rowData: DataTableRow = {
        key: `${car.id}_${car.make}`,
        data: [
          car.id.toString(),
          car.make,
          car.model,
          car.year.toString(),
          car.colour,
          car.registration ?? "",
          "Valid"
        ]
      }

      return rowData
    })
  }

  const updateRegistrationStatus = (carId: string, status: string) => {
    const formattedRows = rowsRef.current?.map((row) => {
      if (row.data[0] === carId.toString()) {
        const tempRow = row
        tempRow.data[6] = status
        return tempRow
      }
      return row
    })

    setRows(formattedRows)
  }

  const connectToRegistrationCheckService = () => {
    const connection = new signalr.HubConnectionBuilder().withUrl(
      import.meta.env.VITE_BASE_URL + "registration-check",
      {
        skipNegotiation: true,
        transport: signalr.HttpTransportType.WebSockets
      }
    ).build()

    connection.start().catch((err) => console.log(err));

    connection.on("UpdateRegistrationStatus", (carId, status) => {
      updateRegistrationStatus(carId, status)
    })
  }

  useEffect(() => {
    handleFetchData()
    connectToRegistrationCheckService();
  }, [])

  useEffect(() => {
    rowsRef.current = rows
  }, [rows])

  useEffect(() => {
    handleFetchData()
  }, [filters])

  return (
    <Box>
      <Loader loading={loading} />
      <CarSearchFilter setFilters={setFilters} />
      <DataTable columns={columns} rows={rows} />
    </Box>
  )
}

export default Registrations;