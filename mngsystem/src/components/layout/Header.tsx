import { Bell, Search, User } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const Header: React.FC = () => {
  return (
    <header>
      {/* Navigation Bar */}
      <nav style={{
        background: '#e6f4ea',
        padding: '12px 0',
        marginBottom: '16px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          display: 'flex',
          gap: '48px',
          alignItems: 'center'
        }}>
          <Link to="/" style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#2f4f4f'
          }}>
            PoultryFarm
          </Link>
          <div style={{
            display: 'flex',
            gap: '32px'
          }}>
            {['Dashboard', 'Egg Logging', 'Feed Management', 'Medication Tracking'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(' ', '-')}`}
                style={{
                  color: '#2f4f4f',
                  fontSize: '14px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#c8e6c9';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Existing Header Content */}
      <div style={{
        background: 'linear-gradient(to right, #ffffff, #f9fafb)',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}>
        {/* Search Bar */}
        <div style={{
          position: 'relative',
          width: '400px'
        }}>
          <Search style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af',
            width: '18px'
          }} />
          <input
            type="text"
            placeholder="Search..."
            style={{
              width: '100%',
              padding: '10px 16px 10px 40px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              backgroundColor: '#f9fafb',
              fontSize: '14px',
              outline: 'none',
              transition: 'all 0.2s',
              boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.05)'
            }}
          />
        </div>

        {/* Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            style={{
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              position: 'relative'
            }}
          >
            <Bell style={{ width: '20px' }} />
            <span style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#ef4444',
              border: '2px solid #fff'
            }}></span>
          </Button>

          {/* User Profile */}
          <Button
            variant="ghost"
            size="icon"
            style={{
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              background: '#2ecc71',
              color: 'white'
            }}
          >
            <User style={{ width: '20px' }} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;