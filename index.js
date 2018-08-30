import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from "./app.json";
import { Client, Configuration } from 'rollbar-react-native'
const config = new Configuration('2ed4bba32cc34b15944f66ddd928556d', {
    endpoint: 'https://api.rollbar.com/api/1/item/',
    logLevel: 'info',
    payload: {
        client: {
            javascript: {
                source_map_enabled: true,
                code_version: 'ios_v1',
            }
        }
    }
});

const rollbar = new Client(config);
// console.log('feminefa', adadsd)
//rollbar.info('error', 'this is an error', (error) => console.log('feminefa', error))
AppRegistry.registerComponent(appName, () => App);
// curl https://api.rollbar.com/api/1/sourcemap  -F access_token=4e100581019c4b90aa4a088c470ae6de  -F  version=ios_v1  -F  minified_url=http://reactnativehost/main.jsbundle  -F  source_map=@release/sourcemap.js  -F  --sourcemap-sources-root ./