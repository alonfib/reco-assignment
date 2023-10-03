import React, { useState } from 'react';
import Table from '../Common/Table/Table';

interface Application {
  name: string;
  category: string;
  connectors: string[];
  users: string[];
}

interface Props {
  applications?: Application[];
}
const mockData: Application[] = [
  {
    name: 'Application 1',
    category: 'Category A',
    connectors: ['Connector 1', 'Connector 2'],
    users: ['User 1', 'User 2', 'User 3'],
  },
  {
    name: 'Application 2',
    category: 'Category B',
    connectors: ['Connector 3', 'Connector 4'],
    users: ['User 4', 'User 5'],
  },
  {
    name: 'Application 3',
    category: 'Category A',
    connectors: ['Connector 2', 'Connector 5'],
    users: ['User 1', 'User 6'],
  },
  // Add more mock data entries as needed
];


const columns: {label: string, key: string}[] = [
  {
    label: 'Application name',
    key: 'name',
  },
  {
    label: 'Category',
    key: 'category',
  },
  {
    label: 'Connectors (Data source)',
    key: 'connectors',
  },
];

const ApplicationInventoryTable: React.FC<Props> = ({ applications }) => {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleRowClick = (app: Application) => {
    setSelectedApp(app);
  };

  const handleCloseSlideIn = () => {
    setSelectedApp(null);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<{ value: string }>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <div className='application-inventory-table'>
      
      <select value={rowsPerPage.toString()} onChange={handleChangeRowsPerPage}>
        <option value="25">25 rows per page</option>
        <option value="50">50 rows per page</option>
      </select>
      <Table columns={columns} data={mockData} />
    </div>
  );
};

export default ApplicationInventoryTable;
