import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import getToken from '../components/tokenFunctions'
import getDefaultAllCollection from '../components/allCollections'

class CreateLesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descripcion: '',
      ejercicios: '',
      fecha: '',
      enlace: '',
      token: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    //event.preventDefault();
    this.fetchTokenAndSave();

  }

  render() {
    return (
      <Layout>
        <SEO title="Page two" />
        <h1>Registra una lección</h1>
        <form className="form-container" action="/" noValidate autoComplete="off" id="lesson-form" onSubmit={this.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                  id="descripcion"
                  name="descripcion"
                  label="Descripcion"
                  placeholder="¿De que trató la clase?"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  id="ejercicios"
                  name="ejercicios"
                  label="Ejercicios"
                  placeholder="¿Qué te mandó Tony en su día?"
                  margin="dense"
                  variant="outlined"
                  multiline
                  rowsMax="4"
                  onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  id="fecha"
                  name="fecha"
                  label="Fecha"
                  placeholder="¿Qué dia fue la clase?"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  id="enlace"
                  name="enlace"
                  label="Enlace"
                  placeholder="¿Tienes algún enlace ?"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange}  
              />
            </Grid>      
          </Grid>        

        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<Icon>redo</Icon>}>
                <Link to="/" className="link-inside-button">Cancelar</Link>
            </Button>
          </Grid>      
          <Grid item xs={2}>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              onClick={this.handleSubmit}
              endIcon={<Icon>send</Icon>}>
                <Link to="/" className="link-inside-button">Guardar</Link>
            </Button>
          </Grid>
        </Grid>
        </form>
      </Layout>
    )
  }

  fetchTokenAndSave = () => {
    getToken().then(response => {
      this.setState({token: response.data.access_token});
      this.saveLesson()
    });
  }

  saveLesson = () => {
    axios.post(`http://localhost:8080/o/data-engine/v1.0/data-record-collections/${getDefaultAllCollection()}/data-records`,{

        dataRecordValues: {
          fecha: this.state.fecha,
          descripcion: this.state.descripcion,
          ejercicios: this.state.ejercicios,
          enlace: this.state.enlace
        }
      } ,{
        headers: {'Authorization': `Bearer ${this.state.token}`}
      })
    .then(response => {
    
      console.log(response.data);
      
    });
  }

}


export default CreateLesson
