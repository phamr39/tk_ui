import { useRouter } from 'next/router';
import styles from './Home.module.scss';

const Home = () => {
    const aContent = [
        { id: 'lottery', title: 'Lottery Game', label: 'Winner takes all!', router: '/lottery', icon: 'calendar.svg' },
    ];

    const router = useRouter();

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <div className={styles.content_title}>Lottery Game</div>
                <div className={styles.content_sub}>Odds are, you’ll have fun!</div>
                {aContent.map((item) => {
                    return (
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
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
