import { Font } from '@react-pdf/renderer'

export const registerFonts = () => {
    Font.register({
        family: 'Inter',
        fonts: [
            { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2' },
            { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2', fontWeight: 'bold' },
            { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontStyle: 'italic' },
            { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2', fontWeight: 'bold', fontStyle: 'italic' }
        ]
    })

    Font.register({
        family: 'Lora',
        fonts: [
            { src: 'https://fonts.gstatic.com/s/lora/v23/0QI6MX1D_JOuAwHTJED0.woff2' },
            { src: 'https://fonts.gstatic.com/s/lora/v23/0QI6MX1D_JOuAwHTJED0.woff2', fontWeight: 'bold' },
            { src: 'https://fonts.gstatic.com/s/lora/v23/0QI6MX1D_JOuAwHTJED0.woff2', fontStyle: 'italic' },
            { src: 'https://fonts.gstatic.com/s/lora/v23/0QI6MX1D_JOuAwHTJED0.woff2', fontWeight: 'bold', fontStyle: 'italic' }
        ]
    })

    Font.register({
        family: 'Playfair Display',
        fonts: [
            { src: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff2' },
            { src: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKd3vXDXbtM.woff2', fontWeight: 'bold' },
            { src: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFmD-vYSZviVYUb_rj3ij__anPXDTLCSb6EwwihT4m_p3jWbtM.woff2', fontStyle: 'italic' },
            { src: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFmD-vYSZviVYUb_rj3ij__anPXDTLCSb6EwwihT4m8pXjWbtM.woff2', fontWeight: 'bold', fontStyle: 'italic' }
        ]
    })

    Font.register({
        family: 'Lato',
        fonts: [
            { src: 'https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTFMjTqkIwuAFw.woff2' },
            { src: 'https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTFMflQ46wusFwezeQ.woff2', fontWeight: 'bold' },
            { src: 'https://fonts.gstatic.com/s/lato/v24/S6u8w4BMUTFMjrsI6wuWGwg.woff2', fontStyle: 'italic' },
            { src: 'https://fonts.gstatic.com/s/lato/v24/S6u_w4BMUTFMjrsKU-YmGQ2X-Qw.woff2', fontWeight: 'bold', fontStyle: 'italic' }
        ]
    })
}
