import React from 'react';
import { Bell, Menu } from 'lucide-react';
import styles from '../styles/Header.module.css';

const Header = ({ toggleSidebar }: { toggleSidebar?: () => void }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <button
          className={styles.menuButton}
          onClick={toggleSidebar}
        >
          <Menu className={styles.menuIcon} />
        </button>

        <div className={styles.headerRight}>
          <button className={styles.notificationButton}>
            <Bell className={styles.bellIcon} />
            <span className={styles.notificationBadge}>2</span>
          </button>
          <div className={styles.userInfo}>
            <img
              src="/avatar.jpg"
              alt="User"
              className={styles.avatar}
            />
            <span className={styles.userName}>John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;