import React, { useState } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import { addLog } from '../../actions/logActions';
import TechSelectOptions from '../tech/TechSelectOptions';
const AddLogModal = ({ addLog }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');
  const onSubmit = () => {
    if (message === '' && tech === '') {
      M.toast({ html: 'Please enter a message and technician' });
    } else if (message === '') {
      M.toast({ html: 'Please enter a message' });
    } else if (tech === '') {
      M.toast({ html: 'Please enter a technician' });
    } else {
      const newLog = {
        message,
        attention,
        tech,
        date: new Date(),
      };
      addLog(newLog);
      M.toast({ html: `Log added by ${tech}` });

      // clear Fields
      setMessage('');
      setTech('');
      setAttention(false);
    }
  };
  return (
    <div id='add-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter System Log</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <label htmlFor='message' className='active'>
              Log Message
            </label>
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <select
              className='browser-default'
              name='tech'
              value={tech}
              onChange={(e) => setTech(e.target.value)}
            >
              <option value='' disabled selected>
                Select Technician
              </option>
              <TechSelectOptions/>
            </select>
          </div>
        </div>

        <div className='row'>
          <div className='input-field'>
            <label>
              <input
                type='checkbox'
                className='filled-in'
                checked={attention}
                onChange={(e) => setAttention(!attention)}
              />
              <span>Needs Attention</span>
            </label>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect waves-green btn'
        >
          Enter
        </a>
      </div>
    </div>
  );
};
const modalStyle = {
  width: '65%',
  height: '55%',
};
AddLogModal.propTypes = {
  addLog: PropTypes.func.isRequired,
};

export default connect(null, {addLog}) (AddLogModal);
