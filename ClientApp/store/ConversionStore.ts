import * as $ from 'jquery';
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
    numberOfFiles: number;
    filesCompleted: number;
}

export interface File {
    name: string;
    url: string;
    success: boolean;
    successInfo: string;
    error: boolean;
    errorInfo: string;
    isComplete: boolean;
    isStarted: boolean;
}

interface RequestOrganisationNumbersAction {
    type: 'REQUEST_ORGANISATION_NUMBERS';
}

interface ReceiveOrganisationNumbersAction {
    type: 'RECEIVE_ORGANISATION_NUMBERS',
    organisationNumbers: any[];
}

interface SetOrganisationNumber {
    type: 'SET_ORGANISATION_NUMBER',
    organisationNumber: number;
}

interface RequestOrganisationPayrollNumbers{
    type: 'REQUEST_ORGANISATION_PAYROLL_NUMBERS',
}

interface ReceiveOrganisationPayrollNumbers{
    type: 'RECEIVE_ORGANISATION_PAYROLL_NUMBERS',
    organisationPayrollNumbers: any[]
}

interface SetOrganisationPayrollNumber {
    type: 'SET_ORGANISATION_PAYROLL_NUMBER',
    organisationPayrollNumber: number;
}

interface RequestFiles {
    type: 'REQUEST_FILES'
}

interface ReceiveFiles {
    type: 'RECEIVE_FILES',
    files: any[]
}

interface UpdateFileStatus {
    type: 'UPDATE_FILE_STATUS',
    file: File,
    index: number
}

type KnownAction = RequestOrganisationNumbersAction | ReceiveOrganisationNumbersAction | SetOrganisationNumber 
    | RequestOrganisationPayrollNumbers | ReceiveOrganisationPayrollNumbers | SetOrganisationPayrollNumber | RequestFiles | ReceiveFiles
    | UpdateFileStatus;

const processFile = (files: File[], i, dispatch) => {
    let file = files[i];
    file.isStarted = true;
    dispatch({type: 'UPDATE_FILE_STATUS', file, index: i});

    let nextI = i + 1;
    $.post(files[i].url).then(function(data){
        console.log(data);

        file.isComplete = true;
        file.success = true;
        file.successInfo = data.successInfo;

        dispatch({type: 'UPDATE_FILE_STATUS', file, index: i});

        if(nextI < files.length){
            processFile(files, nextI, dispatch);
        }
    }, function(data){
        console.log(data);

        let file = files[i];

        file.isComplete = true;
        file.error = true;
        file.errorInfo = data.responseJSON.errorInfo;

        dispatch({type: 'UPDATE_FILE_STATUS', file, index: i});

        if(nextI < files.length){
            processFile(files, nextI, dispatch);
        }
    });
}

