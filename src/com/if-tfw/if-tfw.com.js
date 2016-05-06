/**
 * Component if-tfw
 */

exports.tags = ["if-tfw"];
exports.priority = 0;

/**
 * Compile a node of the HTML tree.
 */
exports.compile = function(root, libs) {
    root.name = "fieldset";
    var children = [
        {
            type: libs.Tree.ELEMENT,
            name: "legend",
            children: [
                {
                    type: libs.Tree.TEXT,
                    text: "If you are using Toloframework"
                }
            ]
        }
    ].concat( root.children );
    root.children = children;
    libs.compileChildren( root );
};
