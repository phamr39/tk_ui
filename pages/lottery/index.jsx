/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useLayoutEffect, useEffect, useRef } from 'react';
import styles from './Lottery.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter } from 'next/router';
import ModalShare from '../../components/Share';
import { useSelector } from 'react-redux';
import Notify from '../../components/Notify';
import { Web3Storage } from 'web3.storage';

const Lottery = () => {
    const router = useRouter();

    const [choosenValue, setChoosenValue] = useState('');
    const [openLoading, setOpenLoading] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [alertType, setAlertType] = useState('success');
    const [snackMsg, setSnackMsg] = useState('');
    const [currentUser, setCurrentUser] = useState('');

    const [currentWinnerName, setCurrentWinnerName] = useState('neutrino.testnet');
    const [currentWinnerNumber, setCurrentWinnerNumber] = useState(17);
    const [currentWinnerBuyingTime, setCurrentWinnerBuyingTime] = useState('2022-01-01 00:00:01');
    const [currentEndTime, setCurrentEndTime] = useState('2022-01-01 00:00:00');
    const [currentTotalReward, setCurrentTotalReward] = useState(100);
    const [currentTotalJoined, setCurrentTotalJoined] = useState(110);

    const wallet = useSelector((state) => state.wallet);

    const onCloseSnack = () => {
        setOpenSnack(false);
    };

    useLayoutEffect(() => {
        const { walletConnection } = wallet;
        const userId = walletConnection.getAccountId();
        setCurrentUser(userId);
    }, []);

    const onShowResult = ({ type, msg }) => {
        setOpenSnack(true);
        setOpenLoading(false);
        setAlertType(type);
        setSnackMsg(msg);
    };

    const onExportDateTime = (datetime) => {
        try {
            const timestamp = parseFloat(datetime);
            const date = new Date(timestamp);
            const localDate = date.toLocaleDateString();
            const localTime = date.toLocaleTimeString();
            return `${localDate} @ ${localTime}`;
        } catch {
            return 'unknow';
        }
    };

    const onCloseModalShare = () => {
        setModalShare(false);
    };

    const onGetSharedLink = (id, name) => {
        const uri = new URL(window.location.href);
        const { origin } = uri;
        setLink({ link: `${origin}/event/event-detail?id=${id}`, name });
        setModalShare(true);
    };

    const onSuccess = () => {
        onShowResult({
            type: 'success',
            msg: 'copied',
        });
    };

    const onRequestConnectWallet = () => {
        const { nearConfig, walletConnection } = wallet;
        walletConnection?.requestSignIn?.(nearConfig?.contractName);
    };

    return (
        <>
            <Notify openLoading={openLoading} openSnack={openSnack} alertType={alertType} snackMsg={snackMsg} onClose={onCloseSnack} />
            <div className={styles.root}>
                <div className={styles.label_create}>Get your number</div>
                <br />
                <div className={styles.text_description}>
                    Your will deposite 1 NEAR for each number, each user can buy only one number in each lottery game.
                </div>
                <div className={styles.label}>
                    <div className={styles.label_title}>Get your number in the next game</div>
                </div>
                <div className={styles.line} />
                <br />
                <div className={styles.search_row}>
                    <div className={styles.search_area}>
                        <input
                            placeholder={'Type your number which you choose, value must be in range 00 to 99'}
                            className={styles.choosen_number}
                            value={choosenValue}
                            onChange={(e) => {
                                setChoosenValue(e.currentTarget.value);
                            }}
                        />
                    </div>
                    <button className={styles.button_search} onClick={() => onSearchEvent(searchEventValue)}>
                        Buy
                    </button>
                </div>
                <div className={styles.label}>
                    <div className={styles.label_title}>Current Lottery Game</div>
                </div>
                <div className={styles.line} />
                <div className={styles.current_game_info}>Closed At: {currentEndTime} </div>
                <div className={styles.current_game_info}>Winner Name: {currentWinnerName} {currentUser == currentWinnerName ? '(You)' : ''}</div>
                <div className={styles.current_game_info}>Winner Number: {currentWinnerNumber} </div>
                <div className={styles.current_game_info}>Buy At: {currentWinnerBuyingTime} </div>
                <div className={styles.current_game_info}>Total reward claimed: {currentTotalReward} NEAR </div>
                <div className={styles.current_game_info}>Total participants: {currentTotalJoined} </div>
            </div>
        </>
    );
};

export default Lottery;
