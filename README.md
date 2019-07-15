## Reacting to React Table

This is a React app using React Table.

```
npm install react-table
```
These are all of the available props (and their default values) for the main
```
<ReactTable />
```
component:

```
// General Options
data: [],
resolveData: data => resolvedData,
loading: false,
showPagination: true,
showPaginationTop: false,
showPaginationBottom: true
showPageSizeOptions: true,
pageSizeOptions: [5, 10, 20, 25, 50, 100],
defaultPageSize: 20,

minRows: undefined,
// controls the minimum number of rows to display - default will be `pageSize`.
// NOTE: if you set minRows to 0 then you get rid of empty padding rows BUT your table formatting will also look strange when there are ZERO rows in the table.

showPageJump: true,
collapseOnSortingChange: true,
collapseOnPageChange: true,
collapseOnDataChange: true,
freezeWhenExpanded: false,
sortable: true,
multiSort: true,
resizable: true,
filterable: false,
defaultSortDesc: false,
defaultSorted: [],
defaultFiltered: [],
defaultResized: [],
defaultExpanded: {},

defaultFilterMethod: (filter, row, column) => {
    const id = filter.pivotId || filter.id
    return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true
},

defaultSortMethod: (a, b, desc) => {
    // force null and undefined to the bottom
    a = a === null || a === undefined ? '' : a
    b = b === null || b === undefined ? '' : b
    // force any string values to lowercase
    a = typeof a === 'string' ? a.toLowerCase() : a
    b = typeof b === 'string' ? b.toLowerCase() : b
    // Return either 1 or -1 to indicate a sort priority
    if (a > b) {
        return 1
    }
    if (a < b) {
        return -1
    }
    // returning 0, undefined or any falsey value will use subsequent sorts or
    // the index as a tiebreaker
    return 0
},

PadRowComponent: () => <span>&nbsp;</span>, // the content rendered inside of a padding row

// Controlled State Overrides (see Fully Controlled Component section)
page: undefined,
pageSize: undefined,
sorted: [],
filtered: [],
resized: [],
expanded: {},

// Controlled State Callbacks
onPageChange: undefined,
onPageSizeChange: undefined,
onSortedChange: undefined,
onFilteredChange: undefined,
onResizedChange: undefined,
onExpandedChange: undefined,

// Pivoting
pivotBy: undefined,

// Key Constants
pivotValKey: '_pivotVal',
pivotIDKey: '_pivotID',
subRowsKey: '_subRows',
aggregatedKey: '_aggregated',
nestingLevelKey: '_nestingLevel',
originalKey: '_original',
indexKey: '_index',
groupedByPivotKey: '_groupedByPivot',

// Server-side callbacks
onFetchData: () => null,

// Classes
className: '',
style: {},

// Component decorators
getProps: () => ({}),
getTableProps: () => ({}),
getTheadGroupProps: () => ({}),
getTheadGroupTrProps: () => ({}),
getTheadGroupThProps: () => ({}),
getTheadProps: () => ({}),
getTheadTrProps: () => ({}),
getTheadThProps: () => ({}),
getTheadFilterProps: () => ({}),
getTheadFilterTrProps: () => ({}),
getTheadFilterThProps: () => ({}),
getTbodyProps: () => ({}),
getTrGroupProps: () => ({}),
getTrProps: () => ({}),
getThProps: () => ({}),
getTdProps: () => ({}),
getTfootProps: () => ({}),
getTfootTrProps: () => ({}),
getTfootThProps: () => ({}),
getPaginationProps: () => ({}),
getLoadingProps: () => ({}),
getNoDataProps: () => ({}),
getResizerProps: () => ({}),

// Custom pagination rendering
renderPageJump: ({ onChange, value, onBlur, onKeyPress, inputType, pageJumpText }) => component,
renderCurrentPage: page => component,
renderTotalPagesCount: pages => component,
renderPageSizeOptions: ({
    pageSize,
    pageSizeOptions,
    rowsSelectorText,
    onPageSizeChange,
    rowsText,
}) => component

// Global Column Defaults
// To override only some values, import { ReactTableDefaults } from 'react-table'
// and construct your overrides (e.g. {...ReactTableDefaults.column, className: 'react-table-cell'})
column: {
// Renderers
Cell: undefined,
Header: undefined,
Footer: undefined,
Aggregated: undefined,
Pivot: undefined,
PivotValue: undefined,
Expander: undefined,
Filter: undefined,
// Standard options
sortable: undefined, // use table default
resizable: undefined, // use table default
filterable: undefined, // use table default
show: true,
minWidth: 100,
// Cells only
className: '',
style: {},
getProps: () => ({}),
// Headers only
headerClassName: '',
headerStyle: {},
getHeaderProps: () => ({})
// Footers only
footerClassName: '',
footerStyle: {},
getFooterProps: () => ({}),
filterAll: false,
filterMethod: undefined,
sortMethod: undefined,
defaultSortDesc: undefined,
},

// Global Expander Column Defaults
// To override only some values, import { ReactTableDefaults } from 'react-table'
// and construct your overrides (e.g. {...ReactTableDefaults.expanderDefaults, sortable: true})
expanderDefaults: {
sortable: false,
resizable: false,
filterable: false,
width: 35
},

// Global Pivot Column Defaults
pivotDefaults: {},

// Text
previousText: 'Previous',
nextText: 'Next',
loadingText: 'Loading...',
noDataText: 'No rows found',
pageText: 'Page',
ofText: 'of',
rowsText: 'rows',

// Accessibility Labels
pageJumpText: 'jump to page',
rowsSelectorText: 'rows per page',

```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

