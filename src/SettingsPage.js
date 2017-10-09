import * as React from 'react';
import * as cxs from 'cxs';
import {InputGroup, InputGroupAddon, Input} from 'reactstrap';

const settingsPageClass = cxs({
    width: '500px',
    margin: '50px'
});

export default class SettingsPage extends React.Component {
    state = {
        fontSize: parseInt(localStorage.getItem('fontSize'), 10) ||  14
    }
    render(){
        return (
            <div className={settingsPageClass}>
                <h2 style={{marginBottom: '30px'}}>Settings</h2>
                <InputGroup>
                    <InputGroupAddon>Font Size</InputGroupAddon>
                    <Input type="number" value={this.state.fontSize} onChange={this.onFontSizeChanged} />
                </InputGroup>
            </div>
        );
    }

    onFontSizeChanged = (event) => {
        this.setState({
            fontSize: event.target.value
        });
        localStorage.setItem('fontSize', event.target.value);
    }
}