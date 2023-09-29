import React from 'react';
import "./survey.css"
import ChatGPT from "./ChatGPT/ChatGPT";
const EditQuestionsModal = ({ onClose, children }) => {
  return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>
                    Close
                </button>
                {children}
            </div>
        </div>
    );
};

export default EditQuestionsModal;
