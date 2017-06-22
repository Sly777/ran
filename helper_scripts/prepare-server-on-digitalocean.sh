#!/usr/bin/env node

cd ~
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install build-essential

sudo npm install -g pm2

# pm2 start npm -- start
