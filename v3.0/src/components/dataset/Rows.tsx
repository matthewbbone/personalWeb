var _ = require('lodash')

export const processRows = (rows:any, colInfo:any) => {
    
    const newRows = rows.map((row:any) => {
        const newRow = _.cloneDeep(row)
        Object.keys(row).forEach((key:string) => {
            if (colInfo[key].type == 'number') {
                newRow[key] = Number(row[key].replace(',',''))
            }
        })
        return newRow
    })
    return newRows
}