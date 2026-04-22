import { Font } from '@react-pdf/renderer'

export const registerFonts = () => {
    Font.register({
        family: 'Inter',
        fonts: [
            { src: 'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-400-normal.woff' },
            { src: 'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-700-normal.woff', fontWeight: 'bold' },
            { src: 'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-400-italic.woff', fontStyle: 'italic' },
            { src: 'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-700-italic.woff', fontWeight: 'bold', fontStyle: 'italic' }
        ]
    })

    Font.register({
        family: 'Lora',
        fonts: [
            { src: 'https://cdn.jsdelivr.net/npm/@fontsource/lora/files/lora-latin-400-normal.woff' },
            { src: 'https://cdn.jsdelivr.net/npm/@fontsource/lora/files/lora-latin-700-normal.woff', fontWeight: 'bold' },
            { src: 'https://cdn.jsdelivr.net/npm/@fontsource/lora/files/lora-latin-400-italic.woff', fontStyle: 'italic' },
            { src: 'https://cdn.jsdelivr.net/npm/@fontsource/lora/files/lora-latin-700-italic.woff', fontWeight: 'bold', fontStyle: 'italic' }
        ]
    })

    Font.register({
        family: 'Playfair Display',
        fonts: [
            { src: 'https://cdn.jsdelivr.net/npm/@fontsource/playfair-display/files/playfair-display-latin-400-normal.woff' },
            { src: 'https://cdn.jsdelivr.net/npm/@fontsource/playfair-display/files/playfair-display-latin-700-normal.woff', fontWeight: 'bold' },
            { src: 'https://cdn.jsdelivr.net/npm/@fontsource/playfair-display/files/playfair-display-latin-400-italic.woff', fontStyle: 'italic' },
            { src: 'https://cdn.jsdelivr.net/npm/@fontsource/playfair-display/files/playfair-display-latin-700-italic.woff', fontWeight: 'bold', fontStyle: 'italic' }
        ]
    })

    Font.register({
        family: 'Lato',
        fonts: [
            { src: 'https://cdn.jsdelivr.net/npm/@fontsource/lato/files/lato-latin-400-normal.woff' },
            { src: 'https://cdn.jsdelivr.net/npm/@fontsource/lato/files/lato-latin-700-normal.woff', fontWeight: 'bold' },
            { src: 'https://cdn.jsdelivr.net/npm/@fontsource/lato/files/lato-latin-400-italic.woff', fontStyle: 'italic' },
            { src: 'https://cdn.jsdelivr.net/npm/@fontsource/lato/files/lato-latin-700-italic.woff', fontWeight: 'bold', fontStyle: 'italic' }
        ]
    })
}
