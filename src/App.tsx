import React from 'react';
import { NagiosHeader } from './components/NagiosHeader'
import { DaysSinceInc } from './components/DaysSinceInc'
import { CounterReset } from './components/CounterReset';

export class NagiosCounterApp extends React.Component<any, any> {    
    constructor(props: any) {
        super(props);

        this.state = { 
            isOpen: false,
            ticket: "<undefined>",
            days: 0
        };

        this.openModal = this.openModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.setTicket = this.setTicket.bind(this);
    }

    toggleModal() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    openModal() {
        this.setState({
            isOpen: true
        });
    }

    setTicket() {
        let ticketNumber = (document.getElementById("tkt") as HTMLInputElement).value;
        console.log(ticketNumber);
        this.setState({
            ticket: ticketNumber,
            isOpen: false
        });
    }

    render() {
        return (
            <div>
                <NagiosHeader />
                <DaysSinceInc ticket={this.state.ticket}
                              days={this.state.days}
                              openModal={this.openModal} />
                <CounterReset show={this.state.isOpen}
                              onClose={this.toggleModal}
                              updateTicket={this.setTicket}/>
            </div>
        )
    }
}