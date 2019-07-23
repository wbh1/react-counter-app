import React from 'react';

export class NagiosHeader extends React.Component<any, any> {
    render() {
        return (
            <section className="hero is-danger">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">
                            Days Since Nagios Incident
                        </h1>
                    </div>
                </div>
            </section>
        )
    }
}