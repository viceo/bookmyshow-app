import './App.css';
import { withAuthenticator } from '@aws-amplify/ui-react'

import { Paper, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

function App() {
  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <Paper elevation={3}>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={10}
            onChange={(e) => {}}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Paper>
    </>
  );
}

export default withAuthenticator(App);
