import MetaMaskOnboarding from '@metamask/onboarding';
import React from 'react';
const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect';
const CONNECTED_TEXT = 'Connected';

export function useOnboardingButton() {
    const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
    const [isDisabled, setDisabled] = React.useState(false);
    const [accounts, setAccounts] = React.useState([]);

    const onboarding = React.useRef<MetaMaskOnboarding>();

    React.useEffect(() => {
        if (!onboarding.current) {
            onboarding.current = new MetaMaskOnboarding();
        }
    }, []);

    React.useEffect(() => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            if (accounts.length > 0) {
                setButtonText(CONNECTED_TEXT);
                setDisabled(true);
                // @ts-ignore
                onboarding.current.stopOnboarding();
            } else {
                setButtonText(CONNECT_TEXT);
                setDisabled(false);
            }
        }
    }, [accounts]);

    React.useEffect(() => {
        function handleNewAccounts(newAccounts: React.SetStateAction<never[]>) {
            setAccounts(newAccounts);
        }
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then(handleNewAccounts);
            // @ts-ignore
            window.ethereum.on('accountsChanged', handleNewAccounts);
            return () => {
                window.ethereum.removeListener('accountsChanged', handleNewAccounts);
            };
        }
    }, []);

    const onClick = () => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum
                .request({ method: 'eth_requestAccounts' })
                .then((newAccounts: React.SetStateAction<never[]>) => setAccounts(newAccounts));
        } else {
            // @ts-ignore
            onboarding.current.startOnboarding();
        }
    };
    return {
        render: (
            <button className="btn btn-outline btn-warning w-50 rounded-full" disabled={isDisabled}
                    onClick={onClick}>{buttonText}</button>
        )
    };
}
