import { useRouter } from 'next/router';
import Hero from '../../components/Hero';
import styles from './Home.module.scss';
import { LotteryGameInfo, TheHuiGameInfo } from './descriptions';

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
