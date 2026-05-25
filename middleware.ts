import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    // Forward pathname so the root layout can detect immersive routes
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-next-url', request.nextUrl.pathname)

    let response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    // Skip auth entirely for public immersive viewer routes
    if (request.nextUrl.pathname.startsWith('/view/')) {
        return response
    }

    // Referral detection
    const referralCode = request.nextUrl.searchParams.get('ref')
    if (referralCode) {
        response.cookies.set('referral_code', referralCode, {
            maxAge: 30 * 24 * 60 * 60, // 30 days
            httpOnly: true,
            path: '/',
        })
    }

    let user = null
    try {
        console.log('Middleware: Fetching user...')
        const { data: { user: supabaseUser }, error } = await supabase.auth.getUser()
        if (error) {
            console.error('Middleware: Supabase auth error:', error.message)
        }
        user = supabaseUser
        console.log('Middleware: User fetched successfully:', user?.email || 'Guest')
    } catch (e) {
        console.error('Middleware: Critical error in getUser():', e)
    }

    // Protected routes logic
    const isProtectedRoute = 
        request.nextUrl.pathname.startsWith('/dashboard') || 
        (request.nextUrl.pathname.startsWith('/editor') && !request.nextUrl.pathname.startsWith('/editor/setup') && !request.nextUrl.pathname.startsWith('/editor/new')) ||
        request.nextUrl.pathname.startsWith('/account')

    const isAuthRoute = request.nextUrl.pathname.startsWith('/auth')

    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')

    if (!user && (isProtectedRoute || isAdminRoute)) {
        console.log('Middleware: Redirecting to login (unauthorized)')
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    if (user && isAdminRoute) {
        // Fetch profile to check admin status
        const { data: profile } = await supabase
            .from('profiles')
            .select('is_admin')
            .eq('id', user.id)
            .single()
        
        if (!profile?.is_admin) {
            console.log('Middleware: User is not an admin, redirecting to dashboard')
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    if (user && isAuthRoute && !request.nextUrl.pathname.startsWith('/auth/callback')) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
