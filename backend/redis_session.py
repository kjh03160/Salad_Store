from uuid import uuid4
import redis

class RedisSession():

    server_ip = '127.0.0.1' # Redis ip 
    port = 6379
    timeout = 3600

    def __init__(self):
        self.db =  redis.Redis(self.server_ip, self.port)

    # 신규 세션 요청 시 세션 값을 만들어서 리턴
    # session key를 쿠키에 저장
    def save_session(self, user_name):
        
        session_key = str(uuid4())
        # timeout만큼 시간이 지나면 삭제
        self.db.setex(session_key, self.timeout, user_name)

        # 영구적으로 저장
        # self.db.set(name=session_key, value=user_name)

        return session_key

    # 세션 있는지 확인 (인증 요청)
    # => 있으면(세션 유효) 유저 네임 얻을 수 있음
    # => 없으면 클라이언트 쿠키(request cookie) 삭제해줘야함
    def retrieve_session(self, session_key):

        result = self.db.get(name=session_key)

        return result


    # 세션 삭제 
    # 브라우저 종료, 로그아웃
    # 쿠키도 삭제
    # def delete_session(self, session_key):


