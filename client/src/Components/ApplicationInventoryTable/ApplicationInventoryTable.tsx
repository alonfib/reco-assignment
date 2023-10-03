import React, { useState, useEffect } from 'react';
import Table from '../Common/Table/Table';
import { get, put } from '../../api';
import { Application } from './types';
import ApplicationModal from './ApplicationModal/ApplicationModal';
import './ApplicationInventoryTable.scss';
import { columns } from './columns';

const ApplicationInventoryTable: React.FC = () => {
  const [tableData, setTableData] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | undefined>();
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [totalAppsCount, setTotalAppsCount] = useState<number>(0);

  const fetchData = async ({ page = currentPage, size = rowsPerPage }) => {
    const response = await get('', {
      pageNumber: page,
      pageSize: size,
    });

    if (response) {
      const newData: Application[] = response?.appRows;
      const newTotalCount: number = response?.totalCount;
      setTotalAppsCount(newTotalCount)
      setTableData(newData);
    }
  };

  useEffect(() => {
    fetchData({});
  }, []);

  const handleRowClick = (app: Application) => {
    setSelectedApp(app);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<{ value: string }>) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setCurrentPage(0);
    setRowsPerPage(newRowsPerPage);
    fetchData({ size: newRowsPerPage, page: 0 });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchData({ page: newPage, size: rowsPerPage });
  };

  const onModalClose = () => {
    setSelectedApp(undefined);
  };

  return (
    <div className="application-inventory-table">
      <div className="title">App Inventory</div>
      <Table columns={columns} data={tableData} rowClickHandler={handleRowClick} />
      <div className="pagination">
        <div className="page-navigation">
          <button
            disabled={currentPage === 0}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span>{`Page ${currentPage + 1} of ${totalAppsCount / rowsPerPage}`}</span>
          <button
            disabled={(currentPage + 1) * rowsPerPage >= totalAppsCount}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
        <select value={rowsPerPage.toString()} onChange={handleChangeRowsPerPage}>
          <option value="25">25 rows per page</option>
          <option value="50">50 rows per page</option>
        </select>
      </div>
      {!!selectedApp && <ApplicationModal application={selectedApp} isOpen={!!selectedApp} onClose={onModalClose} />}
    </div>
  );
};

export default ApplicationInventoryTable;
