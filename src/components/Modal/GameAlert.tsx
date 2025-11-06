import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';
import { getGameOverMessage } from '../../utils/game-logic.ts';
import { useGame } from '../../hooks/useGame.ts';
import { GAME_ALERT_DELAY } from '../../utils/consts.ts';

/**
 * Модальное окно, отображающее результат игры (победа/ничья)
 * 
 * @component
 * @returns {JSX.Element | null} Модальное окно или null если не должно отображаться
 */
export const GameAlert: React.FC = () => {
  const { winner, isDraw } = useGame();
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Закрывает модальное окно
   * @returns {void}
   */
  const closeModal = (): void => {
    setIsOpen(false);
  };

  /**
   * Открывает модальное окно
   * @returns {void}
   */
  const showModal = (): void => {
    setIsOpen(true);
  };

  /**
   * Отслеживает изменение состояния игры и управляет показом модального окна
   */
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

  /**
   * Сообщение о результате игры, мемоизированное для оптимизации
   */
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
