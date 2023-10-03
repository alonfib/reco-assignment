import React, { useEffect, useState } from 'react';
import { Application } from '../types';
import CommonModal from '../../Common/Modal/Modal';
import CommonTable, { TableColumn } from '../../Common/Table/Table';
import './ApplicationModal.scss';
interface ModalProps {
  application: Application; // Assuming you pass an Application object as a prop
  onClose: () => void;
  isOpen?: boolean;
}

const collumns: TableColumn[] = [{ key: "user", label: 'Name' }]

const ApplicationModal: React.FC<ModalProps> = ({ application, isOpen = false, onClose }) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    if (isOpen !== open) setOpen(isOpen)
  }, [isOpen]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const tableData = application?.appSources?.map(source => ({ source }));

  return (
    <div>
      <button onClick={handleOpen}>Open Application Details</button>
      <CommonModal open={open} onClose={handleClose} title='App overview'>
        <div className="application-modal-container">
          <div className="application-details-container">
            <div className='detail'>Name: {application.appName}</div>
            <div className='detail'>Category: {application.category}</div>
            <div className='detail'>Users:{application.appSources.length}</div>
            <div className='detail'>Connectors: {application.appSources.join(', ')}</div>
          </div>
          <CommonTable columns={collumns} data={tableData} />
        </div>
      </CommonModal>
    </div>
  );
};

export default ApplicationModal;
