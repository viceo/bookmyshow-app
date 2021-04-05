import './App.css';
import {
  Paper, FormControl, InputLabel, Select,
  MenuItem, Grid, Container, TextField
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import { BookmyshowApi } from './_http_apis/Bookmyshow.api'
import ShowCard from './_components/ShowCard'

function App() {

  //? APIs
  const bookMyShowAPI = new BookmyshowApi()
  const [logoUrl] = useState('https://bookmyshow-public.s3.amazonaws.com/bookmyshow_logo.jpg')

  //* Catalogos
  const [catalogoCiudades, setCatalogoCiudades] = useState([])
  const [catalogoShows, setCatalogoShows] = useState([])

  //* Valores seleccionados
  const [selectedCiudad, setSelectedCiudad] = useState('Monterrey')

  //* Cargar datos iniciales
  useEffect(() => {
    const fetchAPIs = async () => {
      try {
        const cargarCatalogosResponse = await Promise.all([
          bookMyShowAPI.getShows(selectedCiudad),
          bookMyShowAPI.getCities()
        ])

        const [showsResponse, citiesResponse] = cargarCatalogosResponse
        setCatalogoShows(showsResponse.shows)
        setCatalogoCiudades(citiesResponse.cities)
        console.log(cargarCatalogosResponse)
      }
      catch (e) {
        console.log('fetchAPIs | error', e)
      }
    }
    fetchAPIs()
  }, [ selectedCiudad ])


  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <Container>
        <Grid item xs={12}>
          <Paper elevation={3} className="bms_search">
            <img src={logoUrl} className="bms_search__logo" />
            <TextField label="Busca películas y eventos" className="bms_search__input" />
            <FormControl className="bms_search__select">
              <InputLabel id="demo-simple-select-label">Ciudades</InputLabel>
              <Select
                value={selectedCiudad}
                onChange={(e) => setSelectedCiudad(e.target.value)}
              >
                {
                  catalogoCiudades.map((x, indx) => <MenuItem key={indx} value={x}>{x}</MenuItem>)
                }
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12} className="bms_shows__container">
              {
                catalogoShows.map((x, indx) => <ShowCard data={x} defaultPosterUrl={logoUrl} />)
              }
        </Grid>
      </Container>
    </>
  );
}

// https://pandeysoni.medium.com/how-to-setup-customize-amplify-authentication-ui-using-hooks-36442f5fdc
export default App
// export default withAuthenticator(App, {
//   usernameAttributes: 'email',
//   signupConfig: {
//     hiddenDefaults: ['phone_number'],
//     signUpFields: [{ key: 'name', label: 'Nombre', required: true }]
//   }
// });
