import React, { ReactNode, useEffect, useState } from 'react';
import {
  Typography,
  IconButton,
  Paper,
  Box,
  Slide,
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
  modalContainer: {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 9999,
    transition: 'transform 0.3s ease-out',
    transform: 'translateX(100%)',
  },
  modalContent: {
    height: '100vh',
    width: '70vw',
    padding: '16px 40px',
    backgroundColor: 'white',
    overflowY: 'auto',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
}));

const CommonSlider: React.FC<Props> = ({
  open,
  onClose,
  children,
  title,
  customStyles,
}) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    if (open) {
      setIsOpen(true);
    } else {
      setTimeout(() => setIsOpen(false), 300); // Delay closing to allow animation
    }
  }, [open]);

  return (
    <div
      className={classes.modalContainer}
      style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
      onClick={onClose}
    >
      {/* e.stopPropagation for perventing slider close onClick */}
      <Slide direction="left" in={isOpen} onClick={e => e.stopPropagation()}>
        <Paper className={classes.modalContent} style={customStyles}>
          <Box className={classes.modalHeader}>
            {title && <Typography variant="h6">{title}</Typography>}
            <IconButton onClick={onClose} color="inherit">
              <CloseIcon />
            </IconButton>
          </Box>
          {children}
        </Paper>
      </Slide>
    </div>
  );
};

export default CommonSlider;
