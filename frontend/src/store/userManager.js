import { createUserManager } from 'redux-oidc';
import getConfig from '../providerConf'

const userManager = createUserManager(getConfig());

export default userManager;
