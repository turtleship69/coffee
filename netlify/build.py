import os

hanko_url = os.environ.get('HANKO_URL', 'https://e3c4803f-48cc-4b62-9ac5-2aa02444ba51.hanko.io')
with open('login/hanko.js', 'w') as f:
    f.write(f'var HANKO_URL = "{hanko_url}";\n')


live_url = os.environ.get('SOCKET_URL', 'window.location.host')
with open('app/live_server_url.js', 'w') as f:
    f.write(f'let live_server_url = {live_url};')


#define url rewrite rules
redirects = ["auth", "connect", "update_profile", "chatlist.json", "chats", "new_chat"]
netlify = ""

for redirect in redirects:
    netlify += f"""
[[redirects]]
from = "/{redirect}/*"
to = "{os.environ.get("BACKEND_URL")}/{redirect}/:splat"
status = 200
force = true
"""

with open("netlify.toml", 'w') as f:
    f.write(netlify)