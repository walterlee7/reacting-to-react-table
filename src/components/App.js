import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

class App extends Component {

    render() {
        const data = [{
            name: 'Roy Agasthyan',
            age: 26,
            id: 0,
        }, {
            name: 'Sam Thomason',
            age: 22,
            id: 1,
        }, {
            name: 'Michael Jackson',
            age: 36
        }, {
            name: 'Samuel Roy',
            age: 56,
            time: 1200,
        }, {
            name: 'Rima Soy',
            age: 28
        }, {
            name: 'Suzi Eliamma',
            age: 28
        }]

        const columns = [
            {
                Header: 'Name',
                accessor: 'name'
            },
            {
                Header: 'Age',
                accessor: 'age'
            },
            {
                Header: 'ID',
                accessor: 'id'
            },
            {
                Header: 'Time',
                accessor: 'time'
            },
        ]

        return (
            <div>
                <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={3}
                    pageSizeOptions={[3, 6]}
                />
            </div>
        )

    }
}

export default App;