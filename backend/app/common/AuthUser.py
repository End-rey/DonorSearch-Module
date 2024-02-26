class AuthUser(object):
    def __init__(self):
        self.users = {}
    
    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(AuthUser, cls).__new__(cls)
        return cls.instance