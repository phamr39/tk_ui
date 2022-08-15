import { useRouter } from 'next/router';
import styles from './HowToPlay.module.scss';
import { LotteryGameInfo, TheHuiGameInfo } from './questions';

const Home = () => {
    const aContent = [
        { id: 'lottery', title: 'How the Lottery Game work?', label: LotteryGameInfo.description, router: '/lottery', icon: 'calendar.svg' },
        { id: 'thehui', title: 'How the Hui Game work?', label: TheHuiGameInfo.description, router: '/huigame', icon: 'calendar.svg' },
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
