import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import consts from '../../main/consts'

const INITIAL_VALUE = {
    create_date: '27/11/2018',
    change_date: '27/11/2018',
    change_by: 'Admin'
}

export const loading = () => {
    return {
        type: 'LOADING'
    }
}

export const getEquipmentList = () => {
    return dispatch => {
        dispatch(loading())
        axios.get(`${consts.API_URL}/equipment?sort=+type+hostname`)
            .then(resp => {
                dispatch([
                    { type: 'EQUIPMENT_LIST', payload: resp.data },
                    loading()
                ])
            })
            .catch(error => {
                toastr.error('Erro', 'Erro ao tentar buscar os equipamentos. ' + error)
                dispatch(loading())
            })
    }
}

export const addEquipment = (equipment) => {
    return dispatch => {
        dispatch(loading())
        axios.post(`${consts.API_URL}/equipment`, equipment)
            .then(resp => {
                toastr.success('Sucesso', 'Equipamento inserido com sucesso')
                dispatch([
                    resetForm('equipmentForm'),
                    getEquipmentList(),
                    loading()
                ])
            })
            .catch(error => {
                toastr.error('Erro', 'Erro ao tentar inserir equipamento. ' + error)
                dispatch(loading())
            })
    }
}

export const editInitEquipment = (equipment) => {
    return initialize('equipmentForm', equipment)
}

export const editEquipment = (equipment) => {
    return dispatch => {
        dispatch(loading())
        axios.put(`${consts.API_URL}/equipment/${equipment._id}`, { ...equipment })
            .then(resp => {
                toastr.success('Sucesso', 'Equipamento alterado com sucesso')
                dispatch([
                    resetForm('equipmentForm'),
                    getEquipmentList(),
                    loading()
                ])
            })
            .catch(error => {
                toastr.error('Erro', 'Erro ao tentar alterar equipamento. ' + error)
                dispatch(loading())
            })
    }
}

export const removeEquipment = (equipment) => {
    return dispatch => {
        dispatch(loading())
        axios.delete(`${consts.API_URL}/equipment/${equipment._id}`)
            .then(resp => {
                toastr.success('Sucesso', 'Equipamento removido com sucesso')
                dispatch([
                    getEquipmentList(),
                    loading()
                ])
            })
            .catch(error => {
                toastr.error('Erro', 'Erro ao tentar remover equipamento. ' + error)
                dispatch(loading())
            })
    }
}

export const cleanForm = () => {
    return initialize('equipmentForm', INITIAL_VALUE)
}