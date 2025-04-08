import { Bell, ChevronRight, Cookie, Egg, LayoutDashboard, Menu, Pill, User, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Egg Logging', icon: Egg, path: '/egg-logging' },
    { name: 'Feed Management', icon: Cookie, path: '/feed-management' },
    { name: 'Medication Tracking', icon: Pill, path: '/medication-tracking' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`${styles.sidebar} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
      <div className={styles.logoSection}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🐔</span>
          <span className={styles.logoText}>PoultryFarm</span>
        </Link>
        <Button
          variant="ghost"
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      <nav className={`${styles.navigation} ${isMobileMenuOpen ? styles.showMobile : ''}`}>
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
              onClick={() => setIsMobileMenuOpen(false)}
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

      <div className={`${styles.userSection} ${isMobileMenuOpen ? styles.showMobile : ''}`}>
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