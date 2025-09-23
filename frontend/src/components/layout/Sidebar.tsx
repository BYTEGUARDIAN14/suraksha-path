import React from 'react';
import { NavLink } from 'react-router-dom';

type NavItem = { to: string; label: string };

interface SidebarProps {
  title: string;
  items: NavItem[];
}

export default function Sidebar({ title, items }: SidebarProps) {
  return (
    <aside className="w-full md:w-64 border-r bg-white">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-blue-700 font-poppins">{title}</h2>
      </div>
      <nav className="p-2 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md font-poppins transition-all ${
                isActive ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-gray-700 hover:bg-gray-50 hover:translate-x-0.5'
              }`
            }
            end
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}


