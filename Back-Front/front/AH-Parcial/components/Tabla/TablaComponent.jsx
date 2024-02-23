import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
function createData(
    name,
    calories,
    fat,
    carbs,
    protein,
  ) {
    return { name, calories, fat, carbs, protein };
  }
  
const row = createData('Frozen yoghurt', 159, 6.0, 24, 4.0);
  
function TablaComponent({exercises, editable}){

   return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{width:400}}>Ejercicio</TableCell>
            <TableCell align="right">Series</TableCell>
            <TableCell align="right">Repeticiones</TableCell>
            <TableCell align="right">Descanso</TableCell>
            {editable && (<TableCell align="right">Acciones</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {exercises && exercises.map((exercise) => (
            <TableRow
              key={exercise.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {exercise.name}
              </TableCell>
              <TableCell align="right" size='string'>{row.calories}</TableCell>
              <TableCell align="right" size='string'>{row.fat}</TableCell>
              <TableCell align="right" size='string'>{row.carbs}</TableCell>
              {editable && (<TableCell align="right" size='string'>
                <IconButton color="primary" aria-label="add to shopping cart">
                  <EditIcon />
                </IconButton>
                <IconButton color="primary" aria-label="add to shopping cart">
                  <DeleteIcon />
                </IconButton>
              </TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   )
}


export default TablaComponent