import React, { useState } from 'react';
import Arrow from '@material-ui/icons/SubdirectoryArrowRightOutlined';
import { Link, Tooltip } from '@material-ui/core';
import Modal from 'src/views/manager/ManagerView';

const Manager = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <Tooltip title="Manager">
        <Link
          component="button"
          variant="body2"
          style={{
            position: 'fixed', top: 32, left: 32, textDecoration: 'none'
          }}
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          <Arrow fontSize="medium" />
          ㅤManager
        </Link>
      </Tooltip>
      {openDialog && <Modal open={openDialog} onClose={handleDialogClose} />}
    </>
  );
};

export default Manager;
