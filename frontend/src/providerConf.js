// Adapt to your config
const clientId = 'auth-with-cells';
const callbackURL = 'http://localhost:3000/callback';
const authority = 'http://localhost:8080/oidc';

// You do not need to impact below code, unless you know what you are doing.
export default function getConfig() {
    return {
        client_id: clientId,
        redirect_uri: callbackURL,
        response_type: 'code',
        scope: 'openid email profile pydio offline',
        authority: authority,
        automaticSilentRenew: false,
        filterProtocolClaims: true,
        loadUserInfo: false
    };
}
