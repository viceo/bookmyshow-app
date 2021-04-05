import './App.css';
import {
  Paper, FormControl, InputLabel, Select, Badge,
  MenuItem, Grid, Container, TextField, IconButton
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react'
import { bms_getCities, bms_getShows } from './_http_apis/bookmyshowapi'
import ShowCard from './_components/ShowCard'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingModal from './_components/ShoppingModal'

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

function App() {

  //? APIs
  const [logoUrl] = useState('https://bookmyshow-public.s3.amazonaws.com/bookmyshow_logo.jpg')

  //* Catalogos
  const [catalogoCiudades, setCatalogoCiudades] = useState([])
  const [catalogoShows, setCatalogoShows] = useState([])

  //* Valores seleccionados
  const [selectedCiudad, setSelectedCiudad] = useState('Monterrey')

  //* Lista reservaciones
  const [listaReservaciones, setListaReservaciones] = useState([])

  //* Modal
  const [mostrarModal, setMostrarModal] = useState(false)

  //* Funciones
  const pushReservacion = (reservacion) => setListaReservaciones([...listaReservaciones, reservacion])

  //* Cargar datos iniciales
  useEffect(() => {
    const fetchAPIs = async () => {
      try {
        const cargarCatalogosResponse = await Promise.all([
          bms_getShows(selectedCiudad),
          bms_getCities()
        ])

        const [showsResponse, citiesResponse] = cargarCatalogosResponse
        setCatalogoShows(showsResponse.shows)
        setCatalogoCiudades(citiesResponse.cities)
      }
      catch (e) {
        console.log('fetchAPIs | error', e)
      }
    }
    fetchAPIs()
  }, [selectedCiudad])


  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <ShoppingModal open={mostrarModal} setMostrarModal={setMostrarModal} listaReservaciones={listaReservaciones} />
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
            <IconButton aria-label="cart" onClick={() => setMostrarModal(true)}>
              <StyledBadge badgeContent={listaReservaciones.length} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Paper>
        </Grid>
        <Grid item xs={12} className="bms_shows__container">
          {
            catalogoShows.map((x, indx) => <ShowCard data={x} defaultPosterUrl={logoUrl} pushReservacion={pushReservacion} />)
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
