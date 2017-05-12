import * as React from 'react';

const ImportCard =({file}) => {
    return(
        <div>
            <div className="well well-sm">
                <div className="row">
                    <div className="col-md-10">
                        <h4>{file.name}</h4>
                    </div>
                    <div className="col-md-2">
                        {(()=>{
                            if(file.success){
                                return <i className="fa fa-check-circle-o fa-3x successIcon" aria-hidden="true"></i>
                            }
                            else if(file.error){
                                return <i className="fa fa-times-circle-o fa-3x errorIcon" aria-hidden="true"></i>
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
                </div>
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <div className="row">
                            <span>Response text</span>
                        </div>
                        <textarea rows={5} cols={80} wrap="hard" value={file.successInfo ? file.successInfo : file.errorInfo} readOnly></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImportCard;
