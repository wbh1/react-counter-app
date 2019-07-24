import React from 'react';
import { CounterReset } from './CounterReset';

interface DaysSinceIncProps {
}

interface DaysSinceIncState {
    modalOpen: Boolean,
    ticket: String,
    days: Number
}

export class DaysSinceInc extends React.Component<DaysSinceIncProps, DaysSinceIncState> {

    constructor(props: any) {
        super(props);

        this.state = {
            modalOpen: false,
            ticket: "",
            days: 0
        }

        this.getTicket();
        // this.openModal = this.openModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.setTicket = this.setTicket.bind(this);
    }

    toggleModal() {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    // openModal() {
    //     this.setState({
    //         modalOpen: true
    //     });
    // }

    getTicket() {
        fetch('http://localhost:8080/api/ticket')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    ticket: responseJson.ticket,
                    days: responseJson.days_since
                })
            })
            .catch((error) => {
                console.error(error);
            });

    }

    setTicket() {
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
            this.setState({
                ticket: responseJson.ticket,
                days: responseJson.days_since
            })
        })
        .catch((error) => {
            console.error(error);
        });

        // Update state
        this.setState({
            modalOpen: false
        });
        
    }

    componentDidMount() {
        this.getTicket();
    }

    render() {
        let SNlink = ("https://liberty.service-now.com/incident.do?sysparm_query=number%3D" + this.state.ticket)

        return (
            <section className="section">

                <div className="container has-text-centered">
                    <p className="is-size-3">It has been</p>
                    <p className="is-size-5"><span className="has-text-weight-bold has-text-danger is-size-1 title">
                        {this.state.days > 0 &&
                            this.state.days}</span> days</p>
                    <p className="is-size-3">since the last Nagios Incident:
                    <a href={SNlink}> {this.state.ticket}</a></p>
                    <br />

                    <button onClick={this.toggleModal} className="button is-rounded is-danger modal-button" data-target="modal" id="counter-reset">
                        Reset Counter
                </button>

                </div>
                <CounterReset show={this.state.modalOpen}
                    onClose={this.toggleModal}
                    updateTicket={this.setTicket} />
            </section>
        )
    }
}