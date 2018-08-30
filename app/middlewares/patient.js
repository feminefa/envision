import {PATIENT_STATES} from './../stores/patient';
import { NavigationActions } from 'react-navigation';


const navigateAfterFinish= (screen) => {
    const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: screen })
        ]
    });
   //this.props.navigation.dispatch(resetAction);
}


export const patientMiddleware = store => next => action => {
    switch (action.type) {
        case PATIENT_STATES.ADDED:
            // console.log('feminefa', "Middleware triggered:", action);
            //navigateAfterFinish('Dashboard');
            break;
    }

    next(action);
}
