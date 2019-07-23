import React from 'react';

interface DaysSinceIncProps {
    ticket: String,
    days: Number,
    openModal: () => void;
}

interface DaysSinceIncState {
}

export class DaysSinceInc extends React.Component<DaysSinceIncProps, DaysSinceIncState> {

    render() {
        let SNlink = ("https://liberty.service-now.com/incident.do?sysparm_query=number%3D" + this.props.ticket)
        return (
            <section className="section">

                <div className="container has-text-centered">
                    <p className="is-size-3">It has been</p>
                    <p className="is-size-5"><span className="has-text-weight-bold has-text-danger is-size-1 title">{this.props.days}</span> days</p>
                    <p className="is-size-3">since the last Nagios Incident:
                    <a href={SNlink}> {this.props.ticket}</a></p>
                <br />

                <button onClick={this.props.openModal} className="button is-rounded is-danger modal-button" data-target="modal" id="counter-reset">
                    Reset Counter
                </button>

                </div>
            </section>
        )
    }
}