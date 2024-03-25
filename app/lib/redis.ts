import { Redis } from '@upstash/redis'

export const redis = new Redis({
    url: 'https://leading-goldfish-37818.upstash.io',
    token: process.env.REDIS_KEY!,
})
