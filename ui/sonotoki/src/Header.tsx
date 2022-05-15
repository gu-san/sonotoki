import React from 'react';
import {useState} from 'react'
import {useOnboardingButton} from "./OnboardingButton";

function useHeader() {
    const [errorMessage, setErrorMessage] = useState("");
    const [provider, setProvider] = useState(null);

    const {render: renderOnboardingButton} = useOnboardingButton()

    return {
        setErrorMessage,
        provider,
        render: (
            <div className="Header">
                <div className="navbar bg-base-100">
                    <div className="flex-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <a className="btn btn-ghost normal-case text-xl font-roboto">SonoToki</a>
                    </div>
                    <div className="flex-none">
                        {renderOnboardingButton}
                    </div>
                </div>
                {errorMessage.length > 0 &&
                <div className="alert alert-warning shadow-lg ">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6"
                             fill="none"
                             viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                        <span className="font-roboto">{errorMessage}</span>
                    </div>
                </div>
                }
            </div>
        )
    };
}

export default useHeader;
