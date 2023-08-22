var _ = require('lodash')

let stringCol = {
    field: '',
    filter: 'agTextColumnFilter',
    sortable: true
}

let numberCol = {
    field: '',
    filter: 'agNumberColumnFilter',
    sortable: true
}

let dateCol = {
    field: '',
    filter: 'agTextColumnFilter',
    sortable: true
}

let longCol = {
    field: '',
    filter: 'agTextColumnFilter',
    sortable: true,
    resizable: true,
    wrapText: true,
    width: 500
}

export const processColumns = (data: string[], meta:any) => {
    
    return Object.keys(data[0]).map((col) => {

        let colDef:any = {}

        if (meta[col].type == 'string') {
            colDef = _.cloneDeep(stringCol)
        } else if (meta[col].type == 'number') {
            colDef = _.cloneDeep(numberCol)
        } else if (meta[col].type == 'date') {
            colDef = _.cloneDeep(dateCol)
        } else if (meta[col].type == 'long') {
            colDef = _.cloneDeep(longCol)
        }

        colDef['field'] = col
        return colDef

    })

}