interface ModalProps {
    message: string
}
export const Modal: React.FC<ModalProps> = ({message}) => {
    return (
    <div>{message}</div>
    )
}