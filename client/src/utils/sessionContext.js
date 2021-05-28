import React from 'react';

const SessionContext = React.createContext({
    username: "",
    publicKey: "",
    logged_in: false,
    setSession: () => {}
});

export default SessionContext;