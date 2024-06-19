import  { useState } from 'react';
import { Link } from "react-router-dom";
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

const CommentRow = ({ allComment }) => {
  const { email, comment } = allComment || {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState('');
  const [reportButtonActive, setReportButtonActive] = useState(false);


  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to truncate the comment if it's longer than 20 characters
  const truncateComment = (text, length) => {
    if (text.length > length) {
      return `${text.substring(0, length)}...`;
    }
    return text;
  };

  const handleFeedbackChange = (event) => {
    setSelectedFeedback(event.target.value);
    setReportButtonActive(true);
  };

  const handleReportClick = () => {
    // Implement your report logic here
    setReportButtonActive(false);
  };

  return (
    <>
      <tr>
        <td className='px-5 py-5 border-b border-gray-200 bg-white'>
          <p className='text-gray-900 whitespace-no-wrap font-medium'>{email}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white'>
          <p className='text-gray-900 whitespace-no-wrap text-lg font-medium'>
            {truncateComment(comment, 20)}{' '}
            {comment.length > 20 && (
              <button onClick={handleOpenModal} className="text-blue-500 hover:underline">
                Read More
              </button>
            )}
          </p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white'>
          <select 
            value={selectedFeedback} 
            onChange={handleFeedbackChange} 
            className="px-3 py-1 border rounded text-sm font-medium lg:text-base">
            <option className=''  value="" disabled>Feedback</option>
            <option className=''  value="spam">Spam</option>
            <option value="offensive">Offensive</option>
            <option value="irrelevant">Irrelevant</option>
          </select>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white'>
          <button 
            onClick={handleReportClick} 
            disabled={!reportButtonActive} 
            className={`px-3 py-1 font-medium rounded text-white text-sm lg:text-sm uppercase ${reportButtonActive ? 'bg-[#F73E7B] cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}>
            Report
          </button>
        </td>
      </tr>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel="Full Comment"
      >
        <h2 className="text-2xl font-semibold mb-4">Full Comment</h2>
        <p className="text-gray-900 text-lg mb-4">{comment}</p>
        <button onClick={handleCloseModal} className="bg-[#F73E7B] px-3 py-1 font-medium rounded text-white text-sm lg:text-sm uppercase">Close</button>
      </Modal>
    </>
  );
};

export default CommentRow;
