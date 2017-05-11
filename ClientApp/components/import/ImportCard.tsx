import * as React from 'react';

const ImportCard =({file}) => {
    return(
        <div>
            <div className="well well-sm">
                <div className="row">
                    <div className="col-md-8">
                        <h4>{file.name}</h4>
                    </div>
                    <div className="col-md-2">
                        {(()=>{
                            if(file.success){
                                return <i className="fa fa-check-circle-o fa-3x" aria-hidden="true"></i>
                            }
                            else if(file.error){
                                return <i className="fa fa-times-circle-o fa-3x" aria-hidden="true"></i>
                            }
                            else if(file.isStarted){
                                return <div className="loader">
                                            <div className="circle">&nbsp;</div>
                                            <div className="circle">&nbsp;</div>
                                            <div className="circle">&nbsp;</div>
                                            <div className="circle">&nbsp;</div>
                                        </div>
                            }
                            else{
                                return '';
                            }
                        })()}
                    </div>
                    <div className="col-md-1">
                        <i className="fa fa-caret-square-o-down fa-3x" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportCard;
