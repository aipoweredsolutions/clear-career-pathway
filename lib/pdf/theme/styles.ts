import { StyleSheet } from '@react-pdf/renderer'
import { getTemplateColors } from './colors'

// Dynamic styles factory
export const createStyles = (templateId: string) => {
    const colors = getTemplateColors(templateId)
    const id = templateId.toLowerCase()

    const isATS = id.startsWith('ats-')
    const isSidebarLayout = 
        id.startsWith('modern') || 
        id.startsWith('professional') || 
        id.startsWith('elegant') || 
        id.startsWith('prestige') ||
        id.includes('sidebar')
        
    const hasSidebar = isSidebarLayout
    const hasColumns = isSidebarLayout
    const sidebarOnRight = id.includes('right') || id.startsWith('elegant') || id.startsWith('modern')
    const sidebarOnLeft = hasSidebar && !sidebarOnRight
    
    // Increased margins for ATS templates for better scanner readability
    const containerPaddingX = isATS ? 54 : 30
    const containerPaddingY = isATS ? 45 : 20
    
    const isEtsyPremiumSerif = id.startsWith('ats-executive') || id === 'classic-clean' || id.startsWith('ats-royal');
    const isStandardSerif = id.startsWith('ats-academia') || id.startsWith('ats-classic') || id.includes('serif') || id.startsWith('prestige') || id.startsWith('ats-gold');
    
    let fontFamily = 'Inter';
    if (isEtsyPremiumSerif) fontFamily = 'Playfair Display';
    else if (isStandardSerif) fontFamily = 'Lora';
    else if (id.includes('technical')) fontFamily = 'Courier';
    else if (id.startsWith('ats-minimal') || id.startsWith('ats-modern')) fontFamily = 'Lato';

    const baseLineHeight = isEtsyPremiumSerif ? 1.45 : (isStandardSerif ? 1.35 : 1.3);
    const headingLetterSpacing = (isEtsyPremiumSerif || id.startsWith('minimal') || id.startsWith('cute') || id.startsWith('modern')) ? 1.5 : 1;

    // Specific alignment checks to match HTML templates
    const isCentered = id.startsWith('classic') ||
        id.startsWith('ats-professional') ||
        id.startsWith('ats-classic') ||
        id.startsWith('ats-hospitality') ||
        id.startsWith('ats-nursing') ||
        id.startsWith('ats-academia') ||
        id.startsWith('ats-gold-standard')

    const isJustifiedHeader = (id.includes('technical') || id.startsWith('ats-modern')) && !id.startsWith('ats-timeline')

    // Pre-calculate border widths
    let headerBorderBottomWidth = 0
    if (id.startsWith('ats-executive')) {
        headerBorderBottomWidth = 4
    } else if (id.startsWith('ats-standard') || id.startsWith('ats-classic') || id.startsWith('classic') || id.startsWith('ats-gold-standard')) {
        headerBorderBottomWidth = 1
    } else if (id.startsWith('ats-modern')) {
        headerBorderBottomWidth = 2
    } else if (id.startsWith('compact') || id.startsWith('ats-timeline') || id.startsWith('ats-hospitality')) {
        headerBorderBottomWidth = 2
    }

    const sidebarBorderLeftWidth = sidebarOnRight ? 1 : 0
    const sidebarBorderRightWidth = sidebarOnRight ? 0 : 1

    const photoBorderRadius = id.startsWith('cruise') || id.startsWith('hotel') ? 60 : (id.startsWith('chef') ? 12 : 4)

    return StyleSheet.create({
        page: {
            fontFamily,
            fontSize: 10,
            lineHeight: baseLineHeight,
            color: colors.text,
            backgroundColor: colors.headerBg || '#ffffff',
            flexDirection: 'column',
        },
        container: {
            flexDirection: 'row',
            paddingTop: containerPaddingY,
            paddingBottom: containerPaddingY * 2, // Extra space at bottom for better flow
            paddingLeft: containerPaddingX,
            paddingRight: containerPaddingX,
        },
        sidebar: {
            position: 'absolute',
            left: sidebarOnRight ? 'auto' : 0,
            right: sidebarOnRight ? 0 : 'auto',
            top: 0,
            bottom: 0,
            width: '32%',
            backgroundColor: colors.sidebarBg || colors.primary,
            color: colors.sidebarText || '#ffffff',
            padding: 20,
            paddingTop: 30,
            paddingLeft: sidebarOnRight ? 20 : 30,
            paddingRight: sidebarOnRight ? 30 : 20,
            ...(sidebarBorderLeftWidth > 0 ? { borderLeftWidth: sidebarBorderLeftWidth, borderLeftColor: 'rgba(0,0,0,0.05)' } : {}),
            ...(sidebarBorderRightWidth > 0 ? { borderRightWidth: sidebarBorderRightWidth, borderRightColor: 'rgba(0,0,0,0.05)' } : {}),
        },
        initialsCircle: {
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderWidth: 2,
            borderColor: 'rgba(255,255,255,0.2)',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 15,
            alignSelf: 'center',
        },
        initialsText: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#ffffff',
        },
        terminalHeader: {
            backgroundColor: id.includes('dark') ? '#171717' : '#f8fafc',
            padding: 15,
            borderRadius: 6,
            marginBottom: 15,
            borderWidth: 1,
            borderColor: id.includes('dark') ? '#334155' : '#e2e8f0',
        },
        terminalDots: {
            flexDirection: 'row',
            gap: 4,
            position: 'absolute',
            top: 10,
            right: 10,
        },
        terminalDot: {
            width: 8,
            height: 8,
            borderRadius: 4,
        },
        photo: {
            width: 100,
            height: 100,
            objectFit: 'cover',
            borderRadius: photoBorderRadius,
            borderWidth: 3,
            borderColor: '#ffffff',
            alignSelf: 'center',
            marginBottom: 15,
        },
        mainContent: {
            width: hasSidebar ? '68%' : '100%',
            marginLeft: (hasSidebar && !sidebarOnRight) ? '32%' : 0,
            marginRight: (hasSidebar && sidebarOnRight) ? '32%' : 0,
            padding: hasSidebar ? 20 : 0,
            paddingTop: hasSidebar ? 25 : 0,
            paddingRight: hasSidebar ? 30 : 0,
            paddingBottom: hasSidebar ? 40 : 0,
            backgroundColor: '#ffffff',
        },
        header: {
            marginBottom: 12,
            flexDirection: isJustifiedHeader ? 'row' : 'column',
            justifyContent: isJustifiedHeader ? 'space-between' : 'flex-start',
            alignItems: (isCentered || id.startsWith('ats-professional')) ? 'center' : (isJustifiedHeader ? 'flex-end' : 'flex-start'),
            textAlign: (isCentered || id.startsWith('ats-professional')) ? 'center' : 'left',
            paddingBottom: 12,
            borderBottomWidth: headerBorderBottomWidth,
            borderBottomColor: id.startsWith('ats-executive') ? '#262626' :
                (id.startsWith('ats-hospitality') ? '#d1d5db' :
                    (id.startsWith('ats-standard') ? '#e5e7eb' :
                        (id.startsWith('ats-graduate') ? '#f3f4f6' :
                            (id.startsWith('ats-classic') ? '#d1d5db' :
                                (id.startsWith('ats-modern') ? '#e5e7eb' : colors.primary))))),
            width: '100%',
        },
        name: {
            fontSize: id.includes('minimal') || id.startsWith('ats-professional') || id.startsWith('classic') || id === 'graduate' || id.startsWith('graduate-') || id.startsWith('ats-modern') ? 30 : 22,
            fontWeight: 'bold',
            color: colors.primary,
            marginBottom: id.startsWith('ats-modern') ? 10 : (id.startsWith('ats-professional') ? 2 : (id.includes('minimal') ? 4 : 6)),
            textTransform: (id.includes('minimal') || id.startsWith('ats-executive') || id.startsWith('classic') || id.startsWith('ats-gold-standard') || id.startsWith('ats-timeline') || id.startsWith('ats-nursing') || id.startsWith('ats-metro') || id.startsWith('ats-masthead') || id.startsWith('ats-hospitality') || id.startsWith('ats-gridline') || id.startsWith('ats-classic') || id.startsWith('ats-chronograph') || id.startsWith('ats-bauhaus') || id.startsWith('ats-academia') || id === 'cover-letter') ? 'uppercase' : 'none',
            letterSpacing: id.startsWith('classic') ? 1.5 : ((id === 'graduate' || id.startsWith('graduate-') || id.startsWith('ats-gold-standard')) ? 2 : (id.startsWith('ats-executive') || id.startsWith('ats-modern') ? -0.5 : 0.5)),
        },
        title: {
            fontSize: id.startsWith('ats-modern') ? 14 : 11,
            color: id.startsWith('ats-professional') ? colors.primary : colors.secondary,
            fontWeight: id.startsWith('ats-professional') ? 500 : 'bold',
            marginTop: id.startsWith('ats-modern') ? 4 : 0,
            marginBottom: 8,
            textTransform: id.startsWith('chic') || id.startsWith('executive') || id.startsWith('luxe') || id.startsWith('ats-executive') || id.startsWith('ats-hospitality') ? 'uppercase' : 'none',
            letterSpacing: headingLetterSpacing,
        },
        contactInfo: {
            flexDirection: id.startsWith('ats-modern') ? 'column' : 'row',
            justifyContent: (isCentered || id.startsWith('ats-professional')) ? 'center' : (id.startsWith('ats-modern') ? 'flex-end' : 'flex-start'),
            alignItems: id.startsWith('ats-modern') ? 'flex-end' : 'center',
            columnGap: 16,
            rowGap: id.startsWith('ats-modern') ? 2 : 4,
            fontSize: 9.5,
            color: '#475569',
            marginTop: id.startsWith('ats-modern') ? 0 : 4,
            marginBottom: 0,
            flexWrap: 'wrap',
            width: '100%',
        },
        contactItem: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
        },
        contactIcon: {
            fontSize: 10,
            color: '#1a1a1a',
        },
        sidebarContact: {
            marginTop: 15,
            gap: 4,
        },
        sidebarContactItem: {
            fontSize: 10,
            lineHeight: 1.3,
            opacity: 0.9,
            marginBottom: 2,
        },
        section: {
            marginTop: (isEtsyPremiumSerif || id.startsWith('minimal') || id.startsWith('cute') || id.startsWith('modern') || id.startsWith('ats-modern') || id.startsWith('elite-london')) ? 24 : 10,
            marginBottom: 0,
        },
        sectionFirst: {
            marginTop: 0,
            marginBottom: 0,
        },
        sectionTitle: {
            fontSize: 9,
            fontWeight: 'bold',
            color: colors.primary,
            textTransform: 'uppercase',
            letterSpacing: id.startsWith('ats-modern') ? 2.2 : (id.startsWith('elite-london') ? 2 : 1.2),
            paddingBottom: (id.startsWith('ats-modern') || id.startsWith('elite-london')) ? 6 : 4,
            marginBottom: 8,
            borderBottomWidth: (id.startsWith('ats-professional') || id.startsWith('technical') || id.startsWith('elite-london')) ? 2 : (id.startsWith('ats-classic') || id.startsWith('ats-graduate') || id.startsWith('ats-modern') ? 1 : 0),
            borderBottomColor: id.startsWith('elite-london') ? '#e2e8f0' : colors.primary,
        },
        sidebarSection: {
            marginTop: 25,
        },
        sidebarSectionTitle: {
            fontSize: 10,
            fontWeight: 'bold',
            color: colors.sidebarText || '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: 2,
            marginBottom: 12,
            paddingBottom: 4,
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(255,255,255,0.2)',
        },
        experienceItem: {
            marginBottom: 12,
            paddingLeft: (id.startsWith('creative') || id.startsWith('startup') || id.startsWith('technical')) && !id.startsWith('ats') ? 10 : 0,
            borderLeftWidth: (id.startsWith('creative') || id.startsWith('startup') || id.startsWith('technical')) && !id.startsWith('ats') ? 2 : 0,
            borderLeftColor: colors.primary,
        },
        experienceHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 2,
        },
        jobTitle: {
            fontSize: 12,
            fontWeight: 'bold',
            color: colors.primary,
            fontStyle: id.startsWith('ats-classic') ? 'italic' : 'normal',
            textTransform: id.startsWith('ats-executive') ? 'uppercase' : 'none',
            flex: 1,
        },
        company: {
            fontSize: 10,
            fontWeight: 'bold',
            color: id.startsWith('ats-executive') ? colors.primary : colors.text,
            fontStyle: 'normal',
        },
        date: {
            fontSize: 9,
            color: colors.secondary,
            fontWeight: 'bold',
        },
        location: {
            fontSize: 9,
            color: '#64748b',
        },
        description: {
            fontSize: 9.5,
            color: '#334155',
            marginTop: 4,
            lineHeight: 1.4,
        },
        bulletContainer: {
            flexDirection: 'row',
            marginTop: 3,
            paddingLeft: 4,
        },
        bullet: {
            width: 10,
            fontSize: 10,
            color: colors.primary,
        },
        bulletText: {
            flex: 1,
            fontSize: 9.5,
            color: '#334155',
            lineHeight: 1.4,
        },
        skillBadge: {
            backgroundColor: id.startsWith('ats') ? 'transparent' : (colors.sidebarBg ? 'rgba(255,255,255,0.1)' : '#f1f5f9'),
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 4,
            marginBottom: 4,
            marginRight: 4,
            borderWidth: id.startsWith('ats') ? 0 : 1,
            borderColor: colors.sidebarBg ? 'rgba(255,255,255,0.2)' : '#e2e8f0',
        },
        skillText: {
            fontSize: 8.5,
            color: colors.sidebarBg ? '#ffffff' : colors.text,
            fontWeight: id.startsWith('ats') ? 'bold' : 'normal',
        },
        skillRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 4,
        },
        watermark: {
            position: 'absolute',
            bottom: 20,
            right: 30,
            fontSize: 8,
            color: '#94a3b8',
            opacity: 0.5,
        },
        pageHeader: {
            position: 'absolute',
            top: 20,
            left: containerPaddingX,
            right: containerPaddingX,
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 100,
        },
        pageHeaderName: {
            fontSize: 10,
            fontWeight: 'bold',
            color: colors.primary,
            textTransform: 'uppercase',
            letterSpacing: 1.5,
            marginBottom: 4,
        },
        pageHeaderLine: {
            height: 0.5,
            width: '100%',
            backgroundColor: '#e2e8f0',
        },
    })
}
