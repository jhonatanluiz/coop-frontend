import React, { Component } from 'react';
import CoopService from '../service/httpService';
import TableRow from './tablerow';


export default class IndexClienteComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {clientes: []};
      }
      componentDidMount(){
        CoopService.listClient()
          .then(response => {
            this.setState({ clientes: response.data });
          })
          .catch(function (error) {
            console.log(error);
          })
      }
      tabRow(){
        return this.state.clientes.map(function(object, i){
            return <TableRow obj={object} key={i} />;
        });
      }
  
      render() {
        return (
          <div>
            <h3 align="center">Lista de Clientes</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th colSpan="2">Acão</th>
                </tr>
              </thead>
              <tbody>
                { this.tabRow() }
              </tbody>
            </table>
          </div>
        );
      }
    }