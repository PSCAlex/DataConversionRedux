import * as React from 'react';
import ImportCard from './import/ImportCard';
import ImportProgress from './import/ImportProgress';
import {ApplicationState} from '../store';
import * as ConversionState from '../store/ConversionStore';
import { connect } from 'react-redux';

type ConversionProps = ConversionState.ConversionState & typeof ConversionState.actionCreators;

class Import extends React.Component<ConversionProps, any> {

    constructor(props, context){
        super(props, context);
        this.onClickStart = this.onClickStart.bind(this);
    }

    onClickStart(){
        this.props.runFiles();
    }

    public render() {
        return <div className="container">
            <div className="row">
                <h3>Progress...</h3>
                {/*<button className="btn btn success" onClick={this.onClickStart}>Start</button>*/}
                <ImportProgress totalFiles={this.props.numberOfFiles} completedFiles={this.props.filesCompleted}/>
            </div>
            <div className="row">
                <div className="col-md-10 col-md-offset-1">
                    {this.props.files.map((f,i) => (
                        <ImportCard 
                            key={i} 
                            file={f}/>
                    ))}
                </div>
            </div>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.input, 
    ConversionState.actionCreators
)(Import); 