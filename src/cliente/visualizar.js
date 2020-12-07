import React, { Component } from 'react';
import CoopService from '../service/httpService';

export default class VisualizarClienteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {cliente: {emails:[], telefones: [], endereco:{}}};
    }

    componentDidMount(){
        CoopService.getCliente(this.props.match.params.id)
          .then(response => {
            this.setState({ cliente: response.data });
          })
          .catch(function (error) {
            console.log(error);
          })
    }

    render() {
        return (
            <fieldset>
                <legend>Dados Pessoais</legend>
                <div class="form-row">
                    <div class="col">
                        <div className="form-group">
                            <label><b>Nome:</b>  </label>
                            {this.state.cliente.noCliente}
                        </div>
                    </div>
                    <div class="col">
                        <div className="form-group">
                            <label><b>CPF:</b> </label>
                            {this.state.cliente.nuCpf}
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col">
                            <div className="form-group">
                                <label><b>Email:</b>  </label>
                                <ul>
                                    {this.state.cliente.emails.map((item) => <li>{item.dsEmail}</li>)}
                                </ul>
                            </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col">
                            <div className="form-group">
                                <label><b>Telefone:</b>  </label>
                                <ul>
                                    {this.state.cliente.telefones.map((item) => <li>{item.nuTelefone} - {item.coTipoTelefone}</li>)}
                                </ul>
                            </div>
                    </div>
                </div>
                <h4>Endereço</h4>
                <div class="form-row">
                    <div class="col">
                        <div className="form-group">
                            <label><b>Nome:</b>  </label>
                            {this.state.cliente.endereco.logradouro}
                        </div>
                    </div>
                    <div class="col">
                        <div className="form-group">
                            <label><b>Complemento:</b> </label>
                            {this.state.cliente.endereco.dsComplemento}
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col">
                        <div className="form-group">
                            <label><b>Bairro:</b>  </label>
                            {this.state.cliente.endereco.noBairro}
                        </div>
                    </div>
                    <div class="col">
                        <div className="form-group">
                            <label><b>Cidade:</b> </label>
                            {this.state.cliente.endereco.noCidade}/{} {this.state.cliente.endereco.coUf}
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col">
                        <div className="form-group">
                            <label><b>CEP:</b>  </label>
                            {this.state.cliente.endereco.nuCep}
                        </div>
                    </div>
                </div>
            </fieldset>
        )
    }
}