from aiogram import Bot, types
from aiohttp import web
from aiohttp.web_fileresponse import FileResponse
    
from aiogram.utils.web_app import safe_parse_webapp_init_data
from aiohttp.web_request import Request
from aiohttp.web_response import json_response
from app.database.bloodcentre import bloodcentre_orm_handlres

routes = web.RouteTableDef()

@routes.post("/check_data")
async def check_data_handler(request: Request):
    data = await request.json()
    return json_response({"ok": True, "data": data.dict()})

@routes.get("/cities")
async def get_cities(request: Request):
    data = await request.json()
    cities = await bloodcentre_orm_handlres.get_all_cities()
    cities_json = [city.to_dict() for city in cities]
    return {"data": cities_json}