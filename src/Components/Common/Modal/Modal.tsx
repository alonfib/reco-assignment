import React, { ReactNode } from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  IconButton,
  Paper,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import CloseIcon from '@mui/icons-material/Close';

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  customStyles?: React.CSSProperties;
}

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    "&:focus": {
      outline: "none"
    }
  },
  modalContent: {
    position: 'relative',
    height: '90vh',
    width: '80vw',
    overflowY: 'auto',
    border: 'none',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const CommonModal: React.FC<Props> = ({
  open,
  onClose,
  children,
  title,
  customStyles,
}) => {
  const classes = useStyles();



  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      className={classes.modal}
      style={{ border: 'none' }}
    >
      <Fade in={open}>
        <Paper
          className={classes.modalContent}
          style={customStyles}
        >
          {title && (
            <Box className={classes.modalHeader}>
              <Typography variant="h6">{title}</Typography>
              <IconButton onClick={onClose} color="inherit">
                <CloseIcon />
              </IconButton>
            </Box>
          )}
          {children}
        </Paper>
      </Fade>
    </Modal>
  );
};

export default CommonModal;
