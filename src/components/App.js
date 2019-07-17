import React, { Component } from 'react';
import ReactTable from "react-table";
import './App.css';
//import "react-table/react-table.css";

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

        const data2 = [{
            name: 'Roy Rogers',
            age: 26,
            id: 0,
        }, {
            name: 'Sam Adams',
            age: 22,
            id: 1,
        }, {
            name: 'Jack Daniels',
            age: 36
        }]

        const columns = [{
            Header: 'Reacting to react-table',
            headerClassName: 'react-table-header-group',
            columns: [
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
        }]

        return (
            <div>
                <ReactTable
                    data={data}
                    columns={columns}
                    defaultPageSize={3}
                    pageSizeOptions={[3, 6]}
                />

                <ReactTable
                    style={{ textAlign: 'center' }}
                    data={data}
                    columns={columns}
                    defaultPageSize={3}
                    pageSizeOptions={[3, 6]}
                    SubComponent={row => {
                        return (
                            <div>
                                {row.original.name}
                                <br /> <br />
                                {row.original.age}
                                {console.log(row)}
                            </div>
                        )
                    }}
                />

                <div id="data-2">
                    <ReactTable
                        data={data2}
                        columns={columns}
                        defaultPageSize={3}
                        pageSizeOptions={[3, 6]}
                    />
                </div>

                <ReactTable
                    style={{ backgroundColor: '#F01001', padding: 100 }}
                    data={data}
                    columns={columns}
                    defaultPageSize={3}
                    pageSizeOptions={[3, 6]}
                />

                <ReactTable
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            style: {
                                background: rowInfo.row.age > 30 ? 'green' : 'red'
                            }
                        }
                    }}
                    data={data}
                    columns={columns}
                    defaultPageSize={3}
                    pageSizeOptions={[3, 6]}
                />

                <div id="table">
                    <ReactTable
                        data={data}
                        columns={columns}
                        defaultPageSize={4}
                        pageSizeOptions={[3, 6]}
                    />
                </div>
            </div>
        )
    }
}

export default App;