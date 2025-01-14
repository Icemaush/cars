import { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { CarSearchFilterObject, Car } from "../interfaces/Car.types";
import CarSearchFilter from "./CarSearchFilter";
import DataTable from "./DataTable/DataTable";
import { DataTableRow } from "./DataTable/DataTable.types";
import Loader from "./Loader";

const Home = () => {
  const [filters, setFilters] = useState<CarSearchFilterObject>({
    make: "",
    model: "",
  })
  const [rows, setRows] = useState<DataTableRow[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const columns = [
    "ID",
    "Make",
    "Model",
    "Year",
    "Colour",
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
        ]
      }

      return rowData
    })
  }

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

export default Home;