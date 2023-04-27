module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', '.public/index.html'],
    theme: {
        extend: {
            width: {
                1100: '1100px',
            },
            borderColor: {
                borderLogin: '#dedede',
            },
            colors: {
                primary: '#F5F5F5',
                secondary1: '#1266dd',
                secondary2: '#f73859',
                secondary3: '#ff6600',
                secondary4: '#dc3545',
                secondary_content: '#febb02',
                'bg-overlay-50': 'rgba(0,0,0,.5)',
            },
            backgroundColor: {
                'overlay-30': 'rgba(0,0,0,.3)',
                'overlay-70': 'rgba(0,0,0,.7)',
            },
            flex: {
                3: '3 3 0%',
            },
            maxWidth: {
                1100: '1100px',
            },
        },
    },
    plugins: [],
};
