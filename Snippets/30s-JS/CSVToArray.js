/**
 * Converts a comma-separated values(CSV) string to a 2D array.
 *
 * Use Array.prototype.indexOf() to find the newline character('\n')
 * use Array.prototype.slice() to remove the first row(title row) if omitFirstRow is true.
 * Use String.prototype.split() to create a string for each row.
 * use String.prototype.split() to separate the values in each row,using the provided delimiter.
 * omit the second argument, delimiter,to use a default delimiter of ','.
 * omit the third argument,omitFirstRow,to include the first row(title row) of the CSV string.
 */

const CSVToArray = (data, delimiter = ',', omitFirstRow = false) =>
    data
        .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
        .split('\n')
        .map((v) => v.split(delimiter))

CSVToArray('a,b\nc,d')
CSVToArray('a;b\nc;d', ';')
CSVToArray('col1,col2\na,b\nc,d', ',', true)
