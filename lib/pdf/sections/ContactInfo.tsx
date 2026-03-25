import React from 'react'
import { Text, View } from '@react-pdf/renderer'

export const ContactInfo = ({ data, styles, isSidebar = false }: any) => {
    const { email, phone, location, city, country, websiteUrl, linkedinUrl, githubUrl } = data.personalInfo || {}
    
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

    return (
        <View style={styles.contactInfo}>
            {email && (
                <View style={styles.contactItem}>
                    <Text>{email}</Text>
                </View>
            )}
            {phone && (
                <View style={styles.contactItem}>
                    <Text>{phone}</Text>
                </View>
            )}
            {displayLocation && (
                <View style={styles.contactItem}>
                    <Text>{displayLocation}</Text>
                </View>
            )}
            {linkedinUrl && (
                <View style={styles.contactItem}>
                    <Text>LinkedIn: {linkedinUrl.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</Text>
                </View>
            )}
            {websiteUrl && (
                <View style={styles.contactItem}>
                    <Text>{websiteUrl.replace(/^https?:\/\//, '')}</Text>
                </View>
            )}
        </View>
    )
}

