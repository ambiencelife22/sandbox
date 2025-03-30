'use client'

import React, { useState } from 'react'
import SimpleModal from './DefaultModal'

function ModalContainer(props: any) {

    const [modalVisible, SetModalVisible] = useState(props.visible)

    function resetModal() {
        modalVisible ? SetModalVisible(false) : SetModalVisible(true)

    }

    return (
        <div>
            {props.content[0].buttonDisabled ? <></> : <button className='p_color link_button' onClick={() => SetModalVisible(true)}>{props.buttonIcon != null ? <img src={props.buttonIcon} /> : props.buttonTitle}</button>}
            {modalVisible ? <SimpleModal resetModal={() => resetModal()} modalMeta={props.content} visible={true} /> : <></>}
        </div>
    )
}

export default ModalContainer