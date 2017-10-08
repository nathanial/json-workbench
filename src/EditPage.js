import * as React from 'react';
import * as cxs from 'cxs';
import {Collapse, Card, CardBody} from 'reactstrap';
import ReactHeight from 'react-height';

const editPageClass = cxs({

});

const editSidebarClass = cxs({
    width: '600px',
    position: 'absolute',
    left: 0,
    top:0,
    bottom: 0,
    borderRight: '1px solid #ddd'
});

const editSidebarHeaderClass = cxs({
    background: '#eee',
    padding: '10px 15px',
    fontSize: '18px',
    margin: 0,
    borderBottom: '1px solid #ddd',
    borderTop: '1px solid #ddd',
    marginTop:'-1px'
});

const editSidebarSectionClass = cxs({
    borderRight: '0px solid #ddd'
});

const sourceEditorClass = cxs({
    transition: 'height 0.2s',
    overflow: 'hidden'
});

const scriptEditorClass = cxs({
    transition: 'height 0.2s',
    overflow: 'hidden'
});

class SourceEditor extends React.Component {
    render(){
        return (
            <div className={sourceEditorClass} {...this.props}>
            </div>
        );
    }
}

class ScriptEditor extends React.Component {
    render(){
        return (
            <div className={scriptEditorClass} {...this.props}>
            </div>
        );
    }
}

export default class EditPage extends React.Component {
    state = {
        scriptOpen: true,
        sourceOpen: true
    };
    render(){
        const scriptHeight = this.getScriptHeight();
        const sourceHeight = this.getSourceHeight();
        return (
            <div ref={root => this.root = root} className={editPageClass}>
                <div className={editSidebarClass}>
                    <div className={editSidebarSectionClass}>
                        <h3 className={editSidebarHeaderClass} onClick={() => this.toggle('source')}>Source</h3>
                        <SourceEditor style={{height: sourceHeight}} />
                    </div>
                    <div className={editSidebarSectionClass}>
                        <h3 className={editSidebarHeaderClass} onClick={() => this.toggle('script')}>Script</h3>
                        <ScriptEditor style={{height: scriptHeight}}/>
                    </div>
                </div>
            </div>
        );
    }

    getSourceHeight() {
        const height = this.state.height - 42 * 2;
        if(this.state.scriptOpen && this.state.sourceOpen){
            return height / 2;
        } else if(!this.state.sourceOpen) {
            return 0;
        } else {
            return height;
        }
    }

    getScriptHeight() {
        const height = this.state.height - 42 * 2;
        if(this.state.scriptOpen && this.state.sourceOpen){
            return height / 2;
        } else if(!this.state.scriptOpen) {
            return 0;
        } else {
            return height;
        }
    }

    componentDidMount(){
        var body = document.body,
        html = document.documentElement;
    
        var height = Math.max( body.scrollHeight, body.offsetHeight, 
                           html.clientHeight, html.scrollHeight, html.offsetHeight );
        this.setState({
            height
        })
    }

    toggle = (name) => {
        if(name === 'script'){
            this.setState({scriptOpen: !this.state.scriptOpen});
        }
        if(name === 'source'){
            this.setState({sourceOpen: !this.state.sourceOpen});
        }
    }
}
