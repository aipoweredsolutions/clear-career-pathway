type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogPayload {
    timestamp: string;
    level: LogLevel;
    message: string;
    context?: Record<string, any>;
}

const IS_DEV = process.env.NODE_ENV === 'development';

function formatLog(level: LogLevel, message: string, context?: Record<string, any>): string | LogPayload {
    const timestamp = new Date().toISOString();
    
    if (IS_DEV) {
        // Human-readable formatting for development
        const contextStr = context && Object.keys(context).length > 0 
            ? `\nContext: ${JSON.stringify(context, null, 2)}` 
            : '';
        const levelColors: Record<LogLevel, string> = {
            debug: '\x1b[36mDEBUG\x1b[0m', // Cyan
            info: '\x1b[32mINFO\x1b[0m',   // Green
            warn: '\x1b[33mWARN\x1b[0m',   // Yellow
            error: '\x1b[31mERROR\x1b[0m'   // Red
        };
        const colorLevel = typeof window === 'undefined' ? levelColors[level] : level.toUpperCase();
        return `[${timestamp}] [${colorLevel}]: ${message}${contextStr}`;
    } else {
        // Structured JSON for production log aggregators
        return {
            timestamp,
            level,
            message,
            context
        };
    }
}

export const logger = {
    debug(message: string, context?: Record<string, any>) {
        const formatted = formatLog('debug', message, context);
        if (typeof formatted === 'string') {
            console.debug(formatted);
        } else {
            console.debug(JSON.stringify(formatted));
        }
    },
    info(message: string, context?: Record<string, any>) {
        const formatted = formatLog('info', message, context);
        if (typeof formatted === 'string') {
            console.log(formatted);
        } else {
            console.log(JSON.stringify(formatted));
        }
    },
    warn(message: string, context?: Record<string, any>) {
        const formatted = formatLog('warn', message, context);
        if (typeof formatted === 'string') {
            console.warn(formatted);
        } else {
            console.warn(JSON.stringify(formatted));
        }
    },
    error(message: string, context?: Record<string, any>) {
        const formatted = formatLog('error', message, context);
        if (typeof formatted === 'string') {
            console.error(formatted);
        } else {
            console.error(JSON.stringify(formatted));
        }
    }
};
export default logger;
