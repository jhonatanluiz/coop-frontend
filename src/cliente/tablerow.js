
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CoopService from '../service/httpService';

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        if(window.confirm("Deseja realmente excluir o registro?")) {
            CoopService.removeClient(this.props.obj.id)
                .then(() => {
                    window.location ="/list"
                })
                .catch(err => console.log(err))
        }
    }

  render() {
    return (
        <tr>
          <td>
            {this.props.obj.noCliente}
          </td>
          <td>
            {this.props.obj.nuCpf}
          </td>
          <td>
          <Link to={"/edit/"+this.props.obj.id} className="btn btn-primary">Editar</Link>
          </td>
          <td>
             <Link to={"/view/"+this.props.obj.id} className="btn btn-primary">Visualizar</Link>
          </td>

          <td>
          <button onClick={this.delete} className="btn btn-danger">Excluir</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;