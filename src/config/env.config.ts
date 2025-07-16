
export const EnvConfig = () =>({
    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 4100,
    defaultLimit: Number(process.env.DEFAULT_LIMIT) || 5,
    defaultOffset: Number(process.env.DEFAULT_OFFSET) || 4,
})