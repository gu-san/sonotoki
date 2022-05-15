import React from 'react';

import {useState} from 'react'

function useErrorModal(hashValue: any) {
    return {
    render: (
        <div>
            <input type="checkbox" id="my-modal-6" className="modal-toggle"/>
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Error</h3>
                    <p className="py-4">Some Error</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal-6" className="btn">Yay!</label>
                    </div>
                </div>
            </div>
        </div>
    )
    }
}

export default useErrorModal;
