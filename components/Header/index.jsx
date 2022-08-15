import React from 'react';
import styles from './Header.module.scss';
import Account from '../Account';
import NavItem from '../NavItem';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { withRouter, useRouter } from 'next/router';

const Header = (props) => {
    const router = useRouter();

    const getActiveClassName = () => {
        // const { router } = props;
        return router.pathname;
    };
    const cPath = getActiveClassName();

    const onLogoClick = () => {
        router.push('/');
    };

    return (
        <div className={styles.root}>
            <div className={styles.nav}>
                <div className={styles.logo_text} onClick={onLogoClick}>
                    Lottery Game
                    <FiberManualRecordIcon className={styles.logo_dot} />
                </div>
                <div className={styles.nav_item}>
                    <NavItem
                        icon={<DateRangeOutlinedIcon className={styles.nav_icon} />}
                        content={'Home'}
                        href={'/home'}
                        actived={cPath.indexOf('/home') === 0}
                    />
                </div>
                <div className={styles.nav_item}>
                    <NavItem
                        icon={<DateRangeOutlinedIcon className={styles.nav_icon} />}
                        content={'Lottery Game'}
                        href={'/lottery'}
                        actived={cPath.indexOf('/lottery') === 0}
                    />
                </div>
                <div className={styles.nav_item}>
                    <NavItem
                        icon={<DateRangeOutlinedIcon className={styles.nav_icon} />}
                        content={'The Hui Game'}
                        href={'/'}
                        actived={cPath.indexOf('/huigame') === 0}
                    />
                </div>
                <div className={styles.nav_item}>
                    <NavItem
                        icon={<DateRangeOutlinedIcon className={styles.nav_icon} />}
                        content={'How to play'}
                        href={'/how_to_play'}
                        actived={cPath.indexOf('/how_to_play') === 0}
                    />
                </div>
            </div>
            <div className={styles.account}>
                <Account />
            </div>
        </div>
    );
};

export default withRouter(Header);
