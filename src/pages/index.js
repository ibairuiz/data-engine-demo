import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import getToken from '../components/tokenFunctions'
import getDefaultAllCollection from '../components/allCollections'

/**
 * Clase de inicio, recupera las clases del 
 * Data Record Collection que ha debido de ser
 * creado por defecto previamente.
 */
class IndexPage extends React.Component {

  state = {
    loading: false,
    error: false,
    lessons:[],
    token: ''
  }

  componentDidMount() {
    if(this.state.lessons.length === 0) {
      this.setState({ loading: true })
      this.recuperaToken()
    }
  }

  render(){
    const clases = this.state.lessons
    return (
      <Layout>
      <SEO title="Home" />
      
      <h1>¡Hola!</h1>
      <p>Aquí tienes un listado de tus clases de guitarra.</p>
        {this.state.loading ? (
            <p>Cargando lecciones...</p>
        ) : clases ? (
            <>
              <h2>Has registrado {this.state.lessons.length} clases</h2>
              <Grid container spacing={3}>
                {this.state.lessons.map((clase) => (
                  <Grid item xs={6} key={clase.id}>
                    <Card className="card">
                      <CardContent>
                        <Typography className="title" color="textSecondary" gutterBottom>
                          Clase del dia {clase.dataRecordValues.fecha}
                        </Typography>
                        <Typography variant="h5" component="h2">
                          {clase.dataRecordValues.descripcion}
                        </Typography>
                        <Typography className="pos" color="textSecondary">
                          {clase.dataRecordCollectionId}
                        </Typography>
                        <Typography variant="body2" component="p">
                          {clase.dataRecordValues.ejercicios}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <a href={clase.dataRecordValues.enlace}><Button size="small">Ver Enlace</Button></a>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <p>No has registrado ninguna clase aún!</p>
          )}

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Link to="/create-lesson/">
            <Button
              variant="contained"
              color="primary"
              endIcon={<Icon>add</Icon>}>
                Crea una nueva clase
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Layout>  
    )
  }

  /**
   * Recupera el token OAUTH2 y lo almacena en el state.
   */
  recuperaToken = () => {
    getToken().then(response => {
      this.setState({token: response.data.access_token});
      this.recuperaClases()
    });
  }
  
  /**
   * Recupera las clases del Data Record Collection por defecto
   * y las guarda en el state del componente.
   */
  recuperaClases = () => {
    axios.get(`http://localhost:8080/o/data-engine/v1.0/data-record-collections/${getDefaultAllCollection()}/data-records`, {
          headers: {'Authorization': `Bearer ${this.state.token}`}
    })
    .then(response => {
      this.setState({ loading: false })
      this.setState({lessons:response.data.items});
    });
  }
}

export default IndexPage
