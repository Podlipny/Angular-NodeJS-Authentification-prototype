## npm config

`"server": "set NODE_ENV=development&& nodemon server.js"`
Run only server part

`"install:prod": "npm install --only=production"`
Run for npm installation on production server

`"build-client:dev": "cd client && ng build --output-path ../public --watch"`         
Run for dev client build to server -- watch for quick rebuild

`"build-client": "cd client && ng build --output-path ../public -prod"`    
Run for client build to production server  

`"start:prod": "npm run build-client --output-path ../public -prod && node server.js"`    
Run for production

`"start": "concurrently \"npm run build-client:dev\" \"npm run server\""`
Use for development - client and server - with code watch