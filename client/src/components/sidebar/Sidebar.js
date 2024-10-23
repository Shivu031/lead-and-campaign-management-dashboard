import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  const links = [
    { path: "/", name: "Dashboard" },
    { path: "/leads", name: "Leads" },
    { path: "/analytics", name: "Analytics" },
    { path: "/reports", name: "Reports" },
    { path: "/email-alert", name: "Email Alert" },
  ];

  return (
    <div className="sidebar">
        <ul>
          {links.map(link => (
            <li key={link.path}>
              <Link to={link.path} data-char={link.name.charAt(0)}>
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
    </div>
  );
};

export default Sidebar;
