import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import Button from '@mui/material/Button';

const styles1 = {
  backgroundColor: "black",
  color: "white",
  border: "3px solid black",
  '&:hover': {
    border: "3px solid black",
    color: "black",
    backgroundColor: "white",
    fontWeight: 'bold'
  }
}

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />

      <center>
        <Button
          variant="contained" sx={{ ...styles1, mt: 2, mr: 2, width: '98px' }}
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
