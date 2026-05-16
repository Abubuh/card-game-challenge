const Modal = ({ message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 " role="dialog" aria-modal="true" aria-label={message}>
      <div className="bg-white rounded-xl p-8 flex flex-col items-center gap-4 shadow-xl">
        <p className="text-xl font-bold text-center">{message}</p>
      </div>
    </div>
  )
}

export default Modal