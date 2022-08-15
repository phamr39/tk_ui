import { useRouter } from 'next/router';
import styles from './HowToPlay.module.scss';

const LotteryGameInfo = {
    header: 'Lottery Game',
    title: 'Play lottery with 100 others',
    description: 'You will play with 100 other players and get a chance to win a prize! The contract generates the winning number randomly when the 100th player joins. All the winner players who buy the lucky ticket will share the jackpot. After that, the prize will be sent immediately to the winner\'s wallet. The 100th player also got 0.5 NEAR as a calculation fee for his contract call. Your will deposite 1 NEAR for each number, each user can buy only one number in each lottery game. 10% of the total deposit will be returned to the dealer. If there are more than 1 winner, the prize will be shared. In case of no one got the prize, the contract will be automatically refunded 0.5 NEAR to the player who joined the lottery.',
    ref: '/lottery',
};

const TheHuiGameInfo = {
    header: 'The Hui Game',
    title: 'Play The Hui with 10 others',
    description: 'You will play with 10 other players and get a chance to win a prize! The contract generates the winning number randomly when the 10th player joins. Different with the Lottery Game, the smart contract will random in the group of 10 player and findout the winner. After that, the prize will be sent immediately to the winner\'s wallet. The 10th player also got 0.5 NEAR as a calculation fee for his contract call. Your will deposite 1 NEAR for each time, each user can join only one time in each the Hui game. 10% of the total deposit will be returned to the dealer.',
    ref: '/',
};

const Home = () => {
    const aContent = [
        { id: 'lottery', title: 'How the Lottery Game work?', label: LotteryGameInfo.description, router: '/lottery', icon: 'faq.png' },
        { id: 'thehui', title: 'How the Hui Game work?', label: TheHuiGameInfo.description, router: '/huigame', icon: 'faq.png' },
    ];

    const router = useRouter();

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <div className={styles.content_title}>How to play?</div>
                {aContent.map((item) => {
                    return (
                        <div>
                            <div className={styles.content_item} key={item.id}>
                                <img src={item.icon} className={styles.content_item_icon} alt="" />
                                <div className={styles.content_item_content}>
                                    <div className={styles.content_item_title}>{item.title}</div>
                                    <div className={styles.content_item_label}>{item.label}</div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
