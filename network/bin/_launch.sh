#PEER_MODE=dev
#Command=dev-init.sh -d 
#Generated: Sat 28 Sep 20:08:29 IST 2019 
docker-compose  -f ./compose/docker-compose.base.yaml    -f ./compose/docker-compose.dev.yaml      up -d --remove-orphans
