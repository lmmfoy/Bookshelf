import Modal from "react-modal";

const AddShelfModal = ({ modalOpen, setModalOpen }) => {
    let subtitle;

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
        >
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
            <button onClick={closeModal}>close</button>
            <div>I am a modal</div>
            <form>
                <input />
                <button>tab navigation</button>
                <button>stays</button>
                <button>inside</button>
                <button>the modal</button>
            </form>
        </Modal>
    );
};

export default AddShelfModal;
