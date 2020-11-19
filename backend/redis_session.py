from uuid import uuid4
import redis

class RedisSession():
    prefix = 'was:session_key:' # Redis key 앞에 넣을 값
    server_ip = 'localhost' # Redis ip 
    port = 6379
    timeout = 3600

    def __init__(self):
        self.db =  redis.Redis(self.server_ip, self.port)

    # 세션이 있으면 타임아웃 만큼 다시 연장해주고 없으면 False 있으면 사용자id 리턴
    # def open_session(self, session_key):
    #     user_name = self.db.get(self.prefix+session_key)

    #     if user_name is not None:
    #         self.db.expire(self.prefix+session_key, self.timeout)

    #     return user_name

    # 신규 세션 요청 시 세션 값을 만들어서 리턴
    def save_session(self, user_name):
        session_key = str(uuid4())
        self.db.setex(self.prefix+session_key, self.timeout, user_name)

        return session_key

