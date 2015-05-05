var espree = require('espree'),
    ESPREE_OPTS = {
        ecmaFeatures: {
            arrowFunctions: true,
            blockBindings: true,
            destructuring: true,
            regexYFlag: true,
            regexUFlag: true,
            templateStrings: true,
            binaryLiterals: true,
            octalLiterals: true,
            unicodeCodePointEscapes: true,
            defaultParams: true,
            restParams: true,
            forOf: true,
            objectLiteralComputedProperties: true,
            objectLiteralShorthandMethods: true,
            objectLiteralShorthandProperties: true,
            objectLiteralDuplicateProperties: true,
            generators: true,
            spread: true,
            classes: true,
            modules: true,
            jsx: true,
            globalReturn: true
        }
    };

function isArray (thing) {
    return Object.prototype.toString.call(thing) === '[object Array]';
}

/**
 * Walks an ESTree compatible tree.
 * @param  {Object} The tree
 * @param  {Function} The function to invoke on every node.
 */
function walk(tree, fn) {
    var keys = Object
                .keys(tree)
                .filter(function(key) {
                    return typeof tree[key] === 'object';
                });
    keys
    .forEach(function(key) {
        var val = tree[key];
        if (isArray(val)) {
            val.forEach(function(node) {
                fn(node);
                walk(node, fn);
            });
        } else if (val && val.type) {
            fn(val);
            walk(val, fn);
        }
    });
}

/**
 * Extracts classes from a JSX string by passing it to espree
 * and walking over the AST nodes.
 *
 * @param  {String} The JSX string
 * @return {Array} The contained classes
 */
function symdiffJSX(jsxString) {
    var ast,
        classes = [];

    try {
        ast = espree.parse(jsxString, ESPREE_OPTS);
    } catch(e) {
        return [];
    }

    walk(ast, function(node) {
        // we are only interested in jsx attributes "className"
        if (node.type === 'JSXAttribute' &&
            node.name.type === 'JSXIdentifier' &&
            node.name.name === 'className') {
            // and we only support literals for now
            if (node.value.type === 'Literal') {
                classes = classes.concat(node.value.value.split(' '));
            }
        }
    });
    // deduplicate
    classes = classes
                .filter(function(c, i, all) {
                    return all.lastIndexOf(c) === i;
                });

    return classes;
}

module.exports = symdiffJSX;