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

    // Блокируем скролл body когда модальное окно открыто
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !modalRoot) {
        return null;
    }
    
    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content">
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