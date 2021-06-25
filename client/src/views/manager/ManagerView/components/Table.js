import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import MaterialTable from 'material-table';
import Alert from '@material-ui/lab/Alert';
import Label from 'src/components/Label';
import { SkeletonTable } from 'src/components/Skeleton';
import Add from '@material-ui/icons/LibraryAddOutlined';
import Dialog from './Dialog';

const Table = ({
  data,
  iserror,
  errorMessages,
  handleRowUpdate,
  loading,
  setOpenDialog,
  openDialog,
  handleDialogClose
}) => {
  const columns = [
    {
      title: '_id',
      field: '_id',
      hidden: true
    },
    {
      title: 'Activate',
      field: 'activate',
      filtering: true,
      lookup: {
        0: 'Not in use',
        1: 'In use'
      },
      render: (rowData) => {
        if (rowData.activate === 0) {
          return (
            <Label variant="outlined" color="rgb(229, 57, 53)" key={rowData.activate}>
              Not in use
            </Label>
          );
        }
        if (rowData.activate === 1) {
          return (
            <Label variant="outlined" color="rgb(67, 160, 71)" key={rowData.activate}>
              In use
            </Label>
          );
        }
        return false;
      }
    },
    {
      title: 'Input',
      field: 'input',
      filtering: false
    },
    {
      title: 'Output',
      field: 'output',
      filtering: false
    },
    {
      title: 'Created At',
      field: 'createdAt',
      filtering: false,
      editable: 'never',
      type: 'datetime'
    }
  ];

  const actions = [
    {
      icon: () => <Add />,
      tooltip: 'Add',
      onClick: () => {
        setOpenDialog(true);
      }
    }
  ];

  if (loading) {
    return <SkeletonTable />;
  }

  return (
    <>
      <Box mt={3}>
        {iserror && (
          <Alert severity="error">
            {errorMessages.map((msg) => {
              return <div>{msg}</div>;
            })}
          </Alert>
        )}
        <MaterialTable
          options={{
            exportButton: false,
            filtering: true
          }}
          title=""
          columns={columns}
          actions={actions}
          data={data}
          editable={{
            onRowUpdate: (newData, oldData) => new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
            })
          }}
        />
      </Box>
      {openDialog && <Dialog open={openDialog} onClose={handleDialogClose} />}
    </>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  handleRowUpdate: PropTypes.func.isRequired,
};

export default Table;
