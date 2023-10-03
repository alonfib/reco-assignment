import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Slide,
  Typography,
} from '@mui/material';

export interface TableColumn {
  label: string;
  key: string;
}

interface Props<T> {
  data: T[];
  columns: TableColumn[];
  rowClickHandler?: (item: T) => void;
}

const CommonTable: React.FC<Props<any>> = ({ data = [], columns, rowClickHandler }) => {
  const [selectedItem, setSelectedItem] = useState<Record<string, any> | null>(null);
  const handleRowClick = (item: Record<string, any>) => {
    setSelectedItem(item);
    if (rowClickHandler) {
      rowClickHandler(item);
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.key}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index} onClick={() => handleRowClick(item)}>
                {columns.map((column) => (
                  <TableCell key={column.key}>{item[column.key]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CommonTable;
