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
    <List sx={{ margin: '0', padding: '0' }}>
      {tasks.map((item, idx) => (
        <ListItem
          key={idx}
          onClick={() => openTask(item)}
          disablePadding
          disableGutters
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.06)',
              borderRadius: '5px',
            },
            flexWrap: 'nowrap',
            fontSize: '10px',
          }}
        >
          <ListItemText sx={{ fontSize: '10px' }}>{item.title.slice(0, 10)}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};
