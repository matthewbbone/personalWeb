import { AgGridReact } from 'ag-grid-react';
import { FC, useRef, useEffect, useState } from 'react'
import { DatasetProps } from './types'
import { processColumns } from './ColumnDefs';
import { processRows } from './Rows'
import { getDataset, getMetaData } from '../../services/datasetService/DatasetService';
import { RowHighlightPosition } from 'ag-grid-community';

const csvURL = 'https://raw.githubusercontent.com/matthewbbone/Holcomb/master/njnews/census2019.csv'

export const Dataset: FC<DatasetProps> = ({ id }) => {

    const [rows, setRows] = useState<any>()
    const [cols, setCols] = useState<any>()
    const gridRef = useRef<any>()
    const [height, setHeight] = useState<number>(30)

    getDataset(id)
        .then(data => {

            getMetaData(id)
                .then(meta => {

                    setRows(processRows(data, meta))
                    setCols(processColumns(data, meta))

                    let types = Object.values(meta).map((cols: any) => cols.type)
                    if (types.some(t => t == 'long')) { setHeight(80) }

                })

        })

    let onGridReady = () => {
        gridRef.current.api.sizeColumnsToFit()
    }

    return (
        <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
            <AgGridReact
                ref={gridRef}
                rowData={rows}
                rowHeight={height}
                columnDefs={cols}
                onGridReady={onGridReady}>
            </AgGridReact>
        </div>
    );

};