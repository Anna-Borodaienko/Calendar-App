/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form } from 'formik';
import CircumIcon from '@klarr-agency/circum-icons-react';
import cn from 'classnames';

interface Props {
  modalIsOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

import styles from './ModalWindow.module.scss';

export const ModalWindow: React.FC<Props> = ({ modalIsOpen, setIsOpen }) => {
  const [titleIsEmpty, setTitleIsEmpty] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const validateTitle = (title: string) => {
    if (!title) {
      setTitleIsEmpty(true);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      className={styles.modal}
      overlayClassName={styles.overlay}
      ariaHideApp={false}
    >
      <div className={styles.header}>
        <p className={styles.title}>Add new idea item</p>
        <button onClick={closeModal} className={styles.close}>
          <CircumIcon name="square_remove" color="#000" size="30px"></CircumIcon>
        </button>
      </div>
      <Formik
        initialValues={{
          title: '',
          description: '',
          date: '',
          beginTime: '',
        }}
        onSubmit={(values) => {
          console.log(JSON.stringify(values, null, 2));
        }}
      >
        {({ validateForm }) => (
          <Form className={styles.form}>
            <label htmlFor="title" className={styles.label}>
              Title*
            </label>
            <Field
              id="title"
              name="title"
              placeholder={titleIsEmpty ? 'Title is required!' : 'Title goes here'}
              className={cn(styles.input, styles.name, { titleIsEmpty: styles.alarm })}
              validate={validateTitle}
            />

            <label htmlFor="description" className={styles.label}></label>
            <Field
              id="description"
              name="description"
              placeholder="Description"
              className={cn(styles.input, styles.description)}
              as="textarea"
              rows="4"
            />

            <div className={styles.time}>
              <div className={styles.date}>
                <label htmlFor="date" className={styles.label}>
                  Date*
                </label>
                <Field id="date" name="date" className={cn(styles.input, styles.day)} />
              </div>

              <div className={styles.date}>
                <label htmlFor="beginTime" className={styles.label}>
                  Begin time
                </label>
                <Field
                  id="beginTime"
                  name="beginTime"
                  placeholder="--:--"
                  className={cn(styles.input, styles.begin)}
                />
              </div>
            </div>
            <button
              type="submit"
              className={styles.button}
              onClick={() => validateForm().then(() => console.log('blah'))}
            >
              Save
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
