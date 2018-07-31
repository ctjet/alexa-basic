module.exports = {
    runProgram: function (codeLines) {


    },

    editLine:function(lineNumber, keyword, value, attributes) {
        // var index = (this.attributes.hasOwnProperty('lineNumbers') ? this.attributes.lineNumbers.indexOf(lineNumber) : -2);


        var index = 0;
        var lineObj = { lineNumber: lineNumber, keyword: keyword, value: value };


        if (attributes.hasOwnProperty('codeLines')) {
            index = attributes.codeLines.findIndex(line => line.lineNumber == lineNumber);
        } else {
            index = -2; //codeLines is not defined yet
            attributes.codeLines = [lineObj];
        }

        if (index == -1) {
            attributes.codeLines = attributes.codeLines.concat([lineObj]);
        } else if (index >= 0) {
            attributes.codeLines[index] = lineObj;
        }

        attributes.codeLines = sortByKey(attributes.codeLines, 'lineNumber');

        return attributes;
    },

    sortByKey: function(array, key) {
        return array.sort(function (a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    },

     getLineIndex:function(array, value) {

        return array.findIndex(line => line.lineNumber == value);
    },

};