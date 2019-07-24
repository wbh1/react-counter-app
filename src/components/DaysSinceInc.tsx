import React from 'react';
import { CounterResetModal } from './CounterResetModal';

interface DaysSinceIncProps {
}

interface DaysSinceIncState {
    modalOpen: boolean,
    ticket: string,
    days: number
}

interface TicketJSON {
    ticket: string;
    days_since: number;
}

export class DaysSinceInc extends React.Component<DaysSinceIncProps, DaysSinceIncState> {

    constructor(props: any) {
        super(props);

        let tkt = sessionStorage.getItem('ticket') || "";
        let days_since = Number(sessionStorage.getItem('days')) || 0;

        this.state = {
            modalOpen: false,
            ticket: tkt,
            days: days_since
        }

        this.updateTicket = this.updateTicket.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.setTicket = this.setTicket.bind(this);
    }

    toggleModal() {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    getTicket() {
        fetch('http://localhost:8080/api/ticket')
            .then((response) => response.json())
            .then((responseJson) => {
                // set the ticket in the component's state
                this.setTicket(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    //
    setTicket(responseJson: TicketJSON) {
        let ticket = responseJson.ticket;
        let days = responseJson.days_since;

        this.setState({
            ticket: ticket,
            days: days
        });

        sessionStorage.setItem("ticket", ticket);
        sessionStorage.setItem("days", days.toString());
    }

    updateTicket() {
        let ticketNumber = (document.getElementById("tkt") as HTMLInputElement).value;
        // POST new ticket
        fetch('http://localhost:8080/api/new-ticket', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "ticket": ticketNumber,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.getTicket();
            })
            .catch((error) => {
                console.error(error);
            });

        // Update state
        this.setState({
            modalOpen: false
        });

    }

    // Once the component mounts, get the latest ticket
    componentDidMount() {
        this.getTicket();
    }

    render() {
        let SNlink = ("https://liberty.service-now.com/incident.do?sysparm_query=number%3D" + this.state.ticket)

        return (
            <section className="section">

                <div className="container has-text-centered">
                    <p className="is-size-3">It has been</p>
                    <p className="is-size-5">
                        <span className="has-text-weight-bold has-text-danger is-size-1 title">
                            {this.state.days}</span> days
                    </p>
                    <p className="is-size-3">since the last Nagios Incident:
                    <a href={SNlink}> {this.state.ticket}</a></p>
                    <br />

                    <button onClick={this.toggleModal} className="button is-rounded is-danger modal-button"
                            data-target="modal" id="counter-reset">
                        Reset Counter
                    </button>

                </div>
                <CounterResetModal show={this.state.modalOpen}
                    onClose={this.toggleModal}
                    updateTicket={this.updateTicket} />
            </section>
        )
    }
}