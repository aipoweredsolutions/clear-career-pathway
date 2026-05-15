import { redirect } from 'next/navigation'

/**
 * Redirects /account/settings to the main /account page
 * The /account page already contains comprehensive profile, security, and billing settings.
 */
export default function SettingsRedirect() {
    redirect('/account?tab=profile')
}
