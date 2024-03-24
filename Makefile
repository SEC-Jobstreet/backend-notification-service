run: 
	npm start
	
# Shouldn't run. big image size ~ 1GB
dev:
	npm run dev
	
build:
	docker-compose -f docker-compose.prod.yml build

run_image:
	docker run -p 4001:4001 --name backend-jobstreet-usermanagement-service-prod backend-jobstreet-usermanagement-service-prod

start:
	docker start backend-jobstreet-usermanagement-service-prod

.PHONY: run dev dev build run_image start