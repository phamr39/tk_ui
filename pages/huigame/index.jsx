/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useLayoutEffect, useEffect } from 'react';
import styles from './Hui.module.scss';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Notify from '../../components/Notify';
import { utils, providers } from 'near-api-js';

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
    const [currentUserTicket, setCurentUserTicket] = useState(100);
    const [previousUserTicket, setPreviousUserTicket] = useState(100);
    const [choosenNumber, setChoosenNumber] = useState('');

    const wallet = useSelector((state) => state.wallet);

    const FEE_PERCENT = 0.9;
    const DEFAULT_TICKET_PRICE = '1';
    const onCloseSnack = () => {
        setOpenSnack(false);
    };

    const onShowResult = ({ type, msg }) => {
        setOpenSnack(true);
        setOpenLoading(false);
        setAlertType(type);
        setSnackMsg(msg);
    };

    const timeStampToDate = (timestamp) => {
        if (timestamp > 0) {
            let output = new Date(timestamp / 1000000).toLocaleDateString('en-US');
            output = output + ' ' + new Date(timestamp / 1000000).toLocaleTimeString('en-US');
            return output;
        }
        return timestamp;
    };

    const onBuyTicket = (number) => {
        const { contract, walletConnection } = wallet;
        const userId = walletConnection.getAccountId();
        if (userId === '') {
            onRequestConnectWallet();
        }
        if (number === '' || number < 0 || number >= 100) {
            onShowResult({
                type: 'error',
                msg: 'Ticket number must be >= 0 and < 100.',
            });
        } else if (!currentGame) {
            onShowResult({
                type: 'error',
                msg: 'There is no game available to play.',
            });
        } else {
            setOpenLoading(true);
            const ticket_price = utils.format.parseNearAmount(DEFAULT_TICKET_PRICE);
            contract
                ?.buy_ticket?.(
                    {
                        num: parseInt(number),
                    },
                    100000000000000,
                    ticket_price,
                )
                .then((data) => {
                    if (data) {
                        onShowResult({
                            type: 'success',
                            msg: 'Your ticket has been bought',
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
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

    const onSuccess = () => {
        onShowResult({
            type: 'success',
            msg: 'copied',
        });
    };

    const onStartGame = () => {
        const { contract } = wallet;
        setOpenLoading(true);
        contract
            ?.new_game?.({})
            .then((data) => {
                setOpenLoading(false);
                if (data) {
                    onShowResult({
                        type: 'success',
                        msg: 'Game has been started! Reload in 3 seconds.',
                    });
                    setTimeout(() => {
                        router.reload();
                    }, 3000);
                }
            })
            .catch((err) => {
                console.log(err);
                onShowResult({
                    type: 'error',
                    msg: 'Something went wrong, please try again. Reload in 3 seconds.',
                });
                setTimeout(() => {
                    router.reload();
                }, 3000);
            });
    };

    const onEndGame = () => {
        const { contract } = wallet;
        setOpenLoading(true);
        contract
            ?.end_game?.({})
            .then((data) => {
                setOpenLoading(false);
                if (data) {
                    router.push('/lottery');
                }
            })
            .catch((err) => {
                console.log(err);
                onShowResult({
                    type: 'error',
                    msg: 'Something went wrong, please try again.',
                });
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
                <div className={styles.label_create}>The Hui Game: Coming Son</div>
                <br />
                {/* <div className={styles.text_description}>
                    <div>Your will deposite 1 NEAR for each number, each user can buy only one number in each lottery game.</div>
                    <div>10% of the total deposit will be returned to the dealer.</div>
                    <div>If there are more than 1 winner, the coin/token will be shared.</div>
                </div>
                <div>
                    {currentUserTicket !== 100 ? (
                        <div>
                            <div className={styles.label}>
                                <div className={styles.label_title}>Your number in the current game</div>
                            </div>
                            <div className={styles.line} />
                            <div className={styles.alert_message}>Please wait till the 100th player join to see the result</div>
                            <div className={styles.ticket_number}>{currentUserTicket}</div>
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
                                        value={choosenNumber}
                                        onChange={(e) => {
                                            setChoosenNumber(e.currentTarget.value);
                                        }}
                                    />
                                </div>
                                <button className={styles.button_search} onClick={() => onBuyTicket(choosenNumber)}>
                                    Buy
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.label}>
                    <div className={styles.label_title}>Current Lottery Game</div>
                </div>
                <div className={styles.line} />
                {!!currentGame ? (
                    <div>
                        <div className={styles.game_info}>Opened At: {currentGame.startTime} </div>
                        {!!currentGame.endTime && (
                            <div>
                                <div className={styles.game_info}>Closed At: {currentGame.endTime} </div>
                            </div>
                        )}
                        <div className={styles.game_info}>
                            Winners Name: {currentGame.winnerName} {currentUser == currentGame.winnerName ? '(You)' : ''}
                        </div>
                        <div className={styles.game_info}>Winner Number: {currentGame.winnerNumber} </div>
                        <div className={styles.game_info}>Total reward claimed: {currentGame.totalReward} NEAR </div>
                        <div className={styles.game_info}>Total participants: {currentGame.totalJoined} </div>
                    </div>
                ) : (
                    <div>
                        <div className={styles.game_info}>There is no game available now</div>
                    </div>
                )}

                <div className={styles.label}>
                    <div className={styles.label_title}>Previous Lottery Game</div>
                </div>
                <div className={styles.line} />
                {!!previousGame ? (
                    <div>
                        <div>
                            <div className={styles.game_info}>Opened At: {previousGame.startTime}</div>
                            <div className={styles.game_info}>Closed At: {previousGame.endTime} </div>
                            <div className={styles.game_info}>Winners Name: {previousGame.winnerName}</div>
                            <div className={styles.game_info}>
                                Winner Number: {previousGame.winnerNumber}
                                <div>
                                    {previousUserTicket !== 100 ? (
                                        <div>
                                            <div className={styles.game_info}>Your Number: </div>
                                            <div className={styles.previous_ticket_number}>{previousUserTicket}</div>
                                        </div>
                                    ) : (
                                        <div className={styles.game_info}>You did not join this game </div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.game_info}>Total Reward: {previousGame.totalReward} NEAR </div>
                            <div className={styles.game_info}>Total Participants: {previousGame.totalJoined} </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className={styles.game_info}>There is no previous game</div>
                    </div>
                )} */}
            </div>
        </>
    );
};

export default Lottery;
