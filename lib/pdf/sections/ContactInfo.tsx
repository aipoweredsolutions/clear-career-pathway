import React from 'react'
import { Text, View } from '@react-pdf/renderer'

export const ContactInfo = ({ data, styles, isSidebar = false, separator = null }: any) => {
    const { email, phone, location, city, country, websiteUrl, linkedinUrl } = data.personalInfo || {}
    
    const displayLocation = location || [city, country].filter(Boolean).join(', ')

    if (isSidebar) {
        return (
            <View style={styles.sidebarContact}>
                <Text style={styles.sidebarSectionTitle}>CONTACT</Text>
                {email && <Text style={styles.sidebarContactItem}>{email}</Text>}
                {phone && <Text style={styles.sidebarContactItem}>{phone}</Text>}
                {displayLocation && <Text style={styles.sidebarContactItem}>{displayLocation}</Text>}
                {websiteUrl && <Text style={styles.sidebarContactItem}>{websiteUrl.replace(/^https?:\/\//, '')}</Text>}
                {linkedinUrl && <Text style={styles.sidebarContactItem}>{linkedinUrl.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</Text>}
            </View>
        )
    }

    const items = [
        email,
        phone,
        displayLocation,
        linkedinUrl ? linkedinUrl.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '') : null,
        websiteUrl ? websiteUrl.replace(/^https?:\/\//, '') : null
    ].filter(Boolean)

    return (
        <View style={styles.contactInfo}>
            {items.map((item, i) => (
                <React.Fragment key={i}>
                    <View style={styles.contactItem}>
                        <Text>{item}</Text>
                    </View>
                    {separator && i < items.length - 1 && (
                        <Text style={{ opacity: 0.3, marginLeft: 8, marginRight: 8, fontSize: styles.contactInfo.fontSize + 2 }}>{separator}</Text>
                    )}
                </React.Fragment>
            ))}
        </View>
    )
}

