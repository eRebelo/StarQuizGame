import React, { Component } from 'react'
import Modal from 'react-modal';
import { reduxForm, Field } from 'redux-form'
import { Popover, Collapse } from 'react-bootstrap'

const required = value => value ? undefined : 'Campo obrigatório';

const renderTextField = ({ input, label, type, placeholder, meta: { touched, error }, ...rest }) => (
    <div>
        <input {...input} {...rest} label={label} type={type} placeholder={placeholder} className={'form-control ' + (touched && error ? 'error-input' : '')} />
        {touched && (error && <Popover id='popover-error' placement='top'>{error}</Popover>)}
    </div>
);

const renderSelectField = ({ input, meta: { touched, error }, children }) => (
    <div>
        <div>
            <select {...input} className={'form-control ' + (touched && error ? 'error-input' : '')}>
                {children}
            </select>
            {touched && (error && <Popover id='popover-error' placement='top'>{error}</Popover>)}
        </div>
    </div>
);

class FormModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: true,
            errors: false,
            openToogle: true,
            /* mySelectTypes: [] */
        }

        this.keyHandler = this.keyHandler.bind(this)
        this.confirmAction = this.confirmAction.bind(this)
        this.close = this.close.bind(this)
    }

    componentWillMount() {
        this.selectOptions();
    }

    /* Component of Lifecycle 'React' is called in change of the state */
    componentWillReceiveProps(nextProps) {
        if (nextProps.invalid) {
            this.setState({ errors: true });
        } else {
            this.setState({ errors: false });
        }
    }

    /* Function that performs an action when to press a key */
    keyHandler(e) {
        if (e.key === 'Enter') {
            if (!this.state.errors) {
                this.confirmAction()
            }
        } else if (e.key === 'Escape') {
            this.close()
        }
    }

    selectOptions = () => {
        // There are two forms to initialize a select types
        /* this.setState({
            mySelectTypes: [
                { value: 'CPE', text: 'CPE' },
                { value: 'ROUTER', text: 'Roteador' },
                { value: 'SWITCH', text: 'Switch' }
            ]
        }); */
        this.mySelectTypes = [
            { value: 'CPE', text: 'CPE' },
            { value: 'ROUTER', text: 'Roteador' },
            { value: 'SWITCH', text: 'Switch' }
        ];
    }

    confirmAction() {
        this.setState({ showModal: false })
        this.props.confirmForm()
        this.props.handleSubmit()
    }

    close() {
        this.setState({ showModal: false })
        this.props.cancelForm()
    }

    render() {
        const { handleSubmit } = this.props
        const customStyles = {
            overlay: {
                position: 'fixed',
                backgroundColor: 'rgba(0, 0, 0, 0.6)'
            },
            content: {
                top: '10%',
                background: '#fff',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                outline: 'none',
                width: '700px'
            }
        };

        return (
            <div onKeyUp={this.keyHandler}>
                <Modal
                    isOpen={this.state.showModal}
                    onRequestClose={this.closeModal}
                    className='modal-dialog'
                    style={customStyles}
                    ariaHideApp={false}
                >
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={this.close}>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                            <h4 className='modal-title'>{this.props.formModalTitle}</h4>
                        </div>
                        <div className='modal-body'>
                            <form onSubmit={handleSubmit}>
                                <div className='row'>
                                    <div className='form-group col-md-6'>
                                        <label htmlFor='type'>Tipo</label>
                                        <Field name='type' component={renderSelectField} validate={required} className='form-control' id='type'>
                                            <option disabled={true} value=''>Selecione um tipo...</option>
                                            {/* <option value='CPE'>CPE</option>
                                            <option value='ROUTER'>Roteador</option>
                                            <option value='SWITCH'>Switch</option> */}
                                            {/* this.state.mySelectTypes.map((e, key) => {*/}
                                            {this.mySelectTypes.map((e, key) => {
                                                return <option key={key} value={e.value}>{e.text}</option>;
                                            })}
                                        </Field>
                                    </div>

                                    <div className='form-group col-md-6'>
                                        <label htmlFor='hostname'>Hostname</label>
                                        <Field name='hostname' component={renderTextField} validate={required} className='form-control' id='hostname' placeholder='Hostname' />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='form-group col-md-6'>
                                        <label htmlFor='ip_address'>Endereço IP</label>
                                        <Field name='ip_address' component={renderTextField} validate={required} className='form-control' id='ip_address' placeholder='Endereço IP' />
                                    </div>
                                    <div className='form-group col-md-6'>
                                        <label htmlFor='location'>Localização</label>
                                        <Field name='location' component={renderTextField} validate={required} className='form-control' id='location' placeholder='Localização' />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='form-group col-md-6'>
                                        <label htmlFor='fabricator'>Fabricante</label>
                                        <Field name='fabricator' component={renderTextField} validate={required} className='form-control' id='fabricator' placeholder='Fabricante' />
                                    </div>
                                    <div className='form-group col-md-6'>
                                        <label htmlFor='model'>Modelo</label>
                                        <Field name='model' component={renderTextField} validate={required} className='form-control' id='model' placeholder='Modelo' />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='form-group col-md-6'>
                                        <label htmlFor='serial'>Serial</label>
                                        <Field name='serial' component={renderTextField} validate={required} className='form-control' id='serial' placeholder='Serial' />
                                    </div>
                                    <div className='form-group col-md-6'>
                                        <label htmlFor='so_version'>Versão SO</label>
                                        <Field name='so_version' component={renderTextField} validate={required} className='form-control' id='so_version' placeholder='Versão SO' />
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-md-12 col-lg-12'>
                                        <h4 className='heading'>Histórico
                                            <div className='btn btn-default pull-right history-button' onClick={() => this.setState({ openToogle: !this.state.openToogle })}>
                                                {this.state.openToogle ? (<span className='fa fa-chevron-up'></span>) : <span className='fa fa-chevron-down'></span>}
                                            </div>
                                        </h4>
                                    </div>
                                </div>

                                <Collapse in={this.state.openToogle}>
                                    <div className='row'>
                                        <div className='form-group col-md-4'>
                                            <label htmlFor='create_date'>Data de Criação</label>
                                            <Field name='create_date' component={renderTextField} className='form-control' id='create_date' placeholder='Data de Criação' disabled={true} />
                                        </div>
                                        <div className='form-group col-md-4'>
                                            <label htmlFor='change_date'>Data de Alteração</label>
                                            <Field name='change_date' component={renderTextField} className='form-control' id='change_date' placeholder='Data de Alteração' disabled={true} />
                                        </div>
                                        <div className='form-group col-md-4'>
                                            <label htmlFor='change_by'>Alterado Por</label>
                                            <Field name='change_by' component={renderTextField} className='form-control' id='change_by' placeholder='Alterado Por' disabled={true} />
                                        </div>
                                    </div>
                                </Collapse>

                            </form>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-dismiss='modal' onClick={this.close}>Cancelar</button>
                            <button type='button' className='btn btn-dark' disabled={this.state.errors}
                                onClick={this.confirmAction}>{this.props.formModalButton}</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default reduxForm({ form: 'equipmentForm', destroyOnUnmount: false })(FormModal);