import React, { useState, useEffect, useRef } from 'react';
import Table from '../Common/Table/Table';
import { get, put } from '../../api';
import { Application } from './types';
import ApplicationSlider from './ApplicationModal/ApplicationSlider';
import './ApplicationInventoryTable.scss';
import { columns } from './columns';
import useInfiniteScroll from '../hooks/useInfiniteScroll';


const ApplicationInventoryTable: React.FC = () => {
  const [tableData, setTableData] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | undefined>();
  const [rowsPerPage, setRowsPerPage] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalAppsCount, setTotalAppsCount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [refetchAttempts, setRefetchAttempts] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ref = useRef<any>(null);
  const infiniteScroll = useInfiniteScroll(ref, 0, async () => handlePageChange(currentPage + 1))

  const fetchData = async ({ page = currentPage, size = rowsPerPage }) => {
    setIsLoading(true);
    const response = await get('', {
      pageNumber: page,
      pageSize: size,
    });

    console.log("response", response)
    if (!response) {

    }

    if (response !== undefined) {
      const newData: Application[] = response?.appRows;
      const newTotalCount: number = response?.totalCount;
      setTotalAppsCount(newTotalCount)
      setTableData(newData);
      setRefetchAttempts(0);
      setIsLoading(false);
    } else {
      console.warn("Refetching.")
      setErrorMessage(`Could not fetch data, Refetching! attempt - ${refetchAttempts + 1}`);
      if (refetchAttempts < 3) {
        setTimeout(async () => {
          setRefetchAttempts(refetchAttempts + 1)
          await fetchData({ page, size });
          setErrorMessage("");
        }, 1000);
      } else {
        console.warn("Could not fetch data, Reload page.")
        setErrorMessage("Could not fetch data, please reload the page");
        setIsLoading(false);
      }
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
    <div className="application-inventory-table" ref={ref}>
        <div className="title">App Inventory</div>
        {errorMessage.length > 0 ? <div className="error-message">{errorMessage}</div>
          :

          <Table columns={columns} data={tableData} rowClickHandler={handleRowClick} />
        }
        {!!selectedApp && <ApplicationSlider application={selectedApp} isOpen={!!selectedApp} onClose={onModalClose} />}
    </div>
  );
};

export default ApplicationInventoryTable;
