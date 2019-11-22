const callbackSuffix =  '/callback';
const authoritySuffix = '/oidc';

// You do not need to impact below code, unless you know what you are doing.
const getConfig = () => {
    console.log('retrieving config')
    console.log('Client ID:', `${process.env.REACT_APP_CLIENT_ID}`)

    return {
        client_id: `${process.env.REACT_APP_CLIENT_ID}`,
        redirect_uri: `${process.env.REACT_APP_OWN_URL}/callback`,
        response_type: 'code',
        scope: 'openid email profile pydio offline',
        authority: `${process.env.REACT_APP_OIDC_AUTH_URL}/oidc`,
        automaticSilentRenew: false,
        filterProtocolClaims: true,
        loadUserInfo: false
    };
}

export default getConfig