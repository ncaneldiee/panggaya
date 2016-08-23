#!/bin/bash

cat << "EOF"
  _____
 |  __ \
 | |__) |_ _ _ __   __ _  __ _  __ _ _   _  __ _
 |  ___/ _` | '_ \ / _` |/ _` |/ _` | | | |/ _` |
 | |  | (_| | | | | (_| | (_| | (_| | |_| | (_| |
 |_|   \__,_|_| |_|\__, |\__, |\__,_|\__, |\__,_|
                    __/ | __/ |       __/ |
                   |___/ |___/       |___/
EOF

[ -d public ] || mkdir public

if [ ! -d app ]; then
    mkdir -p app/{coffee,fonts,images,pug,sass};
fi;

$SHELL
