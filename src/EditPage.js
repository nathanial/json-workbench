import * as React from 'react';
import * as cxs from 'cxs';
import {Collapse, Card, CardBody} from 'reactstrap';
import ReactHeight from 'react-height';

const editPageClass = cxs({

});

const editSidebarClass = cxs({
    width: '600px'
});

const editSidebarHeaderClass = cxs({
    background: '#eee',
    padding: '10px 15px',
    fontSize: '18px',
    margin: 0,
    borderBottom: '1px solid #ddd'
});

const editSidebarSectionClass = cxs({
    border: '1px solid #ddd',
});

const sourceEditorClass = cxs({
});

const scriptEditorClass = cxs({
});

class SourceEditor extends React.Component {
    render(){
        return (
            <div className={sourceEditorClass} {...this.props}>
                Source Editor
            </div>
        );
    }
}

class ScriptEditor extends React.Component {
    render(){
        return (
            <div className={scriptEditorClass} {...this.props}>
                Script Editor
            </div>
        );
    }
}

export default class EditPage extends React.Component {
    state = {
        scriptOpen: true,
        sourceOpen: true,
        height: 0
    };
    render(){
        const sourceHeight = this.getSourceHeight();
        const scriptHeight = this.getScriptHeight();
        return (
            <div ref={root => this.root = root} className={editPageClass}>
                <div className={editSidebarClass}>
                    <div className={editSidebarSectionClass}>
                        <h3 className={editSidebarHeaderClass} onClick={() => this.toggle('source')}>Source</h3>
                        <Collapse isOpen={this.state.sourceOpen} >
                            <SourceEditor style={{height: sourceHeight}} />
                        </Collapse>
                    </div>
                    <div className={editSidebarSectionClass}>
                        <h3 className={editSidebarHeaderClass} onClick={() => this.toggle('script')}>Script</h3>
                        <Collapse isOpen={this.state.scriptOpen}>
                            <ScriptEditor style={{height: scriptHeight}}/>
                        </Collapse>
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
            return height / 2;
        } else {
            return height;
        }
    }

    getScriptHeight() {
        const height = this.state.height - 42 * 2;
        if(this.state.scriptOpen && this.state.sourceOpen){
            return height / 2;
        } else if(!this.state.scriptOpen) {
            return height / 2;
        } else {
            return height;
        }
    }

    componentDidMount(){
        var body = document.body,
        html = document.documentElement;
    
        var height = Math.max( body.scrollHeight, body.offsetHeight, 
                           html.clientHeight, html.scrollHeight, html.offsetHeight );
        console.log("height", height);
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
