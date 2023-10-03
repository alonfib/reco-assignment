import React, { useEffect, useState } from 'react';
import { Application } from '../types';
import CommonModal from '../../Common/Modal/Modal';
import CommonTable, { TableColumn } from '../../Common/Table/Table';

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

  const tableData = application.users.map(user => ({ user }));

  return (
    <div>
      <button onClick={handleOpen}>Open Application Details</button>
      <CommonModal open={open} onClose={handleClose}>
        <h2>Application Details</h2>
        <p><strong>Name:</strong> {application.name}</p>
        <p><strong>Category:</strong> {application.category}</p>
        <p><strong>Connectors:</strong> {application.connectors.join(', ')}</p>
        <p><strong>Users:</strong>{application.users.length}</p>
        <CommonTable columns={collumns} data={tableData} />
        <button onClick={handleClose}>Close</button>
      </CommonModal>
    </div>
  );
};

export default ApplicationModal;
