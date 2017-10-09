import * as _ from 'lodash';
import PropTypes from 'prop-types';
import * as React from 'react';
import * as cxs from 'cxs';
import ReactHeight from 'react-height';
import CodeMirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';

const editPageClass = cxs({

});

const editSidebarClass = cxs({
    width: '500px',
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
    transition: 'height 0.2s ease-in-out',
    overflow: 'hidden'
});

const editorClass = cxs({
    transition: 'height 0.2s ease-in-out',
    overflow: 'hidden'
});

const scriptEditorClass = cxs({
    transition: 'height 0.2s ease-in-out',
    overflow: 'hidden'
});

const outputClass = cxs({
    position: 'absolute',
    right: 0,
    top:0,
    bottom: 0,
    left: '500px'
});

class Editor extends React.Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    }
    render(){
        const options = {lineNumbers: true, mode:'javascript'};
        const style = _.extend({fontSize: localStorage.getItem('fontSize') + 'px'}, this.props.style);
        return (
            <div className={editorClass} {..._.omit(this.props, ['value', 'onChange'])}
                style={style}>
                <CodeMirror value={this.props.value} 
                            onChange={this.updateCode} 
                            options={options} />
            </div>
        );
    }
    
    updateCode = (newValue) => {
        this.props.onChange(newValue);
    }

    componentWillReceiveProps(nextProps) {
        if(this.editor && !_.isEqual(nextProps.value, this.props.value)){
            const mirror = this.editor.getCodeMirror();
            mirror.getDoc().setValue(nextProps.value);
        }
    }
}

const script = `
function visit(source){

}
`;

class Output extends React.Component {
    static propTypes = {
        value: PropTypes.string.isRequired
    }
    render(){
        const options = {lineNumbers: true, mode:'javascript', readOnly: true};
        return (
            <div className={outputClass} style={{fontSize: localStorage.getItem('fontSize') + 'px'}}>
                <CodeMirror ref={editor => this.editor = editor} 
                            value={this.props.value} 
                            options={options} />
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        if(this.editor){
            const mirror = this.editor.getCodeMirror();
            mirror.getDoc().setValue(nextProps.value);
        }
    }
}

export default class EditPage extends React.Component {
    state = {
        scriptOpen: true,
        sourceOpen: true,
        height: 0,
        script: localStorage.getItem('script') || script,
        source: localStorage.getItem('source') || '{}',
        output: '{}'
    };
    render(){
        const scriptHeight = this.getScriptHeight();
        const sourceHeight = this.getSourceHeight();
        return (
            <div ref={root => this.root = root} className={editPageClass}>
                <div className={editSidebarClass}>
                    <div className={editSidebarSectionClass}>
                        <h3 className={editSidebarHeaderClass} onClick={() => this.toggle('source')}>Source</h3>
                        <Editor value={this.state.source} 
                                style={{height: sourceHeight}}
                                onChange={this.onUpdateSource} />
                    </div>
                    <div className={editSidebarSectionClass}>
                        <h3 className={editSidebarHeaderClass} onClick={() => this.toggle('script')}>Script</h3>
                        <Editor value={this.state.script}
                                style={{height: scriptHeight}}
                                onChange={this.onUpdateScript}/>
                    </div>
                </div>
                <Output value={this.state.output} />    
            </div>
        );
    }

    getSourceHeight() {
        const height = this.state.height - 40 * 2;
        if(this.state.scriptOpen && this.state.sourceOpen){
            return height / 2;
        } else if(!this.state.sourceOpen) {
            return 0;
        } else {
            return height;
        }
    }

    getScriptHeight() {
        const height = this.state.height - 40 * 2;
        if(this.state.scriptOpen && this.state.sourceOpen){
            return height / 2;
        } else if(!this.state.scriptOpen) {
            return 0;
        } else {
            return height;
        }
    }

    componentDidMount(){
        this.setState({
            height: this.getWindowHeight()
        });

        window.addEventListener('resize', this.onWindowResize);
        console.log("BAM");
        this.processOutput(this.state.source, this.state.script);
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowResize = () => {
        this.setState({
            height: this.getWindowHeight()
        });
    }

    toggle = (name) => {
        if(name === 'script'){
            this.setState({scriptOpen: !this.state.scriptOpen});
        }
        if(name === 'source'){
            this.setState({sourceOpen: !this.state.sourceOpen});
        }
    }

    getWindowHeight = () => {
        return window.innerHeight;
    }

    onUpdateScript = (newScript) => {
        this.setState({
            script: newScript,
        });
        localStorage.setItem('script', newScript);
        this.processOutput(this.state.source, newScript)
    }

    onUpdateSource = (newSource) => {
        this.setState({
            source: newSource
        });
        localStorage.setItem('source', newSource);
        this.processOutput(newSource, this.state.script);
    }

    processOutput = (source, script) => {
        const text = `
            self.onmessage = function(e) { 
                try {
                    var data = JSON.parse(e.data);
                    var script = data.script;
                    var source = JSON.parse(data.source);
                    eval(script);
                    visit(source);
                    postMessage(source);    
                } catch(error){
                    postMessage({});
                }
            }
        `;
        const blob = new Blob([text], {type: 'application/javascript'});
        const worker = new Worker(URL.createObjectURL(blob));
        worker.onmessage = (e) => {
            this.setState({
                output: JSON.stringify(e.data, undefined, 4)
            });
            worker.terminate();
        };
        worker.postMessage(JSON.stringify({
            source,
            script
        }));
    }
}
