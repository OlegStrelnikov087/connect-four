import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';
import { getGameOverMessage } from '../../game-logic.ts';
import { useGame } from '../../hooks/useGame.ts';

const GAME_ALERT_DELAY = 1000;

export const GameAlert: React.FC = () => {
  const { winner, isDraw } = useGame();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const showModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (!winner && !isDraw) {
      return;
    }

    const timer = setTimeout(() => {
      showModal();
    }, GAME_ALERT_DELAY);

    return () => {
      clearTimeout(timer);
      closeModal();
    };
  }, [winner, isDraw]);

  const message = useMemo(() => getGameOverMessage(winner, isDraw), [winner, isDraw]);

  const modalRoot = document.getElementById('modal-root');

  if (!isOpen || !modalRoot) {
    return null;
  }

  return createPortal(
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content">
        <h2 className="modal-title">Игра завершена!</h2>
        <div className="modal-message">{message}</div>
        <div className="modal-actions">
          <button
            className="modal-button modal-button--close"
            onClick={closeModal}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};
