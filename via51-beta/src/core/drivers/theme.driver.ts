// via51-beta/src/core/drivers/theme.driver.ts

export interface V51Theme {
    mode: 'NEUROMORPHIC' | 'MINIMALIST' | 'CYBERNETIC';
    colors: { primary: string; secondary: string; background: string; surface: string; };
    assets: { logo_url: string; icon_set: string; };
    typography: 'INTER_SANS' | 'ROBOTO_MONO';
}

// Configuración por defecto para Vía51
const defaultTheme: V51Theme = {
    mode: 'CYBERNETIC',
    colors: { primary: '#00FF41', secondary: '#008F11', background: '#0D0208', surface: '#003B00' },
    assets: { logo_url: '/assets/v51-logo.svg', icon_set: 'antigravity-icons' },
    typography: 'ROBOTO_MONO'
};