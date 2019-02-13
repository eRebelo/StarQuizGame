import React from 'react'

import ContentHeader from '../../template/contentHeader'
import EquipmentList from './equipmentList'

export default props => (
    <div>
        <ContentHeader name='Equipamento' icon='fa fa-cog' />
        <EquipmentList />
    </div>
)