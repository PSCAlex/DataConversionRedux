import * as React from 'react';

const ImportProgress = ({completedFiles, totalFiles}) => {
    return(
        <div>
            <div className="progress">
                <div className="progress-bar progress-bar-success progress-bar-striped"
                     role="progressbar" 
                     aria-valuenow={completedFiles/totalFiles * 100} 
                     aria-valuemin="0" 
                     aria-valuemax="100" 
                     style={{width: `${completedFiles/totalFiles * 100}%`}}>
                </div>
            </div>
        </div>
    );
}

export default ImportProgress;