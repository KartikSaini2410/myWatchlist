import React, { useState } from 'react'

export default function Modal({closeModal, ceateList}) {

    const [value, setValue] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    }

  return (
    <div className="modal text-white" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">WatchList</h5>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name of the List.</label>
                        <input type="text" value={value} onChange={handleChange} className="form-control" id="exampleText" aria-describedby="emailHelp" placeholder="Enter name" />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger" onClick={()=>ceateList(value)}>Create</button>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
    </div>
  )
}
