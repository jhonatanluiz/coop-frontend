import React, { Component } from 'react';
import MaskedInput from 'react-maskedinput';
import CoopService from '../service/httpService';

export default class CadastroClienteComponent extends Component {
    constructor(props) {
        super(props);
    
        this.onSubmit = this.onSubmit.bind(this);
        this.loadAddress = this.loadAddress.bind(this);
        this.inputUpdate = this.inputUpdate.bind(this);
        this.addEmail = this.addEmail.bind(this);
        this.addTelefone = this.addTelefone.bind(this);

        this.state = {
            id: null,
            nuCep: '',
            noCliente: '',
            nuCpf: '',
            endereco: {
                id: null,
                coUf: '',
                dsComplemento:'',
                logradouro: '',
                noBairro: '',
                noCidade: '',
                nuCep: ''
            },
            emails:[],
            email: '',
            telefones: [],
            nuTelefone: '',
            coTipoTelefone: ''
        }

        
    }

    componentDidMount(){
        if(this.props.match.params.id !== undefined) {
        CoopService.getCliente(this.props.match.params.id)
          .then(response => {
             this.setState(response.data)
             this.setState({
                 nuCep: response.data.endereco.nuCep
             });
          })
          .catch(function (error) {
            console.log(error);
          })
        }
    }

    loadAddress(e) {

        this.setState({
           nuCep: e.target.value
        }, () => {
            if(this.state.nuCep.length === 10) {
                CoopService.cep(this.state.nuCep.replace(".", "").replace("-", "")).then( ( response) => {
                  this.setState({
                      endereco: response.data
                  },() => {console.log(this.state)})
                })
            }
        }) 
    }

    inputUpdate(e) {
        this.setState({ 
           [e.target.id]: e.target.value 
        })
    }

    addEmail(e) {
        
        const emails = this.state.emails;
        emails.push({dsEmail: this.state.email});
        this.setState({
            dsEmail: emails
        })

        this.setState({
            email: ''
        })
    }

    addTelefone(e){
        const telefones = this.state.telefones;
        
        telefones.push({
            nuTelefone: this.state.nuTelefone,
            coTipoTelefone: this.state.coTipoTelefone
        });

        this.setState({
            telefones: telefones
        })

        this.setState({
            nuTelefone: '',
            coTipoTelefone: ''
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const obj = {
          id: this.state.id,
          noCliente: this.state.noCliente,
          nuCpf: this.state.nuCpf.replaceAll(".", "").replace("-", ""),
          endereco: this.state.endereco,
          emails: this.state.emails,
          telefones: this.state.telefones
        };

        if(obj.id === null) {
            CoopService.saveClient( obj).then(() => {
                window.alert("Cadastro realizado com sucesso.");
                window.location = "/list";
            });
        } else {
            CoopService.editClient(this.state).then(() => {
                window.alert("Cadastro alterado com sucesso.");
                window.location = "/list";
            });
        }
    
    }
   
    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3> Cadastro Cliente </h3>
                <form onSubmit={this.onSubmit}>
                    <div class="form-row">
                        <div class="col">
                            <div className="form-group">
                                <label>Nome:  </label>
                                <input 
                                type="text" 
                                id="noCliente"
                                required
                                className="form-control" 
                                value={this.state.noCliente}
                                onChange={this.inputUpdate}
                                />
                            </div>
                        </div>
                        <div class="col">
                            <div className="form-group">
                                <label>CPF: </label>
                                <MaskedInput mask="111.111.111-11" 
                                id="nuCpf"
                                required
                                className="form-control"
                                value={this.state.nuCpf}
                                onChange={this.inputUpdate}
                                />
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                            <div class="col">
                                <div className="form-group">
                                    <label>Email:  </label>
                                    <input 
                                    type="text" 
                                    id="email"
                                    className="form-control" 
                                    value={this.state.email}
                                    onChange={this.inputUpdate}
                                    />
                                </div>
                            </div>
                            <div class="col">
                                <div className="form-group" style={{marginTop: '2em'}}>
                                    <input type="button" onClick={this.addEmail} value="Add Email" className="btn btn-primary"/>
                                </div>
                            </div>
    
                    </div>
                    <div class="form-row">
                        <ul>
                            {this.state.emails.map((item) => <li>{item.dsEmail}</li>)}
                        </ul>
                    </div>

                    <div class="form-row">
                            <div class="col-md-3">
                                <div className="form-group">
                                    <label>N Telefone:  </label>
                                    <input 
                                    type="text" 
                                    id="nuTelefone"
                                    className="form-control" 
                                    value={this.state.nuTelefone}
                                    onChange={this.inputUpdate}
                                    />
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div className="form-group">
                                    <label>N Telefone:  </label>
        
                                    <select value={this.state.coTipoTelefone} id="coTipoTelefone" className="form-control" onChange={(e) => {this.inputUpdate(e)}}>
                                    <option value=""> -- Selecione -- </option>
                                        <option value="0">RESIDENCIAL</option>
                                        <option value="1">COMERCIAL</option>
                                        <option value="2">CELULAR</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col">
                                <div className="form-group" style={{marginTop: '2em'}}>
                                    <input type="button" onClick={this.addTelefone} value="Add Telefone" className="btn btn-primary"/>
                                </div>
                            </div>
    
                    </div>
                    <div class="form-row">
                        <ul>
                        {
                            this.state.telefones.map((item) => 
                            <li>
                                {item.nuTelefone}/{item.coTipoTelefone === 0 ? 'RESIDENCIAL' : item.coTipoTelefone === 1 ? 'COMERCIAL': 'CELULAR'}
                            </li>
                            )
                        }
                        </ul>
                    </div>
                
                    <h4>Endereço</h4>
                    <div class="form-row">
                    <div class="col-md-2">
                        <div className="form-group">
                            <label><b>CEP:</b>  </label>
                            <div className="form-group">
                                <MaskedInput mask="11.111-111" 
                                id="nuCep"
                                required
                                className="form-control" 
                                value={this.state.nuCep}
                                onChange={(e) => {this.loadAddress(e)}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col">
                        <div className="form-group">
                            <label><b>Logradouro:</b>  </label>
    
                                <input 
                                type="text" 
                                readOnly
                                id="logradouro"
                                className="form-control" 
                                value={this.state.endereco.logradouro}
                                />
                        </div>
                    </div>
                    <div class="col">
                        <div className="form-group">
                            <label><b>Complemento:</b> </label>
                                <input 
                                type="text" 
                                id="dsComplemento"
                                className="form-control" 
                                value={this.state.endereco.dsComplemento}
                                />
                        </div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col">
                        <div className="form-group">
                            <label><b>Bairro:</b>  </label>
                                <input 
                                type="text" 
                                readOnly
                                id="noBairro"
                                className="form-control" 
                                value={this.state.endereco.noBairro}
                                />
                        </div>
                    </div>
                    <div class="col">
                        <div className="form-group">
                            <label><b>Cidade:</b> </label>
                                <input 
                                type="text" 
                                readOnly
                                id="noCidade"
                                className="form-control" 
                                value={this.state.endereco.noCidade}
                                />
                        </div>
                    </div>
                </div>
                <div class="form-row">
                <div class="col-md-2">
                        <div className="form-group">
                            <label><b>UF:</b> </label>
                                <input 
                                type="text" 
                                readOnly
                                id="coUf"
                                className="form-control" 
                                value={this.state.endereco.coUf}
                                />
                            </div>
                    </div>

                </div>
                <div className="form-group">
                        <input type="submit" value="Salvar" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
  }