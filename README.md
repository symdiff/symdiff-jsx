# symdiff-jsx

[![Build Status](http://img.shields.io/travis/symdiff/symdiff-jsx.svg)](https://travis-ci.org/symdiff/symdiff-jsx) [![Coverage Status](https://coveralls.io/repos/symdiff/symdiff-jsx/badge.svg?branch=master)](https://coveralls.io/r/symdiff/symdiff-jsx?branch=master)

Supports only JSX literals for now.

~~~
import React from 'react';
class Test extends React.Component {
    render() {
        var works = false;
        return <div className="this works">
                    <div className={works ? "nope" : "sorry"} />
                </div>;
    }
}
~~~