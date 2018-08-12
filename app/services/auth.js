import {AsyncStorage} from "react-native";
const config = require('../configs/app')
import {  navigate } from 'react-navigation';
// import store from '../stores/store'

export const isAuthenticated =   async (navigate: navigate, cb, redirect = null) => {

        const token = await AsyncStorage.getItem("token");
        if (token) {
           try{
               user = JSON.parse(token);
               // console.log('feminefa', 'is authenticated', user);
                //cb(user)
               cb? cb(user):'';
               return user;
           } catch (e) {
               // console.log('feminefa', 'is authenticated', e.message);
               AsyncStorage.removeItem('token', (err) => {
                   navigate('Login', { error: e.message })
               })
               cb? cb(null, e): '';


           }


        } else {
            navigate('Login', {  })
        }
    return null;
        // Continue here...
       //  alert(global.gValue);

}
export const isGuest =  async (navigate: navigate, redirect = null) => {

    const token = await AsyncStorage.getItem("token");
   //  console.log('feminefa', 'logged in token', token);
    try{
        const user = JSON.parse(token);

         if (user != null) {
             navigate('Dashboard', {user: user }  )
         }
    } catch (e) {
       // console.error(e);
        // navigate('Dashboard' )
        // return;
    }


 return null;
    // Continue here...
    //  alert(global.gValue);

}