import { Bell, User, LayoutDashboard, Egg, Cookie, Pill, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Egg Logging', icon: Egg, path: '/egg-logging' },
    { name: 'Feed Management', icon: Cookie, path: '/feed-management' },
    { name: 'Medication Tracking', icon: Pill, path: '/medication-tracking' },
  ];

  return (
    <header className={styles.sidebar}>
      <div className={styles.logoSection}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🐔</span>
          <span className={styles.logoText}>PoultryFarm</span>
        </Link>
      </div>

      <nav className={styles.navigation}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              onMouseEnter={() => setIsHovered(item.name)}
              onMouseLeave={() => setIsHovered(null)}
            >
              <Icon className={styles.navIcon} />
              <span className={styles.navText}>{item.name}</span>
              {isHovered === item.name && (
                <ChevronRight className={styles.hoverIcon} />
              )}
            </Link>
          );
        })}
      </nav>

      <div className={styles.userSection}>
        <Button variant="ghost" className={styles.notificationButton}>
          <Bell className={styles.notificationIcon} />
          <span className={styles.notificationBadge}></span>
        </Button>
        <Button variant="ghost" className={styles.userButton}>
          <User className={styles.userIcon} />
        </Button>
      </div>
    </header>
  );
};

export default Header;