export const actionCreators = {
    requestOrganisationNumbers: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch('/api/payrollData/getOrganisationNumbers')
            .then(response => response.json() as Promise<number[]>)
            .then(data => {
                const selectVal = data.map(d => ({value:d , label: d.toString()}))
                dispatch({type: 'RECEIVE_ORGANISATION_NUMBERS', organisationNumbers: selectVal});
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

    setOrganisationPayrollNumber: (organisationPayrollNumber) => <SetOrganisationPayrollNumber>{type: 'SET_ORGANISATION_PAYROLL_NUMBER', organisationPayrollNumber},

    requestFiles: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch('/api/fileData/getFiles')
            .then(response => response.json() as Promise<any[]>)
            .then(data => {
                dispatch({type: 'RECEIVE_FILES', files: data});
                processFile(getState().input.files, 0, dispatch);
            });

            addTask(fetchTask);
            dispatch({type: 'REQUEST_FILES'});
    },

    runFiles: (): AppThunkAction<KnownAction> => (dispatch, getState) =>{
        processFile(getState().input.files, 0, dispatch);
    }
}

const unloadedState: ConversionState = {organisationPayrollNumbers: [], 
                                        organisationNumbers: null, 
                                        organisationNumber: null, 
                                        organisationPayrollNumber: null, 
                                        isLoading: false, 
                                        files: [],
                                        numberOfFiles: 0,
                                        filesCompleted: 0};

export const reducer: Reducer<ConversionState> = (state:ConversionState, action: KnownAction) => {
    switch(action.type){
        case 'REQUEST_ORGANISATION_NUMBERS':
            return {
                organisationPayrollNumbers: state.organisationPayrollNumbers, 
                organisationNumbers: state.organisationNumbers,
                organisationNumber: state.organisationNumber, 
                organisationPayrollNumber: state.organisationPayrollNumber, 
                isLoading: true, 
                files: state.files,
                numberOfFiles: state.numberOfFiles,
                filesCompleted: state.filesCompleted,
            };
        case 'RECEIVE_ORGANISATION_NUMBERS':
            return {
                organisationPayrollNumbers: state.organisationPayrollNumbers, 
                organisationNumbers: action.organisationNumbers, 
                organisationNumber: state.organisationNumber,
                organisationPayrollNumber: state.organisationPayrollNumber, 
                isLoading: false, 
                files: state.files,
                numberOfFiles: state.numberOfFiles,
                filesCompleted: state.filesCompleted,
            };
        case 'SET_ORGANISATION_NUMBER':
            return {
                organisationPayrollNumbers: state.organisationPayrollNumbers, 
                organisationNumbers: state.organisationNumbers, 
                organisationNumber: action.organisationNumber,
                organisationPayrollNumber: state.organisationPayrollNumber, 
                isLoading: false, 
                files: state.files,
                numberOfFiles: state.numberOfFiles,
                filesCompleted: state.filesCompleted,
            }
        case 'REQUEST_ORGANISATION_PAYROLL_NUMBERS':
            return {
                organisationPayrollNumbers: state.organisationPayrollNumbers, 
                organisationNumbers: state.organisationNumbers, 
                organisationNumber: state.organisationNumber,
                organisationPayrollNumber: state.organisationPayrollNumber, 
                isLoading: true, 
                files: state.files,
                numberOfFiles: state.numberOfFiles,
                filesCompleted: state.filesCompleted,
            }
        case 'RECEIVE_ORGANISATION_PAYROLL_NUMBERS':
            return{
                organisationPayrollNumbers: action.organisationPayrollNumbers, 
                organisationNumbers: state.organisationNumbers, 
                organisationNumber: state.organisationNumber,
                organisationPayrollNumber: state.organisationPayrollNumber, 
                isLoading: false, 
                files: state.files,
                numberOfFiles: state.numberOfFiles,
                filesCompleted: state.filesCompleted,
            }
        case 'SET_ORGANISATION_PAYROLL_NUMBER':
            return{
                organisationPayrollNumbers: state.organisationPayrollNumbers, 
                organisationNumbers: state.organisationNumbers, 
                organisationNumber: state.organisationNumber,
                organisationPayrollNumber: action.organisationPayrollNumber, 
                isLoading: false, 
                files: state.files,
                numberOfFiles: state.numberOfFiles,
                filesCompleted: state.filesCompleted,
            }
        case 'REQUEST_FILES':
            return {
                organisationPayrollNumbers: state.organisationPayrollNumbers, 
                organisationNumbers: state.organisationNumbers, 
                organisationNumber: state.organisationNumber,
                organisationPayrollNumber: state.organisationPayrollNumber, 
                isLoading: true, 
                files: state.files,
                numberOfFiles: state.numberOfFiles,
                filesCompleted: state.filesCompleted,
            }
        case 'RECEIVE_FILES':
            return {
                organisationPayrollNumbers: state.organisationPayrollNumbers, 
                organisationNumbers: state.organisationNumbers, 
                organisationNumber: state.organisationNumber,
                organisationPayrollNumber: state.organisationPayrollNumber, 
                isLoading: false, 
                files: action.files,
                numberOfFiles: state.numberOfFiles,
                filesCompleted: state.filesCompleted,
            }
        case 'UPDATE_FILE_STATUS':
            let tempFiles = state.files.map(a => Object.assign({}, a));
            tempFiles[action.index] = action.file;
            return {
                organisationPayrollNumbers: state.organisationPayrollNumbers, 
                organisationNumbers: state.organisationNumbers, 
                organisationNumber: state.organisationNumber,
                organisationPayrollNumber: state.organisationPayrollNumber, 
                isLoading: false, 
                files: tempFiles,
                numberOfFiles: state.numberOfFiles,
                filesCompleted: state.filesCompleted,
            }
        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};