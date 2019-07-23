import React from 'react';

interface CounterResetProps {
    onClose: () => void,
    updateTicket: () => void,
    show: Boolean
}

interface CounterResetState {
}

export class CounterReset extends React.Component<CounterResetProps, CounterResetState> {
    render() {
        // Render nothing if the "show" prop is false
        if (!this.props.show) {
            return null;
        }

        return (
            <div className="modal" id="modal">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Report an Incident</p>
                        <button className="delete" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="control has-icons-left has-icons-right">
                            <input id="tkt" className="input" type="ticket" placeholder="ServiceNow TKT"></input>
                            <span className="icon is-small is-left">
                                <i className="fas fa-ticket-alt"></i>
                            </span>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button id="save" className="button is-success" onClick={this.props.updateTicket}>Save</button>
                        <button className="button" onClick={this.props.onClose}>Cancel</button>
                    </footer>
                </div>
            </div>
        )
    }
}