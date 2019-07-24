import React from 'react';
import { NagiosHeader } from './components/NagiosHeader'
import { DaysSinceInc } from './components/DaysSinceInc'

export class NagiosCounterApp extends React.Component<any, any> {    

    render() {
        return (
            <div>
                <NagiosHeader />
                <DaysSinceInc  />
            </div>
        )
    }
}