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
        viewMethods: [
            'get_forms',
            'get_form_count',
            'get_form',
            'get_element',
            'get_elements',
            'get_element_count',
            'get_participants',
            'get_question_count',
            'get_joined_forms',
            'get_form_status',
            'get_participant_form_status',
            'get_passed_element_count',
            'get_joined_forms_count',
            'get_event',
            'get_user',
            'get_event_participants',
            'get_event_count',
            'get_events',
            'get_newest_events',
            'get_newest_events_count',
            'get_interested_events',
            'get_interested_event_count',
            'get_meeting_fee',
            // 'get_pending_requests',
            // 'get_pending_requests_count',
            'get_meeting',
            'get_available_time',
            'get_claimable_amount'
        ],
        changeMethods: [
            'init_new_form',
            'publish_form',
            'unpublish_form',
            'join_form',
            'new_element',
            'submit_answer',
            'update_element',
            'update_event_info',
            'update_form',
            'delete_form',
            'delete_element',
            'get_answer_statistical',
            'init_new_event',
            'publish_event',
            'join_event',
            'unpublish_event',
            'leave_event',
            'interest_event',
            'not_interest_event',
            'claim_event_reward',
            'reschedule_meeting',
            // TODO Check function loi khi dat vao view function
            'get_recent_event_created',
            'check_event_join_permission',
            'request_a_meeting',
            'response_meeting_request',
            'cancel_meeting_request',
            'update_calendar_setting',
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