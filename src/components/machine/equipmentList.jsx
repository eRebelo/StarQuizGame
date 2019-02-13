import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RiseLoader } from 'react-spinners';

import { getEquipmentList, addEquipment, editInitEquipment, editEquipment, removeEquipment, cleanForm } from './equipmentActions'
import FormModal from './modal/formModal'
import DialogModal from './modal/dialogModal'

const mySelectTypes = [
    { value: 'CPE', text: 'CPE' },
    { value: 'ROUTER', text: 'Roteador' },
    { value: 'SWITCH', text: 'Switch' }
]

class EquipmentList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            equipmentToRemove: null,
            showFormModalAdd: false,
            showFormModalEdit: false,
            showDialogModal: false
        }

        /* Dialog Modal for add equipment */
        this.openModalAdd = this.openModalAdd.bind(this)
        this.closeModalAdd = this.closeModalAdd.bind(this)

        /* Dialog Modal for edit equipment */
        this.openModalEdit = this.openModalEdit.bind(this)
        this.closeModalEdit = this.closeModalEdit.bind(this)

        /* Dialog Modal for remove equipment */
        this.openModalRemove = this.openModalRemove.bind(this)
        this.closeModalRemove = this.closeModalRemove.bind(this)
    }

    matchTypeString(typeParam) {
        var response = '';
        for (let j = 0; j < mySelectTypes.length; j++) {
            if (mySelectTypes[j].value === typeParam) {
                response = mySelectTypes[j].text;
            }
        }
        return response;
    }

    /* Component of Lifecycle 'React' is called in component exhibition */
    componentWillMount() {
        this.props.getEquipmentList();
    }

    /* Open modal add equipment */
    openModalAdd() {
        this.setState({ showFormModalAdd: true });

        /* Remove the line below if you don't want to initialize the modal form */
        this.props.cleanForm();
    }

    /* Close modal add equipment */
    closeModalAdd() {
        this.setState({ showFormModalAdd: false });
        this.props.cleanForm();
    }

    /* Open modal add equipment */
    openModalEdit() {
        this.setState({ showFormModalEdit: true });
    }

    /* Close modal add equipment */
    closeModalEdit() {
        this.setState({ showFormModalEdit: false });
        this.props.cleanForm();
    }

    /* Open dialog modal remove equipment */
    openModalRemove() {
        this.setState({ showDialogModal: true });
    }

    /* Close dialog modal remove equipment */
    closeModalRemove() {
        this.setState({ showDialogModal: false });
    }

    render() {
        const { getEquipmentList, addEquipment, editInitEquipment, editEquipment, removeEquipment } = this.props

        const renderRows = () => {
            const list = this.props.list || []
            return list.map(equipment => (
                <tr key={equipment._id}>
                    <td>{this.matchTypeString(equipment.type)}</td>
                    <td>{equipment.hostname}</td>
                    <td>{equipment.ip_address}</td>
                    <td>{equipment.location}</td>
                    <td>{equipment.fabricator}</td>
                    <td>{equipment.model}</td>
                    <td>{equipment.serial}</td>
                    <td>{equipment.so_version}</td>
                    <td>{equipment.active_time}</td>
                    <td>
                        <button className='btn btn-info action-buttons' title='Visualizar'><i className='fa fa-info-circle'></i></button>
                        <button className='btn btn-success action-buttons' title='Editar'
                            onClick={
                                () => {
                                    editInitEquipment(equipment)
                                    this.openModalEdit()
                                }
                            }>
                            <i className='fa fa-edit'></i>
                        </button>
                        <button className='btn btn-danger action-buttons' title='Remover'
                            onClick={
                                () => {
                                    this.setState({ equipmentToRemove: equipment })
                                    this.openModalRemove()
                                }
                            }>
                            <i className='fa fa-trash-o'></i>
                        </button>
                    </td>
                </tr >
            ))
        }

        return (
            <div className='panel panel-default'>
                { /* Loading  */
                    this.props.loading ? (
                        <div className='overlay'>
                            <div className='spinner'>
                                <RiseLoader
                                    color={'#fff'}
                                    loading={this.props.loading}
                                />
                            </div>
                        </div>
                    ) : null
                }
                <div className='panel-body'>
                    <div className='panel-body-header'>
                        <button type='button' className='btn btn-dark' onClick={() => this.openModalAdd()}><i className='icon fa fa-plus-circle'></i>&nbsp;&nbsp;Adicionar</button>
                        <button type='button' className='btn btn-dark'><i className='fa fa-columns'></i>&nbsp;&nbsp;Colunas</button>
                        <button type='button' className='btn btn-dark' onClick={() => getEquipmentList()}><i className='fa fa-refresh'></i>&nbsp;&nbsp;Atualizar</button>

                        { /* Modal for add a new equipment  */
                            this.state.showFormModalAdd ? (
                                <FormModal confirmForm={() => { this.closeModalAdd() }} cancelForm={() => this.closeModalAdd()} onSubmit={addEquipment}
                                    formModalTitle='Inserir novo equipamento' formModalButton='Inserir' />
                            ) : null
                        }

                        { /* Modal for edit a equipment  */
                            this.state.showFormModalEdit ? (
                                <FormModal confirmForm={() => { this.closeModalEdit() }} cancelForm={() => this.closeModalEdit()} onSubmit={editEquipment}
                                    formModalTitle='Alterar equipamento' formModalButton='Alterar' />
                            ) : null
                        }

                        { /* Modal confirmation of equipment removal  */
                            this.state.showDialogModal ? (
                                <DialogModal cancelDialog={() => this.closeModalRemove()}
                                    confirmDialog={() => {
                                        this.closeModalRemove()
                                        removeEquipment(this.state.equipmentToRemove)
                                    }}
                                    hostname={this.state.equipmentToRemove.hostname} />
                            ) : null
                        }
                    </div>
                    <div className='container'>
                        <div className='row data-table'>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Tipo</th>
                                        <th scope='col'>Hostname</th>
                                        <th scope='col'>IP</th>
                                        <th scope='col'>Localização</th>
                                        <th scope='col'>Fabricante</th>
                                        <th scope='col'>Modelo</th>
                                        <th scope='col'>Serial</th>
                                        <th scope='col'>Versão SO</th>
                                        <th scope='col'>Tempo Ativo</th>
                                        <th scope='col'>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderRows()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.machine.loading,
        list: state.machine.list
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getEquipmentList, addEquipment, editInitEquipment, editEquipment, removeEquipment, cleanForm }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentList)