import pino from 'pino';

const logger =pino({
    enabled: process.env.LOG_ENABLE !== 'false',
    level: process.env.LOG_LEVEL || 'info',
    redact: {
    paths: ['cpf', 'password', 'passwordHash', 'phoneNumber', 'email', 'data.email', 'corporateEmail', 'data.cpf', 'user.cpf'],
    censor: '***.***.***-**', 
    },    
    transport: process.env.NODE_ENV !== 'production' ? {
        target: 'pino-pretty',
        options: {
            colorized: true,
            translateTime: 'HH:MM:ss Z',
        },
    } : undefined,
});

export { logger };