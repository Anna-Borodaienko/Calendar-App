/* eslint-disable no-unused-vars */
import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { Task } from '../Models/Task';

interface Props {
  tasks: Task[];
  openTask: (item: Task) => void;
}

export const TasksList: React.FC<Props> = ({ tasks, openTask }) => {
  return (
    <List>
      {tasks.map((item, idx) => (
        <ListItem key={idx} onClick={() => openTask(item)} disablePadding>
          <ListItemText>{item.title}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};
