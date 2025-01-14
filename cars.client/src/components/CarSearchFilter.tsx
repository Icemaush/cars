import { Box, Button, TextField } from "@mui/material";
import { CarSearchFilterProps } from "../interfaces/Car.types";
import { useState } from "react";

const CarSearchFilter = (props: CarSearchFilterProps) => {
  const [make, setMake] = useState<string>("")
  const [model, setModel] = useState<string>("")

  const applyFilter = () => {
    props.setFilters({
      make: make,
      model: model
    })
  }

  const clearFilter = () => {
    setMake("")
    setModel("")

    props.setFilters({
      make: "",
      model: ""
    })
  }

  return (
    <Box sx={{ display: "flex", margin: "12px 0" }} gap={2}>
      <TextField size={"small"} label={"Filter by make"} onChange={(e) => setMake(e.target.value)} value={make} />
      <TextField size={"small"} label={"Filter by model"} onChange={(e) => setModel(e.target.value)} value={model} />
      <Button variant={"contained"} onClick={applyFilter}>Apply</Button>
      <Button variant={"outlined"} onClick={clearFilter}>Clear</Button>
    </Box>
  )
}

export default CarSearchFilter;