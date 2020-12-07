import React, { Component } from 'react';
import AuthService from '../service/authService';
import CoopService from '../service/httpService';



export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.onChangePersonName = this.inputUpdate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
  
        this.state = {
            email: '',
            password: ''
        }
    }

    inputUpdate = e => {
        this.setState({ 
           [e.target.id]: e.target.value 
        })
    };

    onSubmit(e) {
        e.preventDefault();
        
        let login = {
          email: this.state.email,
          password: this.state.password,
          rememberMe: false
        };


        CoopService.auth( login)
            .then(res => {
                AuthService.login(res.data.id_token);
                window.location = "/list";
            });
        
        this.setState({
            email: this.state.email,
            password: this.state.password
        });
    }
   
    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3> Login </h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group col-md-4">
                        <label>Email: </label>
                        <input type="text" 
                          id="email"
                          className="form-control"
                          value={this.state.email}
                          onChange={this.inputUpdate}
                          />
                    </div>
                    <div className="form-group col-md-4">
                        <label>Senha: </label>
                        <input type="password" 
                          className="form-control "
                          id="password"
                          value={this.state.password}
                          onChange={this.inputUpdate}
                          />
                    </div>
                    <div className="form-group form-group col-md-4">
                        <input type="submit" value="Entrar" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
  }