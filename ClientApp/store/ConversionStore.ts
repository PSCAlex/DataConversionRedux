import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

export interface ConversionState {
    organisationPayrollNumbers: number[];
    organisationNumbers: number[];
    organisationNumber: number;
    organisationPayrollNumber: number;
    isLoading: boolean;
    files: File[];
}

export interface File {
    name: string;
    url: string;
    success: boolean;
    successInfo: string;
    error: boolean;
    errorInfo: string;
    isComplete: boolean;
}

interface RequestOrganisationNumbersAction {
    type: 'REQUEST_ORGANISATION_NUMBERS';
}

interface RecieveOrganisationNumbersAction {
    type: 'RECIEVE_ORGANISATION_NUMBERS',
    organisationNumbers: any[];
}

interface SetOrganisationNumber {
    type: 'SET_ORGANISATION_NUMBER',
    organisationNumber: number;
}

interface RequestOrganisationPayrollNumbers{
    type: 'REQUEST_ORGANISATION_PAYROLL_NUMBERS',
}

interface RecieveOrganisationPayrollNumbers{
    type: 'RECEIVE_ORGANISATION_PAYROLL_NUMBERS',
    organisationPayrollNumbers: any[]
}

interface SetOrganisationPayrollNumber {
    type: 'SET_ORGANISATION_PAYROLL_NUMBER',
    organisationPayrollNumber: number;
}

type KnownAction = RequestOrganisationNumbersAction | RecieveOrganisationNumbersAction | SetOrganisationNumber | RequestOrganisationPayrollNumbers | RecieveOrganisationPayrollNumbers | SetOrganisationPayrollNumber;

export const actionCreators = {
    requestOrganisationNumbers: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch('/api/payrollData/getOrganisationNumbers')
            .then(response => response.json() as Promise<number[]>)
            .then(data => {
                const selectVal = data.map(d => ({value:d , label: d.toString()}))
                dispatch({type: 'RECIEVE_ORGANISATION_NUMBERS', organisationNumbers: selectVal});
            });

            addTask(fetchTask);
            dispatch({type: 'REQUEST_ORGANISATION_NUMBERS'});
    },

    setOrganisationNumber: (organisationNumber): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({type: 'SET_ORGANISATION_NUMBER', organisationNumber: organisationNumber});
        let fetchTask = fetch(`/api/payrollData/getPayrollNumbers?organisationNumber=${ organisationNumber }`)
            .then(response => response.json() as Promise<number[]>)
            .then(data => {
                const selectVal = data.map(d => ({value:d , label: d.toString()}));
                dispatch({type: 'RECEIVE_ORGANISATION_PAYROLL_NUMBERS', organisationPayrollNumbers: selectVal});
            });

            addTask(fetchTask);
            dispatch({type:'REQUEST_ORGANISATION_PAYROLL_NUMBERS'});
    },

    setOrganisationPayrollNumber: (organisationPayrollNumber) => <SetOrganisationPayrollNumber>{type: 'SET_ORGANISATION_PAYROLL_NUMBER', organisationPayrollNumber}
}

const unloadedState: ConversionState = {organisationPayrollNumbers: [], organisationNumbers: null, organisationNumber: null, organisationPayrollNumber: null, isLoading: false, files: []};

export const reducer: Reducer<ConversionState> = (state:ConversionState, action: KnownAction) => {
    switch(action.type){
        case 'REQUEST_ORGANISATION_NUMBERS':
            return {
                organisationPayrollNumbers: state.organisationPayrollNumbers, 
                organisationNumbers: state.organisationNumbers,
                organisationNumber: state.organisationNumber, 
                organisationPayrollNumber: state.organisationPayrollNumber, 
                isLoading: true, 
                files: state.files
            };
        case 'RECIEVE_ORGANISATION_NUMBERS':
            return {
                organisationPayrollNumbers: state.organisationPayrollNumbers, 
                organisationNumbers: action.organisationNumbers, 
                organisationNumber: state.organisationNumber,
                organisationPayrollNumber: state.organisationPayrollNumber, 
                isLoading: false, 
                files: state.files
            };
        case 'SET_ORGANISATION_NUMBER':
            return {
                organisationPayrollNumbers: state.organisationPayrollNumbers, 
                organisationNumbers: state.organisationNumbers, 
                organisationNumber: action.organisationNumber,
                organisationPayrollNumber: state.organisationPayrollNumber, 
                isLoading: false, 
                files: state.files
            }
        case 'REQUEST_ORGANISATION_PAYROLL_NUMBERS':
            return {
                organisationPayrollNumbers: state.organisationPayrollNumbers, 
                organisationNumbers: state.organisationNumbers, 
                organisationNumber: state.organisationNumber,
                organisationPayrollNumber: state.organisationPayrollNumber, 
                isLoading: true, 
                files: state.files
            }
        case 'RECEIVE_ORGANISATION_PAYROLL_NUMBERS':
            return{
                organisationPayrollNumbers: action.organisationPayrollNumbers, 
                organisationNumbers: state.organisationNumbers, 
                organisationNumber: state.organisationNumber,
                organisationPayrollNumber: state.organisationPayrollNumber, 
                isLoading: false, 
                files: state.files
            }
        case 'SET_ORGANISATION_PAYROLL_NUMBER':
            return{
                organisationPayrollNumbers: state.organisationPayrollNumbers, 
                organisationNumbers: state.organisationNumbers, 
                organisationNumber: state.organisationNumber,
                organisationPayrollNumber: action.organisationPayrollNumber, 
                isLoading: false, 
                files: state.files
            }
        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};