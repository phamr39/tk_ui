import getConfig from './config';
import * as nearAPI from 'near-api-js';

const nearConfig = getConfig('testnet');
// const nearConfig = getConfig('mainnet');

export async function initContract() {
    const near = await nearAPI.connect({
        deps: {
            keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
        },
        ...nearConfig,
    });

    const walletConnection = new nearAPI.WalletConnection(near);

    let currentUser;

    if (walletConnection.getAccountId()) {
        currentUser = {
            accountId: walletConnection.getAccountId(),
            balance: (await walletConnection.account().state()).amount,
        };
    }

    const contract = await new nearAPI.Contract(walletConnection.account(), nearConfig.contractName, {
        viewMethods: [],
        changeMethods: [
            'get_previous_game',
            'get_game',
            'new_game',
            'get_current_game',
            'buy_ticket',
            'end_game',
            'get_user_ticket'
        ],
        sender: walletConnection.getAccountId(),
    });

    return { contract, currentUser, nearConfig, walletConnection };
}


export const generateUserId = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};