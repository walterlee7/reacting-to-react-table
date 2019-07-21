Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.advancedExpandTableHOC = exports.columnsWithToggle = exports.subComponentWithToggle = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var set = require('lodash.set');

var _lodash2 = _interopRequireDefault(set);

// var _lodash3 = require('lodash.get');

var get = require('lodash.get');

var _lodash4 = _interopRequireDefault(get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
  AvancedExpandTableHOC for ReactTable

  HOC which allows any Cell in the row to toggle the row's
  SubComponent. Also allows the SubComponent to toggle itself.

  Expand functions available to any SubComponent or Column Cell:
    toggleRowSubComponent
    showRowSubComponent
    hideRowSubComponent

  Each Column Renderer (E.g. Cell ) gets the expand functions in its props
  And Each SubComponent gets the expand functions in its props

  Expand functions takes the `rowInfo` given to each
  Column Renderer and SubComponent already by ReactTable.
*/

var subComponentWithToggle = exports.subComponentWithToggle = function subComponentWithToggle(SubComponent, expandFuncs) {
    return function (props) {
        return _react2.default.createElement(SubComponent, _extends({}, props, expandFuncs));
    };
};

// each cell in the column gets passed the function to toggle a sub component
var columnsWithToggle = exports.columnsWithToggle = function columnsWithToggle(columns, expandFuncs) {
    return columns.map(function (column) {
        if (column.columns) {
            return _extends({}, column, {
                columns: columnsWithToggle(column.columns, expandFuncs)
            });
        }
        return _extends({}, column, {
            getProps: function getProps() {
                return _extends({}, expandFuncs);
            }
        });
    });
};

var advancedExpandTableHOC = function advancedExpandTableHOC(TableComponent) {
    var _class, _temp;

    return _temp = _class = function (_Component) {
        _inherits(AdvancedExpandTable, _Component);

        function AdvancedExpandTable(props) {
            _classCallCheck(this, AdvancedExpandTable);

            var _this = _possibleConstructorReturn(this, (AdvancedExpandTable.__proto__ || Object.getPrototypeOf(AdvancedExpandTable)).call(this, props));

            _this.state = {
                expanded: {}
            };
            _this.toggleRowSubComponent = _this.toggleRowSubComponent.bind(_this);
            _this.showRowSubComponent = _this.showRowSubComponent.bind(_this);
            _this.hideRowSubComponent = _this.hideRowSubComponent.bind(_this);
            _this.getTdProps = _this.getTdProps.bind(_this);
            _this.fireOnExpandedChange = _this.fireOnExpandedChange.bind(_this);
            _this.expandFuncs = {
                toggleRowSubComponent: _this.toggleRowSubComponent,
                showRowSubComponent: _this.showRowSubComponent,
                hideRowSubComponent: _this.hideRowSubComponent
            };
            return _this;
        }

        // after initial render if we get new
        // data, columns, page changes, etc.
        // we reset expanded state.


        _createClass(AdvancedExpandTable, [{
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps() {
                this.setState({
                    expanded: {}
                });
            }
        }, {
            key: 'fireOnExpandedChange',
            value: function fireOnExpandedChange(rowInfo, e) {
                // fire callback once state has changed.
                if (this.props.onExpandedChange) {
                    this.props.onExpandedChange(rowInfo, e);
                }
            }
        }, {
            key: 'resolveNewTableState',
            value: function resolveNewTableState(rowInfoOrNestingPath, e, expandType) {
                var _this2 = this;

                // derive nestingPath if only rowInfo is passed
                var nestingPath = rowInfoOrNestingPath;

                if (rowInfoOrNestingPath.nestingPath) {
                    nestingPath = rowInfoOrNestingPath.nestingPath;
                }

                this.setState(function (prevState) {
                    var isExpanded = (0, _lodash4.default)(prevState.expanded, nestingPath);
                    // since we do not support nested rows, a shallow clone is okay.
                    var newExpanded = _extends({}, prevState.expanded);

                    switch (expandType) {
                        case 'show':
                            (0, _lodash2.default)(newExpanded, nestingPath, {});
                            break;
                        case 'hide':
                            (0, _lodash2.default)(newExpanded, nestingPath, false);
                            break;
                        default:
                            // toggle
                            (0, _lodash2.default)(newExpanded, nestingPath, isExpanded ? false : {});
                    }
                    return _extends({}, prevState, {
                        expanded: newExpanded
                    });
                }, function () {
                    return _this2.fireOnExpandedChange(rowInfoOrNestingPath, e);
                });
            }
        }, {
            key: 'toggleRowSubComponent',
            value: function toggleRowSubComponent(rowInfo, e) {
                this.resolveNewTableState(rowInfo, e);
            }
        }, {
            key: 'showRowSubComponent',
            value: function showRowSubComponent(rowInfo, e) {
                this.resolveNewTableState(rowInfo, e, 'show');
            }
        }, {
            key: 'hideRowSubComponent',
            value: function hideRowSubComponent(rowInfo, e) {
                this.resolveNewTableState(rowInfo, e, 'hide');
            }
        }, {
            key: 'getTdProps',
            value: function getTdProps(tableState, rowInfo, column) {
                var _this3 = this;

                var expander = column.expander;


                if (!expander) {
                    // no overrides
                    return {};
                }

                return {
                    // only override onClick for column Td
                    onClick: function onClick(e) {
                        _this3.toggleRowSubComponent(rowInfo, e);
                    }
                };
            }
        }, {
            key: 'getWrappedInstance',
            value: function getWrappedInstance() {
                if (!this.wrappedInstance) {
                    console.warn('AdvancedExpandTable - No wrapped instance');
                }
                if (this.wrappedInstance.getWrappedInstance) {
                    return this.wrappedInstance.getWrappedInstance();
                }
                return this.wrappedInstance;
            }
        }, {
            key: 'render',
            value: function render() {
                var _props = this.props,
                    columns = _props.columns,
                    SubComponent = _props.SubComponent,
                    onExpandedChange = _props.onExpandedChange,
                    rest = _objectWithoutProperties(_props, ['columns', 'SubComponent', 'onExpandedChange']);

                var wrappedColumns = columnsWithToggle(columns, this.expandFuncs);
                var WrappedSubComponent = subComponentWithToggle(SubComponent, this.expandFuncs);

                return _react2.default.createElement(TableComponent, _extends({}, rest, {
                    columns: wrappedColumns,
                    expanded: this.state.expanded,
                    getTdProps: this.getTdProps,
                    SubComponent: WrappedSubComponent,
                    TdComponent: AdvancedExpandTable.TdComponent
                }));
            }
        }], [{
            key: 'TdComponent',


            // since we pass the expand functions to each Cell,
            // we need to filter it out from being passed as an
            // actual DOM attribute. See getProps in columnsWithToggle above.
            value: function TdComponent(_ref) {
                var toggleRowSubComponent = _ref.toggleRowSubComponent,
                    showRowSubComponent = _ref.showRowSubComponent,
                    hideRowSubComponent = _ref.hideRowSubComponent,
                    rest = _objectWithoutProperties(_ref, ['toggleRowSubComponent', 'showRowSubComponent', 'hideRowSubComponent']);

                return _react2.default.createElement(TableComponent.defaultProps.TdComponent, rest);
            }
        }]);

        return AdvancedExpandTable;
    }(_react.Component), _class.propTypes = {
        columns: _propTypes2.default.array.isRequired,
        SubComponent: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]).isRequired,
        onExpandedChange: _propTypes2.default.func
    }, _class.defaultProps = {
        onExpandedChange: null
    }, _class.DisplayName = 'AdvancedExpandTable', _temp;
};

//exports.advancedExpandTableHOC = advancedExpandTableHOC;

export default advancedExpandTableHOC;