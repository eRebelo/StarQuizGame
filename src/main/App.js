import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css'
import '../assets/custom.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RiseLoader } from 'react-spinners';
import { getCharacters, getHomeworld, getFilms, getVehicles, getSpecies, setImages } from '../components/app/appActions';

import Menu from '../template/menu'
import Routes from './routes'
import MessagesToastr from '../widgets/messagesToastr'
import consts from './consts'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      charactersPreviousPage: consts.API_URL,
    }
  }

  // Life Cycle: This method is called when render is called
  componentWillMount() {
    // Get characters
    if (this.props.charactersNextPage !== null) {
      this.props.getCharacters(consts.API_URL);
    }
  }

  componentWillReceiveProps() {
    //this.props.setImages();

    // Logic to get the next page of the characters
    if (this.props.charactersNextPage !== null && (this.props.charactersNextPage !== this.state.charactersPreviousPage)) {
      this.setState({ charactersPreviousPage: this.props.charactersNextPage });
      this.props.getCharacters(this.props.charactersNextPage);
    }
  }

  render() {
    if (this.props.charactersNextPage === null && (this.props.charactersNextPage !== this.state.charactersPreviousPage)
      && this.props.characters.length === 87) {

      // Get the homeworld
      for (let i = 0; i < this.props.characters.length; i++) {
        this.props.getHomeworld(this.props.characters[i].name, this.props.characters[i].homeworld);

        // Get the films
        for (let j = 0; j < this.props.characters[i].films.length; j++) {
          this.props.getFilms(this.props.characters[i].name, this.props.characters[i].films[j]);
        }

        // Get the vehicles
        for (let k = 0; k < this.props.characters[i].vehicles.length; k++) {
          this.props.getVehicles(this.props.characters[i].name, this.props.characters[i].vehicles[k]);
        }

        // Get the species
        for (let m = 0; m < this.props.characters[i].species.length; m++) {
          this.props.getSpecies(this.props.characters[i].name, this.props.characters[i].species[m]);
        }
      }

      // Set the images
      this.props.setImages();
    }

    return (
      <div className='body'>
        { /* Spinner  */
          this.props.charactersNextPage !== null ? (
            <div className='overlay'>
              <div className='spinner'>
                <RiseLoader color={'#fff'} />
              </div>
            </div>
          ) : (
              <div>
                <Menu />
                <Routes />
                <MessagesToastr />
              </div>
            )
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    characters: state.app.characters,
    charactersNextPage: state.app.charactersNextPage
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCharacters, getHomeworld, getFilms, getVehicles, getSpecies, setImages }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)