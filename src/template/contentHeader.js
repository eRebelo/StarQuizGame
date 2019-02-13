import React from 'react'

export default props => (
    <div className='container'>
        <div className='row container-row'>
            <div className='col-md-6'>
                <h1 className='screen-name'><i className={props.icon} /> {props.name}</h1>
            </div>

            <div className='col-md-6'>
                <nav aria-label='breadcrumb'>
                    <ol className='breadcrumb'>
                        <li><a className='breadcrumb-item-link' href='/'>Home</a></li>
                        <li><a className='breadcrumb-item-link' href='/machine'>Equipamento</a></li>
                        <li className='breadcrumb-item-link-active' aria-current='page'>Dados</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
)