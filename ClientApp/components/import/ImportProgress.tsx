import * as React from 'react';

export class ImportProgress extends React.Component<any, void> {
    public render() {
        return <div>
            <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width: '60%'}}>
                </div>
            </div>
        </div>
    }
}