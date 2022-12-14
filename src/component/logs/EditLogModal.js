import React, { useEffect, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateLog } from '../../actions/logActions';
import TechSelectOptions from '../tech/TechSelectOptions';

const EditLogModal = ({ updateLog,current }) => {

  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');
  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
  },[current]);
  const onSubmit = () => {
    if (message === '' && tech === '') {
      M.toast({ html: 'Please enter a message and technician' });
    } else if (message === '') {
      M.toast({ html: 'Please enter a message' });
    } else if (tech === '') {
      M.toast({ html: 'Please enter a technician' });
    } else {
      const updLog = {
        id: current.id,
        message,
        attention,
        tech,
        date: new Date()
      }
      updateLog(updLog);
      M.toast({html:`Log updated by ${tech}`})
      // clear Fields
      setMessage('');
      setTech('');
      setAttention(false);
    }
  };
  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
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
              <option value=''  selected>
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
  width: '75%',
  height: '75%',
};
EditLogModal.propTypes = {
  current: PropTypes.object.isRequired,
  updateLog: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  current: state.log.current,
});
export default connect(mapStateToProps, { updateLog })(EditLogModal);
