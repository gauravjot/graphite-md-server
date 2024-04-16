sudo kill $(sudo lsof -i :3000 | grep \"node\" |  awk '{print $2}')
