import React, { useState, useEffect, Fragment } from 'react';
import Head from 'next/head';
import Header from '../Header';
import styles from './Layout.module.scss';
import { useRouter } from 'next/router';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

const Layout = (props) => {
    const router = useRouter();
    const navActive = router.pathname;

    const onNavItemClicked = (item) => {
        router.push(item.url);
    };
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (window.scrollY === 0) {
            setScrolling(false);
        }
        if (window.scrollY !== 0) {
            setScrolling(true);
        }
    };

    const onNewMessage = () => {
        router.push('/message');
    };

    const { children } = props;

    return (
        <div className={styles.root}>
            <Head {...props}>
                <title>Lottery Game</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet" />
                <link rel="icon" href="/logo.png" />
            </Head>
            <div className={styles.header} style={scrolling ? { background: '#fff' } : null}>
                <Header />
            </div>
            <div className={styles.body}>
                <div className={styles.main}>
                    {navActive.indexOf('/message') === 0 && (
                        <div className={styles.container}>
                            <button className={styles.new_message} onClick={onNewMessage}>
                                <BorderColorOutlinedIcon fontSize="small" /> New message
                            </button>
                            <div className={styles.nav}>
                                {aNav.map((item, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <div
                                                className={navActive.indexOf(item.url) === 0 ? styles.nav_label_active : styles.nav_label}
                                                onClick={() => onNavItemClicked(item)}
                                            >
                                                {item.icon && <item.icon className={styles.nav_icon} />}
                                                {item.label}
                                            </div>
                                            <div className={styles.line} />
                                        </Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    {children}
                </div>
                {/* <div className={styles.footer}>
                    <Footer />
                </div> */}
            </div>
        </div>
    );
};

export default Layout;

const aNav = [
    { id: 'inbox', label: 'Inbox', url: '/message/inbox', icon: InboxOutlinedIcon },
    { id: 'sent', label: 'Sent Items', url: '/message/sent', icon: SendOutlinedIcon },
    { id: 'deleted', label: 'Deleted', url: '/message/deleted', icon: DeleteOutlinedIcon },
];
