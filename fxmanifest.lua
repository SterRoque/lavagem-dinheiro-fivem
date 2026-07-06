fx_version 'cerulean'
game 'gta5'

lua54 'yes'

author 'Ster'
description ''
version '1.0.0'

ui_page 'web/dist/index.html'

files {
    'web/dist/index.html',
    'web/dist/assets/*',
}

client_scripts {
    'client/client.lua'
}

server_scripts {
    'server/server.lua'
}
