import React from 'react';
import { Panel } from 'react-bootstrap';
import  SplitPane from 'react-split-pane';


const Home = () => {
    
    return (
    <div>
    <Panel bsStyle="default">
                                                
        <h4>Home Page, panel body without header</h4>
        
     </Panel>

     <SplitPane split="vertical" minSize={50} defaultSize={300}>
        <div>left</div>
        <SplitPane split="horizontal">
            <div>right top</div>
            <div>right bottom</div>
        </SplitPane>
    </SplitPane>
    </div>
    );
};

export default Home;