import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import VisualizarClienteComponent from './cliente/visualizar';
import CadastroClienteComponent from './cliente/cadastro';
import IndexClienteComponent from './cliente';
import LoginComponent from './login/login';
import LogoutComponent from './login/logout';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">COOP Teste</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Cadastro</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/list'} className="nav-link">Listar</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/logout'} className="nav-link">Sair</Link>
                </li>
              </ul>
            </div>
          </nav> <br/>
          <Switch>
              <Route exact path='/create' component={ CadastroClienteComponent } />
              <Route path='/edit/:id' component={ CadastroClienteComponent } />
              <Route path='/view/:id' component={ VisualizarClienteComponent } />
              <Route path='/list' component={ IndexClienteComponent } />
              <Route path='/login' component={ LoginComponent } />
              <Route path='/logout' component={ LogoutComponent } />

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
