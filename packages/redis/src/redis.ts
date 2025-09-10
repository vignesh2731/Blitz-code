import {createClient,RedisClientType} from 'redis'

class RedisSingleton{
    private static instance: RedisClientType | null=null;
    private client:RedisClientType | null = null;
    
    private constructor(){}
    static async getInstance():Promise<RedisClientType>{
        if(!RedisSingleton.instance)
        {
            const client: RedisClientType = createClient({
                url: 'redis://localhost:6379'
            })
            await client.connect();
            RedisSingleton.instance=client;
        }
        return RedisSingleton.instance;
    }
}

export default RedisSingleton;