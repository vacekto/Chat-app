# !/bin/bash


if ! tmux has-session -t Chat-app 2>/dev/null
then
  tmux new-session -s Chat-app -n stdin -d
  tmux split-window -t Chat-app:stdin.0 -v
  tmux split-window -t Chat-app:stdin.1 -h
  tmux new-window -t Chat-app -n stdout
  tmux split-window -t Chat-app:stdout.0 -v
  tmux split-window -t Chat-app:stdout.1 -h
fi


if ! tmux ls | grep 'attached' | grep 'Chat-app' 1> /dev/null 2> /dev/null
then
  gnome-terminal -- bash -c 'tmux a -t Chat-app:stdout'
  
  tmux send-keys -t Chat-app:stdin.0 "docker exec -it chat_app /bin/sh" Enter
  tmux send-keys -t Chat-app:stdin.1 "docker exec -it chat_app_mongo /bin/sh" Enter
  tmux send-keys -t Chat-app:stdin.2 "docker exec -it chat_app_redis" Enter
  
  tmux send-keys -t Chat-app:stdout.0 "docker logs chat_app --follow" Enter
  tmux send-keys -t Chat-app:stdout.1 "docker logs chat_app_mongo --follow" Enter
  tmux send-keys -t Chat-app:stdout.2 "docker logs chat_app_redis --follow" Enter
else
  tmux respawn-window -t Chat-app:stdin.0 "docker exec -it chat_app /bin/sh" 2> /dev/null
  tmux respawn-window -t Chat-app:stdin.1 "docker exec -it chat_app_mongo /bin/sh" 2> /dev/null
  tmux respawn-window -t Chat-app:stdin.2 "docker exec -it chat_app_redis /bin/sh" 2> /dev/null

  tmux respawn-window -t Chat-app:stdout.0 "docker logs chat_app --follow" 2> /dev/null
  tmux respawn-window -t Chat-app:stdout.1 "docker logs chat_app_mongo --follow" 2> /dev/null
  tmux respawn-window -t Chat-app:stdout.2 "docker logs chat_app_redis --follow" 2> /dev/null
fi