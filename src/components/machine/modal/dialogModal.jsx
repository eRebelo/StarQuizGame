import React, { Component } from 'react'
import Modal from 'react-modal';

class DialogModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: true
        }

        this.keyHandler = this.keyHandler.bind(this)
        this.confirmAction = this.confirmAction.bind(this)
        this.close = this.close.bind(this)
    }

    /* Function that performs an action when to press a key */
    keyHandler(e) {
        if (e.key === 'Enter') {
            this.confirmAction()
        } else if (e.key === 'Escape') {
            this.close()
        }
    }

    confirmAction() {
        this.setState({ showModal: false })
        this.props.confirmDialog();
    }

    close() {
        this.setState({ showModal: false })
        this.props.cancelDialog()
    }

    render() {
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
                outline: 'none'
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
                            <h4 className='modal-title'>Deseja remover o equipamento abaixo?</h4>
                        </div>
                        <div className='modal-body'>
                            <p>Hostname: <b>{this.props.hostname}</b></p>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' className='btn btn-secondary' data-dismiss='modal' onClick={this.close}>Cancelar</button>
                            <button type='button' className='btn btn-dark' onClick={this.confirmAction}>Remover</button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default DialogModal;