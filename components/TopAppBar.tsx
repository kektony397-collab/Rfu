
import React from 'react';
import type { TopAppBarProps } from '../types';

const TopAppBar: React.FC<TopAppBarProps> = ({ theme, toggleTheme }) => {
    const getThemeIcon = () => {
        switch (theme) {
            case 'light': return 'light_mode';
            case 'dark': return 'dark_mode';
            default: return 'brightness_auto';
        }
    };
    
    return (
        <header className="fixed top-0 left-0 right-0 h-16 bg-surface dark:bg-surface z-10 shadow-sm transition-colors duration-300">
            <div className="max-w-6xl mx-auto flex items-center justify-between h-full px-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-medium text-on-surface">Fuel Calculator</h1>
                    <div className="text-xs font-medium bg-primary-container text-on-primary-container px-3 py-1.5 rounded-lg">
                        Dream Yuga
                    </div>
                </div>
                <button 
                    onClick={toggleTheme} 
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-on-surface/10 active:bg-on-surface/20 transition-colors"
                    aria-label="Toggle theme"
                >
                    <span className="material-symbols-outlined text-on-surface-variant">
                        {getThemeIcon()}
                    </span>
                </button>
            </div>
        </header>
    );
};

export default TopAppBar;
