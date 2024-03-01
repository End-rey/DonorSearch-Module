from environs import Env
from dataclasses import dataclass
from typing import List
from os import environ

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
    url: str = None


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
    
    
    redis_url=None
    if "REDIS_URL" in environ:
        redis_url = env.str("REDIS_URL")

    return Config(
        tg_bot=TgBot(
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
        redis=RedisConfig(url=redis_url),
        misc=Miscellaneous()
    )
    
def load_config_with_os():
    return Config(
        tg_bot=TgBot(
            token=environ.get("BOT_TOKEN"),
            admin_id=list(map(int, environ.get("ADMINS"))),
            back_host=environ.get("BACK_URL")
        ),
        db=DbConfig(
            url=environ.get("DB_URL"),
            password=environ.get("DB_PASS"),
            user=environ.get("DB_USER"),
            database=environ.get("DB_NAME"),
            insert_data="true" == environ.get("INSERT_DATA"),
        ),
        redis=RedisConfig(url=environ.get("REDIS_URL") if "REDIS_URL" in environ else None),
        misc=Miscellaneous()
    )