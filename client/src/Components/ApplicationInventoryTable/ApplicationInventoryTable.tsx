import React, { useState,useEffect } from 'react';
import Table from '../Common/Table/Table';
import { get, put } from '../../api';
import { Application } from './types';
import ApplicationModal from './ApplicationModal/ApplicationModal';


const mockData: Application[] = [
  {
    appName: 'Application 1',
    category: 'Category A',
    appSources: ['Connector 1', 'Connector 2'],
    appId: 'User 1',
  },
  {
    appName: 'Application 2',
    category: 'Category B',
    appSources: ['Connector 3', 'Connector 4'],
    appId: 'User 4',
  },
  {
    appName: 'Application 3',
    category: 'Category A',
    appSources: ['Connector 2', 'Connector 5'],
    appId: 'User 1',
  },
  // Add more mock data entries as needed
];

const columns: { label: string, key: string }[] = [
  {
    label: 'Application name',
    key: 'appName',
  },
  {
    label: 'Category',
    key: 'category',
  },
  {
    label: 'Connectors (Data source)',
    key: 'appSources',
  },
];

const ApplicationInventoryTable: React.FC = ({ }) => {
  const [tableData, setTableData] = useState<Application[]>([]); 
  const [selectedApp, setSelectedApp] = useState<Application | undefined>();
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);


  const fetchData = async ({page = currentPage, size = rowsPerPage}) => {
    const response  = await get('', {
      pageNumber: page,
      pageSize: size
    });

    const newData:Application[] = response?.appRows;
    setTableData(newData);

    console.log("newData", newData)
  }

  useEffect(() => {
    fetchData({})
  }, [])

  const handleRowClick = (app: Application) => {
    setSelectedApp(app);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<{ value: string }>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    fetchData({ size: newRowsPerPage });
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
      <Table columns={columns} data={tableData} rowClickHandler={handleRowClick} />
      {!!selectedApp && <ApplicationModal application={selectedApp} isOpen={!!selectedApp} onClose={onModalClose} />}
      
    </div>
  );
};

export default ApplicationInventoryTable;
