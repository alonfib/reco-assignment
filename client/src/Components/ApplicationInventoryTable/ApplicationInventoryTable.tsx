import React, { useState,useEffect } from 'react';
import Table from '../Common/Table/Table';
import { put } from '../../api';
import { Application } from './types';
import ApplicationModal from './ApplicationModal/ApplicationModal';


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

const columns: { label: string, key: string }[] = [
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

const ApplicationInventoryTable: React.FC = ({ }) => {
  const [tableData, setTableData] = useState<Application[]>([]); 
  const [selectedApp, setSelectedApp] = useState<Application | undefined>();
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchData = async () => {
    const response = await put('get-apps', {
      pageNumber: 0,
      pageSize: 0
    });
    const data = await response?.json();
    setTableData(data);
  }

  useEffect(() => {
    fetchData()
    setTableData(mockData)
  }, [])

  const handleRowClick = (app: Application) => {
    setSelectedApp(app);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<{ value: string }>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const onModalClose = () => {
    setSelectedApp(undefined);
  }

  return (
    <div className='application-inventory-table'>
      <select value={rowsPerPage.toString()} onChange={handleChangeRowsPerPage}>
        <option value="25">25 rows per page</option>
        <option value="50">50 rows per page</option>
      </select>
      <Table columns={columns} data={mockData} rowClickHandler={handleRowClick} />
      {!!selectedApp && <ApplicationModal application={selectedApp} isOpen={!!selectedApp} onClose={onModalClose} />}
      
    </div>
  );
};

export default ApplicationInventoryTable;
