import {createRef, h, render, Component, Fragment} from 'preact';
import {useState, useCallback, useMemo} from 'preact/hooks';
import {createEvent} from 'effector';
import {useStore} from 'effector-react';

import '#/ui/Table.scss';

export default function Table(_) {
    const [pageNumber, setPageNumber] = useState(0);
    const [pageLength, setPageLength] = useState(10);

    // Base Rows
    let rows = _.dynamicRows ? useStore(_.dynamicRows) : useState(_.rows);
    const setRows = _.rows ? ((rows = rows[0]) && rows[1]) : undefined;

    // Sorting
    const sortFunction = (a, b, by, flip = false) => {
        if(flip) [a, b] = [b, a];

        if(typeof a[by] === 'string') {
            return a[by].localeCompare(b[by]);
        } else if(typeof a[by] === 'number') {
            return a[by] - b[by];
        }

        return 0;
    };
    const sort = _.dynamicRows ? (() => {
        const sortEvent = createEvent();
        _.dynamicRows.on(sortEvent, (state, by) => [...state].sort((a, b) => sortFunction(a, b, by)));
        return sortEvent;
    })() : useCallback(() => {
        setRows(rows.sort((a, b) => sortFunction(a, b, by)));
    }, [rows, setRows]);

    // Headers
    const headers = useMemo(() => {
        return _.columns.map(columnDef => 
            <th onClick={() => {sort(columnDef.split('=')[0])}}>{columnDef.split('=')[1]}</th>
        );
    }, [_.columns, sort]);

    // Page
    const page = useMemo(() => {
        const pageRows = rows.slice(pageNumber * pageLength, (pageNumber * pageLength) + pageLength);
        return pageRows.map(rowDefinition => 
            <tr onClick={() => {_.onSelect?.(rowDefinition)}}>{_.columns.map(column => <td>{rowDefinition[column.split('=')[0]]}</td>)}</tr>
        );
    }, [_.columns, pageNumber, pageLength, rows]);

    // Controls
    const controls = useMemo(() => {
        const controlsArray = [];

        for(let i = 0; i < Math.ceil(rows.length / pageLength); i++) {
            controlsArray.push(
                <div onClick={() => {setPageNumber(i)}} 
                    data-status={pageNumber === i ? 'active' : 'inactive'} 
                    className="page-button"> 
                    { i + 1 } 
                </div>
            );
        } 

        return controlsArray;
    }, [rows, pageNumber, pageLength, setPageNumber]);

    return (
        <div className="cool-table">
            <table cellPadding="0" cellSpacing="0">
                <tr>{ headers }</tr>
                { page }
            </table>

            <div className="controls">
                { controls }
            </div>
        </div>
    );
}
