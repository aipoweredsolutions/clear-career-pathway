import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)

        // Parameters
        const title = searchParams.get('title') || 'AI-Powered ATS Resume Builder'
        const description = searchParams.get('description') || 'Build a professional, recruiter-approved resume in minutes.'
        const type = searchParams.get('type') || 'page' // 'page' or 'resume'
        const score = searchParams.get('score') || '98'

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#0a0a0a',
                        backgroundImage: 'radial-gradient(circle at 2px 2px, #333 1px, transparent 0)',
                        backgroundSize: '40px 40px',
                        padding: '80px',
                        position: 'relative',
                    }}
                >
                    {/* Glassmorphic Card */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '40px',
                            padding: '60px',
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        {/* Header: Logo & Branding */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{ 
                                    width: '50px', 
                                    height: '50px', 
                                    backgroundColor: '#2563eb', 
                                    borderRadius: '12px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    boxShadow: '0 0 20px rgba(37, 99, 235, 0.4)'
                                }}>
                                    <div style={{ width: '25px', height: '25px', backgroundColor: 'white', borderRadius: '4px' }} />
                                </div>
                                <span style={{ 
                                    fontSize: '24px', 
                                    fontWeight: 900, 
                                    color: 'white', 
                                    textTransform: 'uppercase', 
                                    letterSpacing: '0.2em' 
                                }}>
                                    Clear Career Path
                                </span>
                            </div>
                            
                            <div style={{ 
                                padding: '10px 20px', 
                                borderRadius: '20px', 
                                backgroundColor: 'rgba(52, 211, 153, 0.1)', 
                                border: '1px solid rgba(52, 211, 153, 0.2)',
                                color: '#34d399',
                                fontSize: '18px',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em'
                            }}>
                                ATS Score: {score}%
                            </div>
                        </div>

                        {/* Content */}
                        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                            <h1 style={{ 
                                fontSize: '72px', 
                                fontWeight: 900, 
                                color: 'white', 
                                lineHeight: 1.1, 
                                marginBottom: '20px',
                                textTransform: 'uppercase',
                                letterSpacing: '-0.02em',
                                maxWidth: '800px'
                            }}>
                                {title}
                            </h1>
                            <p style={{ 
                                fontSize: '32px', 
                                color: 'rgba(255, 255, 255, 0.5)', 
                                fontWeight: 500,
                                lineHeight: 1.4,
                                maxWidth: '700px'
                            }}>
                                {description}
                            </p>
                        </div>

                        {/* Footer / Decorative Lines (Mimic a Resume) */}
                        <div style={{ display: 'flex', gap: '20px', marginTop: '40px', opacity: 0.2 }}>
                            <div style={{ height: '4px', flex: 1, backgroundColor: 'white', borderRadius: '2px' }} />
                            <div style={{ height: '4px', width: '100px', backgroundColor: 'white', borderRadius: '2px' }} />
                            <div style={{ height: '4px', width: '200px', backgroundColor: 'white', borderRadius: '2px' }} />
                        </div>
                    </div>

                    {/* Gradient Accents */}
                    <div style={{ 
                        position: 'absolute', 
                        top: '-100px', 
                        right: '-100px', 
                        width: '400px', 
                        height: '400px', 
                        backgroundColor: 'rgba(37, 99, 235, 0.15)', 
                        filter: 'blur(80px)',
                        borderRadius: 'full',
                        zIndex: -1
                    }} />
                    <div style={{ 
                        position: 'absolute', 
                        bottom: '-100px', 
                        left: '-100px', 
                        width: '300px', 
                        height: '300px', 
                        backgroundColor: 'rgba(139, 92, 246, 0.1)', 
                        filter: 'blur(60px)',
                        borderRadius: 'full',
                        zIndex: -1
                    }} />
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        )
    } catch (e: any) {
        console.log(`${e.message}`)
        return new Response(`Failed to generate the image`, {
            status: 500,
        })
    }
}
