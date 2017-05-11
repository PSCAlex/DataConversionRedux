import * as React from 'react';

export class ImportCard extends React.Component<any, void> {
    public render() {
        return <div>
            <div className="well well-sm">
                <div className="row">
                    <div className="col-md-8">
                        <span>Picklists</span>
                    </div>
                    <div className="col-md-2">
                        <span>...</span>
                    </div>
                    <div className="col-md-2">
                        <span className='glyphicon glyphicon-chevron-down'></span>
                    </div>
                </div>
            </div>
        </div>;
    }
}