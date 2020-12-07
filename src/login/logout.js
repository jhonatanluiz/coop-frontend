import React, { Component } from 'react';
import AuthService from '../service/authService';
import CoopService from '../service/httpService';



export default class LogoutComponent extends Component {
    constructor(props) {
        super(props);
        
        AuthService.logout();
        window.location = "/login";
    }

  }