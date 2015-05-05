import React from 'react';

class TestComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        var cheery = "cheery",
            cindy = "cindy";
        return  <div className="ape abraham">
                    <div noClassName="feisty flavio" />
                    <div className={true ? "buffallo" : "bill"} />
                    <div className={`${cheery} ${cindy}`} />
                    <div className={"dumb dennis"} />
                </div>;
    }
}

export default TestComponent;