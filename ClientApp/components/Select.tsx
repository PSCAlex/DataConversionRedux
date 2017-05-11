import * as React from 'react';
import {ApplicationState} from '../store';
import * as ConversionState from '../store/ConversionStore';
import { connect } from 'react-redux';
import SelectBox from 'react-select';

type ConversionProps = ConversionState.ConversionState & typeof ConversionState.actionCreators;

class Select extends React.Component<ConversionProps, any> {
    constructor(props, context){
        super(props, context);

        this.onOrganisationNumberChange = this.onOrganisationNumberChange.bind(this);
        this.onOrganisationPayrollNumberChange = this.onOrganisationPayrollNumberChange.bind(this);
        this.onClickStart = this.onClickStart.bind(this);
    }

    componentWillMount(){
        this.props.requestOrganisationNumbers();
    }

    onOrganisationNumberChange(val){
        if(val){
            this.props.setOrganisationNumber(val.value);
        }else{
            this.props.setOrganisationNumber(null);
        }
    }

    onOrganisationPayrollNumberChange(val){
        if(val){
            this.props.setOrganisationPayrollNumber(val.value);
        }else{
            this.props.setOrganisationPayrollNumber(null);
        }
    }

    onClickStart(event){
        event.preventDefault();
        //alert(`OrganisationNumber: ${this.props.organisationNumber}, PayrollNumber: ${this.props.organisationPayrollNumber}`);
        this.props.requestFiles();
    }

    public render() {
        return (<div className="container">
            <h1>Select Organisation and Payroll to Convert</h1>
            <br/>
            <form>
                <div className="form-group">
                    <label className="control-label" htmlFor="organisationNumber">Organisation number</label>
                    <SelectBox 
                        name="organisationNumber" 
                        value={this.props.organisationNumber} 
                        options={this.props.organisationNumbers} 
                        onChange={this.onOrganisationNumberChange} />
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="payrollNumber">Payroll number</label>
                    <SelectBox 
                        name="payrollNumber" 
                        value={this.props.organisationPayrollNumber} 
                        disabled={this.props.organisationPayrollNumbers.length <= 0}
                        options={this.props.organisationPayrollNumbers} 
                        onChange={this.onOrganisationPayrollNumberChange} />
                </div>

                <div className="formGroup">
                    <input className="btn btn-success"type="submit" value="Start" onClick={this.onClickStart}/>
                </div>
            </form>
        </div>);
    }
}

export default connect(
    (state: ApplicationState) => state.input, 
    ConversionState.actionCreators
)(Select); 