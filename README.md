REST service (JSON/HTTP) for storing information about these gateways and their associated devices.
REST service will be running at http://localhost:3000
Endpoints
    /gateways  --- For managing Gateways
    /devices   --- For managing Devices

## Instalation
Clone this repo https://github.com/dAgiaZ/gateways-api.git
    git clone https://github.com/dAgiaZ/gateways-api.git

Install dependencies
    npm install

Config MongoDB Databes connection
    Open /lib/config/database.ts 
      export const Database = {
        url: 'mongodb://127.0.0.1:27017/GatewaysDB',
        testUrl: 'mongodb://127.0.0.1:27017/GatewaysDBTest'
      }
    Edit url ans testUrl properties and save

Run in Development mode
    'npm run dev'

Run in Production mode (builds first)
    'npm run prod'

Run test
    npm run test


