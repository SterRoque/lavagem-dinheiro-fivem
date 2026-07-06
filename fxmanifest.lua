fx_version 'cerulean'
game 'gta5'

lua54 'yes'

author 'Ster'
description ''
version '1.0.0'

ui_page 'ui/build/index.html'

files {
    'ui/build/index.html',
    'ui/build/assets/*',
}

client_scripts {
    'client/main.lua'
}

server_scripts {
    'server/main.lua'
}

shared_scripts {
    'shared/config.lua',
    '@qb-core/shared/locale.lua'
}
