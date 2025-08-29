
interface Theme {
    isDark: boolean;
    colors: Record<string, string>;
}

const lightThemeBase = {
    'on-primary': '#FFFFFF',
    'on-secondary': '#FFFFFF',
    'on-tertiary': '#FFFFFF',
    'on-error': '#FFFFFF',
    'on-background': '#1C1B1F',
    'on-surface': '#1C1B1F',
    'outline': '#79747E',
    'inverse-surface': '#313033',
    'inverse-on-surface': '#F4EFF4',
};

const themes: Record<string, Theme> = {
    'default': {
        isDark: false,
        colors: {
            ...lightThemeBase,
            'primary': '#6750A4',
            'primary-container': '#EADDFF',
            'on-primary-container': '#21005D',
            'secondary': '#625B71',
            'secondary-container': '#E8DEF8',
            'on-secondary-container': '#1D192B',
            'background': '#F3F3F7',
            'surface': '#FFFBFE',
            'surface-variant': '#E7E0EC',
            'on-surface-variant': '#49454F',
        },
    },
    'ocean': {
        isDark: false,
        colors: {
            ...lightThemeBase,
            'primary': '#00658E',
            'primary-container': '#C7E7FF',
            'on-primary-container': '#001E2E',
            'secondary': '#4F616E',
            'secondary-container': '#D2E5F5',
            'on-secondary-container': '#0B1E29',
            'background': '#F8F9FA',
            'surface': '#FCFCFF',
            'surface-variant': '#DDE3EA',
            'on-surface-variant': '#41484D',
        },
    },
    'forest': {
        isDark: false,
        colors: {
            ...lightThemeBase,
            'primary': '#3A6A20',
            'primary-container': '#B9F397',
            'on-primary-container': '#042100',
            'secondary': '#55624C',
            'secondary-container': '#D9E7CB',
            'on-secondary-container': '#131F0D',
            'background': '#F5F7F1',
            'surface': '#FDFCF7',
            'surface-variant': '#E0E4D7',
            'on-surface-variant': '#43483E',
        },
    },
    'sunset': {
        isDark: false,
        colors: {
            ...lightThemeBase,
            'primary': '#8F4C00',
            'primary-container': '#FFDCC2',
            'on-primary-container': '#2E1500',
            'secondary': '#745944',
            'secondary-container': '#FFDCC2',
            'on-secondary-container': '#2A1707',
            'background': '#FFF3EC',
            'surface': '#FFFBF8',
            'surface-variant': '#F2DFD1',
            'on-surface-variant': '#51443A',
        },
    },
    'lavender': {
        isDark: false,
        colors: {
            ...lightThemeBase,
            'primary': '#5B52A7',
            'primary-container': '#E3DFFF',
            'on-primary-container': '#160261',
            'secondary': '#5E5C71',
            'secondary-container': '#E4E0F9',
            'on-secondary-container': '#1B192C',
            'background': '#F6F4FA',
            'surface': '#FFFBFF',
            'surface-variant': '#E5E1EC',
            'on-surface-variant': '#47464F',
        },
    },
    'dark': {
        isDark: true,
        colors: {
            'primary': '#D0BCFF',
            'on-primary': '#381E72',
            'primary-container': '#4F378B',
            'on-primary-container': '#EADDFF',
            'secondary': '#CCC2DC',
            'on-secondary': '#332D41',
            'background': '#141218',
            'surface': '#1C1B1F',
            'on-surface': '#E6E1E5',
            'surface-variant': '#49454F',
            'on-surface-variant': '#CAC4D0',
            'outline': '#938F99',
            'inverse-surface': '#E6E1E5',
            'inverse-on-surface': '#313033',
        },
    }
};

const THEME_NAMES = ['default', 'ocean', 'forest', 'sunset', 'lavender', 'dark', 'system'];

export { themes, THEME_NAMES };
