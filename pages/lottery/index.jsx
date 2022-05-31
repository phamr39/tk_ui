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

const Lottery = () => {
    const router = useRouter();

    const [choosenValue, setChoosenValue] = useState('');
    const [openLoading, setOpenLoading] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [alertType, setAlertType] = useState('success');
    const [snackMsg, setSnackMsg] = useState('');
    const [currentUser, setCurrentUser] = useState('');

    const [currentGame, setCurrentGame] = useState();
    const [previousGame, setPreviousGame] = useState();
    const [isOwner, setIsOwner] = useState(false);

    const wallet = useSelector((state) => state.wallet);

    const FEE_PERCENT = 0.9;

    const onCloseSnack = () => {
        setOpenSnack(false);
    };

    useLayoutEffect(() => {
        const { walletConnection } = wallet;
        const userId = walletConnection.getAccountId();
        setCurrentUser(userId);
    }, []);

    useLayoutEffect(() => {
        getCurrentGame();
    }, [])

    useLayoutEffect(() => {
        getPreviousGame();
    }, [])

    useEffect(() => {
        const { nearConfig, walletConnection } = wallet;
        const userId = walletConnection.getAccountId();
        if (userId == nearConfig.contractName) {
            setIsOwner(true);
        }
    }, [wallet]);

    const getCurrentGame = () => {
        const { contract } = wallet;
        contract
            ?.get_current_game?.({})
            .then((data) => {
                if (data) {
                    let fee = data.fee / 1e+24;
                    let reward = fee * FEE_PERCENT * data.participants_number;
                    let crGame = {
                        startTime: timeStampToDate(data.start_at),
                        endTime: timeStampToDate(data.end_at),
                        winnerName: !!data.end_at ? data.winners : "This game has not finished!",
                        winnerNumber: !!data.end_at ? data.winner_number : "This game has not finished!",
                        totalReward: reward,
                        totalJoined: data.participants_number,
                    };
                    setCurrentGame(crGame);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getPreviousGame = () => {
        const { contract } = wallet;
        contract
            ?.get_previous_game?.({})
            .then((data) => {
                if (data) {
                    let fee = data.fee / 1e+24;
                    let reward = fee * FEE_PERCENT * data.participants_number;
                    let winnerList = JSON.stringify(data.winners);
                    let crGame = {
                        startTime: timeStampToDate(data.start_at),
                        endTime: timeStampToDate(data.end_at),
                        winnerName: (winnerList != '[]') ? winnerList : "There is no one at all!",
                        winnerNumber: data.winner_number,
                        totalReward: reward,
                        totalJoined: data.participants_number,
                    };
                    setPreviousGame(crGame);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const onShowResult = ({ type, msg }) => {
        setOpenSnack(true);
        setOpenLoading(false);
        setAlertType(type);
        setSnackMsg(msg);
    };

    const timeStampToDate = (timestamp) => {
        if (timestamp > 0) {
            let output = new Date(timestamp / 1000000).toLocaleDateString("en-US");
            output = output + " " + new Date(timestamp / 1000000).toLocaleTimeString("en-US");
            return output;
        }
        return timestamp;
    }

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
                <div className={styles.label_create}>Lottery Game: Winner takes all!</div>
                <br />
                <div className={styles.text_description}>
                    <div>Your will deposite 1 NEAR for each number, each user can buy only one number in each lottery game.</div>
                    <div>10% of the total deposit will be returned to the dealer.</div>
                    <div>If there are more than 1 winner, the coin/token will be shared.</div>
                </div>
                {isOwner ? (
                    <div className={styles.root}>
                        <button className={styles.button_admin} >
                            Start Game
                        </button>
                    </div>
                ) : (
                    <div>
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
                    </div>
                )}
                <div className={styles.label}>
                    <div className={styles.label_title}>Current Lottery Game</div>
                </div>
                <div className={styles.line} />
                {!!currentGame ? (
                    <div>
                        <div className={styles.current_game_info}>Opened At: {currentGame.startTime} </div>
                        {!!currentGame.endTime && (
                            <div>
                                <div className={styles.current_game_info}>Closed At: {currentGame.endTime} </div>
                            </div>
                        )}
                        <div className={styles.current_game_info}>Winners Name: {currentGame.winnerName} {currentUser == currentGame.winnerName ? '(You)' : ''}</div>
                        <div className={styles.current_game_info}>Winner Number: {currentGame.winnerNumber} </div>
                        <div className={styles.current_game_info}>Total reward claimed: {currentGame.totalReward} NEAR </div>
                        <div className={styles.current_game_info}>Total participants: {currentGame.totalJoined} </div>
                    </div>
                ) : (
                    <div>
                        <div className={styles.current_game_info}>There is no game available now</div>
                    </div>
                )}

                <div className={styles.label}>
                    <div className={styles.label_title}>Previous Lottery Game</div>
                </div>
                <div className={styles.line} />
                {!!previousGame ? (
                    <div>
                        <div className={styles.current_game_info}>Opened At: {previousGame.startTime} </div>
                        <div className={styles.current_game_info}>Closed At: {previousGame.endTime} </div>
                        <div className={styles.current_game_info}>Winner Name: {previousGame.winnerName} {currentUser == previousGame.winnerName ? '(You)' : ''}</div>
                        <div className={styles.current_game_info}>Winner Number: {previousGame.winnerNumber} </div>
                        <div className={styles.current_game_info}>Total Reward: {previousGame.totalReward} NEAR </div>
                        <div className={styles.current_game_info}>Total Participants: {previousGame.totalJoined} </div>
                    </div>
                ) : (
                    <div>
                        <div className={styles.current_game_info}>There is no previous game</div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Lottery;
