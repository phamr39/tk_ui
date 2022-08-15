import { useRouter } from 'next/router';
import Hero from '../../components/Hero';
import styles from './Home.module.scss';

const LotteryGameInfo = {
    header: 'Lottery Game',
    title: 'Play lottery with 100 others',
    description: 'A lottery is a form of gambling that involves the drawing of numbers at random for a prize. On NearLottery, we bring the new concept of the lottery which will be launched on the blockchain network. Join the lottery game with 99 others and find out the lucky number. Try your luck with the transparent, fast and secure.',
    ref: '/how_to_play',
};

const TheHuiGameInfo = {
    header: 'The Hui Game',
    title: 'Play The Hui with 10 others',
    description: 'The Hui game is a custom version of a traditional game in Vietnam where 10 players joined and the goal is to find the luckiest player. The winner will get the jackpot.',
    ref: '/how_to_play',
};

const Home = () => {
    const aContent = [
        { id: 'lottery', title: 'Lottery Game', label: 'Find out the luckiest players!', router: '/lottery', icon: 'calendar.svg', describe: LotteryGameInfo },
        { id: 'thehui', title: 'The Hui Game', label: 'Winner takes all!', router: '/huigame', icon: 'calendar.svg', describe: TheHuiGameInfo },
    ];

    const router = useRouter();

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <div className={styles.content_title}>Let's Play</div>
                <div className={styles.content_sub}>Odds are, you’ll have fun!</div>
                {aContent.map((item) => {
                    return (
                        <div>
                            <Hero InformationData={item.describe}></Hero>
                            <div className={styles.content_item} key={item.id}>
                                <img src={item.icon} className={styles.content_item_icon} alt="" />
                                <div className={styles.content_item_content}>
                                    <div className={styles.content_item_title}>{item.title}</div>
                                    <div className={styles.content_item_label}>{item.label}</div>
                                </div>
                                <button className={styles.content_item_button} onClick={() => router.push(item.router)}>
                                    Go
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
