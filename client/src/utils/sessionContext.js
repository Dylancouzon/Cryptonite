import React from 'react';

const SessionContext = React.createContext({
    username: "",
    publicKey: ""
});

export default SessionContext;