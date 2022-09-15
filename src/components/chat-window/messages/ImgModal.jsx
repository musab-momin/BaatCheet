import React from 'react'
import { Modal } from 'rsuite'
import { useDrawer } from '../../../misc/custom-hooks'

const ImgModal = ({ src, fileName }) => {

    const {isOpen, open, close} = useDrawer();

  return (
    <>
        <input type='image' src={src} alt="file" className="mw-100 mh-100 w-auto" onClick={open}/>
        <Modal show={isOpen} onHide={close}>
            <Modal.Header>
                <Modal.Title>{fileName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex justify-content-center'>
                    <img src={src} alt='#' height='100%' width='80%' />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <a href={src} target="_blank" rel="noopener noreferrer" download>View original</a> 
            </Modal.Footer>
        </Modal>

    </>
  )
}

export default ImgModal