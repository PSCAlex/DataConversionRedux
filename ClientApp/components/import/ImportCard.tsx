import * as React from 'react';

class ImportCard extends React.Component<any,any>{
    constructor(props,context){
        super(props,context);
        this.state = { visible: false };
        this.toggleVisible = this.toggleVisible.bind(this);
    }

    toggleVisible(){
        this.setState({visible: !this.state.visible});
    }

    public render() {
        return(
            <div>
                <div className="well well-sm">
                    <div onClick={this.toggleVisible}>
                        <div className="row">
                            <div className="col-md-10">
                                <h4>{this.props.file.name}</h4>
                            </div>
                            <div className="col-md-2">
                                {(()=>{
                                    if(this.props.file.success){
                                        return <i className="fa fa-check-circle-o fa-3x successIcon" aria-hidden="true"></i>
                                    }
                                    else if(this.props.file.error){
                                        return <i className="fa fa-times-circle-o fa-3x errorIcon" aria-hidden="true"></i>
                                    }
                                    else if(this.props.file.isStarted){
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
                    </div>
                    <div className={this.state.visible ? 'show-message' : 'hide-message'}>
                        <div className="row ">
                            <div className="col-md-10 col-md-offset-1">
                                <div className="row">
                                    <span>Response text</span>
                                </div>
                                <textarea rows={5} cols={80} wrap="hard" value={this.props.file.successInfo ? this.props.file.successInfo : this.props.file.errorInfo} readOnly></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ); 
    }
}

export default ImportCard;
