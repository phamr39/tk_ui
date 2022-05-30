import React from 'react';
import styles from './Header.module.scss';
import Account from '../Account';
import NavItem from '../NavItem';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
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
            </div>
            <div className={styles.account}>
                <Account />
            </div>
        </div>
    );
};

export default withRouter(Header);
