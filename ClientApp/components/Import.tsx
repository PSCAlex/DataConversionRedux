import * as React from 'react';
import {ImportCard} from './import/ImportCard';
import {ImportProgress} from './import/ImportProgress';
import {ApplicationState} from '../store';
import * as ConversionState from '../store/ConversionStore';
import { connect } from 'react-redux';

type ConversionProps = ConversionState.ConversionState & typeof ConversionState.actionCreators;

class Import extends React.Component<ConversionProps, any> {

    componentWillMount(){
        //this.props.requestOrganisationNumbers();
    }

    public render() {
        return <div className="container">
            <h1>Import</h1>
            <br/>
            <div className="row">
                <ImportProgress />
            </div>
            <div className="row">
                <div className="col-md-10 col-md-offset-1">
                    <ImportCard />
                </div>
            </div>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.input, 
    ConversionState.actionCreators
)(Import); 