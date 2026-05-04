import React from 'react'

export const metadata = {
    title: 'Cookie Policy | Clear Career Path',
    description: 'Detailed information about how we use cookies on our platform.',
}

export default function CookiePolicyPage() {
    return (
        <div className="min-h-screen bg-white pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-neutral-900 mb-8 font-serif">Cookie Policy</h1>

                <div className="prose prose-neutral max-w-none text-neutral-600 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. What are Cookies?</h2>
                        <p>
                            Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. How We Use Cookies</h2>
                        <p>
                            We use cookies to enhance your experience on Clear Career Path. We categorize our cookies into the following types:
                        </p>
                        <div className="overflow-x-auto mt-6">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-neutral-200">
                                        <th className="py-3 font-bold text-neutral-900">Category</th>
                                        <th className="py-3 font-bold text-neutral-900">Purpose</th>
                                        <th className="py-3 font-bold text-neutral-900">Required?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-neutral-100">
                                        <td className="py-4 font-medium">Essential</td>
                                        <td className="py-4">Authentication, security, and session management (Supabase).</td>
                                        <td className="py-4 text-green-600 font-bold">Yes</td>
                                    </tr>
                                    <tr className="border-b border-neutral-100">
                                        <td className="py-4 font-medium">Preferences</td>
                                        <td className="py-4">Remembering your template choices or UI preferences.</td>
                                        <td className="py-4 text-neutral-500">Optional</td>
                                    </tr>
                                    <tr className="border-b border-neutral-100">
                                        <td className="py-4 font-medium">Analytics</td>
                                        <td className="py-4">Understanding how users interact with our platform to improve features.</td>
                                        <td className="py-4 text-neutral-500">Optional</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. Specific Cookies We Use</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>sb-access-token:</strong> Essential session token for Supabase authentication.</li>
                            <li><strong>sb-refresh-token:</strong> Essential token to keep you logged in.</li>
                            <li><strong>cookieConsent:</strong> Remembers your consent choice.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Your Choices</h2>
                        <p>
                            You can choose to reject non-essential cookies via our consent banner. Additionally, most web browsers allow you to control cookies through their settings. However, if you disable all cookies (including essential ones), you will not be able to log in or use the core features of our service.
                        </p>
                    </section>

                    <section className="pt-8 border-t border-neutral-100 italic">
                        <p>Last Updated: May 2, 2026</p>
                    </section>
                </div>
            </div>
        </div>
    )
}
