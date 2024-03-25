# https://stackoverflow.com/a/65407083
def get_env_variable(name: str, default_value: bool | None = None) -> bool:
    import os
    
    true_ = ('true', '1', 't')  # Add more entries if you want, like: `y`, `yes`, `on`, ...
    false_ = ('false', '0', 'f')  # Add more entries if you want, like: `n`, `no`, `off`, ...
    value: str | None = os.getenv(name, None)
    if value is None:
        if default_value is None:
            raise ValueError(f'Variable `{name}` not set!')
        else:
            value = str(default_value)
    if value.lower() in true_ + false_:
        return value in true_
    return value

def load_env_config():
    '''Load environment variables from .env file'''
    from dotenv import load_dotenv
    load_dotenv()
    
    config_dict = {}
    config_dict["jellyfin_server_url"] = get_env_variable("JELLYFIN_SERVER_URL")
    config_dict["jellyfin_api_key"] = get_env_variable("JELLYFIN_API_KEY")
    
    return config_dict