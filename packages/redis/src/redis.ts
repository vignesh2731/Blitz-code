import {createClient,RedisClientType} from 'redis'

class RedisSingleton{
    private static instance: RedisClientType | null=null;
    private client:RedisClientType | null = null;
    
    private constructor()
    {
        this.client=createClient();
        this.client.connect();
        RedisSingleton.instance=this.client;
    }
    static getInstance(){
        if(!RedisSingleton.instance)new RedisSingleton();
        return RedisSingleton.instance;
    }
}

export default RedisSingleton;