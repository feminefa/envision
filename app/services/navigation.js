import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params = {}, reset = false, index = 0) {
   if (reset) {
       _navigator.dispatch(NavigationActions.reset({
           index: 0,
           actions: [
               NavigationActions.navigate({routeName, params})
           ]
       }));
   } else {
       _navigator.dispatch(
           NavigationActions.navigate({
               routeName,
               params,
           })
       );
   }
}
function dispatch(obj) {
   return _navigator.dispatch(obj);
}
// add other navigation functions that you need and export them
function closeScreen(screen, params, index = 0) {
    const resetAction = NavigationActions.reset({
        index: index,
        actions: [
            NavigationActions.navigate({routeName: screen, params})
        ]
    });
    return this.dispatch(resetAction);
}


export default {
    navigate,
    setTopLevelNavigator,
    dispatch,
    closeScreen
};