build:
	docker build -t bot-beny .
run:
	docker run -d --name bot-beny bot-beny
stop:
	docker stop bot-beny
start:
	docker start bot-beny
rm:
	docker rm bot-beny
exec:
	docker exec -it bot-beny sh
show-txt:
	docker exec -it bot-beny sh -c 'cat logs.txt'
