import './Modal.css'
interface ModalProps {
    message: string,
    restartGame: ()=>void
}



export const Modal: React.FC<ModalProps> = ({ message, restartGame}) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Игра завершена!</h2>
                <div className="modal-message">{message}</div>
                <div className="modal-actions">
                    <button
                        className="modal-button"
                        onClick={() => restartGame()}
                    >
                        Новая игра
                    </button>
                </div>
            </div>
        </div>
    );
};