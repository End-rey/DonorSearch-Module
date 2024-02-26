from environs import Env
from dataclasses import dataclass
from typing import List


@dataclass
class TgBot:
    token: str
    admin_id: List[int]
    back_host: str


@dataclass
class DbConfig:
    url: str
    password: str
    user: str
    database: str
    insert_data: bool = False
    
@dataclass
class RedisConfig:
    url: str


@dataclass
class Miscellaneous:
    other_params: str = None

@dataclass
class Config:
    tg_bot: TgBot
    db: DbConfig
    redis: RedisConfig
    misc: Miscellaneous

def load_config(path: str = None):
    env = Env()
    env.read_env(path)

    return Config(
        tg_bot = TgBot(
            token=env.str("BOT_TOKEN"),
            admin_id=list(map(int, env.list("ADMINS"))),
            back_host=env.str("BACK_URL")
        ),
        db=DbConfig(
            url=env.str("DB_URL"),
            password=env.str("DB_PASS"),
            user=env.str("DB_USER"),
            database=env.str("DB_NAME"),
            insert_data=env.bool("INSERT_DATA"),
        ),
        redis=RedisConfig(url=env.str("REDIS_URL")),
        misc=Miscellaneous()
    )