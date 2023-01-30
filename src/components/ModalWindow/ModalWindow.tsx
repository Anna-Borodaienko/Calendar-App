/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import Modal from 'react-modal';
import CircumIcon from '@klarr-agency/circum-icons-react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, TextField, Button, InputLabel } from '@mui/material';
import moment from 'moment';

interface Props {
  modalIsOpen: boolean;
  setIsOpen: (value: boolean) => void;
  addTask: (values: Task) => void;
  editedTask: Task;
  editTask: (task: Task, values: Task) => void;
  deleteTask: (task: Task) => void;
}

import styles from './ModalWindow.module.scss';
import { Task } from '../Models/Task';

export const ModalWindow: React.FC<Props> = ({
  modalIsOpen,
  setIsOpen,
  addTask,
  editedTask,
  editTask,
  deleteTask,
}) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string(),
    date: yup.date().required('Date is required'),
    beginTime: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      date: '',
      beginTime: '00:00',
      createdAt: moment(),
    },
    validationSchema: validationSchema,
    onSubmit: (values: Task) => {
      console.error(values);
      if (!editedTask.createdAt) {
        addTask(values);
        formik.resetForm();
        closeModal();
        return;
      }
      editTask(editedTask, values);
      formik.resetForm();
      closeModal();
    },
  });

  const setInitialValuesIfEdit = () => {
    if (editedTask.createdAt) {
      formik.setValues({ ...editedTask });
    }
  };

  useEffect(() => {
    setInitialValuesIfEdit();
  }, [editedTask]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <div className={styles.header}>
        <div className={styles.title}>
          <p>{editedTask.createdAt ? 'Edit idea item' : 'Add new idea item'}</p>
          <p className={styles.subtitle}>
            {editedTask.updatedAt
              ? `Updated at ${moment(editedTask.updatedAt).format('YYYY-MM-DD HH:mm')}`
              : null}
            {editedTask.createdAt && !editedTask.updatedAt
              ? `Created at ${moment(editedTask.createdAt).format('YYYY-MM-DD HH:mm')}`
              : null}
          </p>
        </div>

        <button onClick={closeModal} className={styles.close}>
          <CircumIcon name="square_remove" color="#000" size="30px"></CircumIcon>
        </button>
      </div>

      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <Box sx={{ mb: 3 }} component="form">
          <InputLabel>Title*</InputLabel>
          <TextField
            fullWidth
            id="title"
            name="title"
            placeholder="Title goes here"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </Box>
        <Box sx={{ mb: 2 }} component="form">
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </Box>
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
          component="form"
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <InputLabel>Date*</InputLabel>
            <TextField
              id="date"
              name="date"
              type="date"
              value={formik.values.date}
              onChange={formik.handleChange}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
            />
          </Box>
          <Box>
            <InputLabel>Begin Time</InputLabel>
            <TextField
              id="beginTime"
              name="beginTime"
              type="time"
              value={formik.values.beginTime}
              onChange={formik.handleChange}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex' }}>
          {editedTask.createdAt && (
            <Button
              // type="submit"
              sx={{ display: 'block', mr: 'auto', ml: 1 }}
              variant="contained"
              color="error"
              onClick={() => deleteTask(editedTask)}
            >
              Delete
            </Button>
          )}

          <Button type="submit" sx={{ display: 'block', mr: 1, ml: 'auto' }} variant="contained">
            Save
          </Button>
        </Box>
      </form>
    </Modal>
  );
};
