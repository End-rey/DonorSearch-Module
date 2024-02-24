from aiogram.filters import Filter

class AdminFilter(Filter):
    def __init__(self, admins: list[int]):
        self.admins = admins

    async def __call__(self, message):
        return message.from_user.id in self.admins