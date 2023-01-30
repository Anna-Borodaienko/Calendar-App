import React from 'react';
import CircumIcon from '@klarr-agency/circum-icons-react';
import { Link } from 'react-router-dom';
import { Button, Card } from '@mui/material';

export const MainPage: React.FC = () => {
  return (
    <Card
      sx={{
        height: '150px',
        width: '150px',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link to={'/calendar'}>
        <Button variant="contained">
          <CircumIcon name="calendar_date" color="#000" size="70px" />
        </Button>
      </Link>
    </Card>
  );
};
