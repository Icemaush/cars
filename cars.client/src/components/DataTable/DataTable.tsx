import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { DataTableProps } from "./DataTable.types";

const DataTable = (props: DataTableProps) => (
  <Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" size={"small"}>
        <TableHead>
          <TableRow>
            {props.columns.map((column) => (
              <TableCell align={"center"} sx={{ fontWeight: 600 }}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows && props.rows.map((row) => (
            <TableRow
              key={row.key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {row.data.map((value) => (
                <TableCell align={"center"} sx={{ color: row.data[6] === "Expired" ? "red" : "green" }}>{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
)

export default DataTable;