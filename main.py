from jellyfin_apiclient_python import JellyfinClient
from utils import load_env_config

client = JellyfinClient()

env_config = load_env_config()
jellyfin_server_url = env_config["jellyfin_server_url"]
jellyfin_api_key = env_config["jellyfin_api_key"]

app_name = 'jellyfin-playlist-builder'
app_version = '0.0.1'

client.config.app(app_name, app_version, 'machine_name', 'unique_id')
client.config.data["auth.ssl"] = True

client.config.data["app.name"] = app_name
client.config.data["app.version"] = app_version
client.authenticate({"Servers": [{"AccessToken": jellyfin_api_key, "address": jellyfin_server_url}]}, discover=False)