import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

interface ModalProps {
    message: string;
    onClose: () => void;
    isOpen: boolean;
}

export const Modal: React.FC<ModalProps> = ({ message, onClose, isOpen }) => {
    const modalRoot = document.getElementById('modal-root');

    useEffect(() => {
        
        if (isOpen) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [isOpen]);

    if (!isOpen || !modalRoot) {
        return null;
    }

    return createPortal(
        <div className="modal-overlay" onClick={onClose}> {/*при нажатии на на экран вне модального окна, то модалка зарокется*/}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/*чтобы при нажатии на контент модалки окно не пропадало*/}
                <h2 className="modal-title">Игра завершена!</h2>
                <div className="modal-message">{message}</div>
                <div className="modal-actions">
                    <button
                        className="modal-button modal-button--close"
                        onClick={onClose}
                    >
                        Закрыть
                    </button>
                </div>
            </div>
        </div>,
        modalRoot
    );
};