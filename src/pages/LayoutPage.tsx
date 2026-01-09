'use client';

import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Home, FileText, FilePlus, Users } from 'lucide-react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const navigationItems: {
  title: string;
  to: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    title: 'Home',
    to: '/',
    description: 'Welcome to the main dashboard and overview page',
    // Sử dụng màu Slate/Gray cho sự ổn định
    icon: <Home size={18} color="#64748b" strokeWidth={2.5} />,
    color: '#64748b',
  },
  {
    title: 'Manage Files',
    to: '/manage-file',
    description: 'View, edit, and organize your existing files',
    // Màu Blue chuyên nghiệp cho quản lý dữ liệu
    icon: <FileText size={18} color="#2563eb" strokeWidth={2.5} />,
    color: '#2563eb',
  },
  {
    title: 'Create File',
    to: '/create-file',
    description: 'Create and upload new files to the system',
    // Màu Emerald mang tính hành động tích cực
    icon: <FilePlus size={18} color="#059669" strokeWidth={2.5} />,
    color: '#059669',
  },
  {
    title: 'Manage Students',
    to: '/manage-student',
    description: 'View and manage student information and records',
    // Màu Indigo/Violet cho quản lý con người
    icon: <Users size={18} color="#4f46e5" strokeWidth={2.5} />,
    color: '#4f46e5',
  },
];

export function LayoutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <NavigationMenu>
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuLink asChild>
                    <Link to={item.to}>
                      <div className="flex gap-2 items-center">
                        <span>{item.icon}</span>
                        <span className="text-xl" style={{ color: item.color }}>
                          {item.title}
                        </span>
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
