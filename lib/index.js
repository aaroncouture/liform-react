"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setError = exports.DefaultTheme = exports.processSubmitErrors = exports.renderField = exports.renderFields = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _bootstrap = require("./themes/bootstrap3");

var _bootstrap2 = _interopRequireDefault(_bootstrap);

var _reduxForm = require("redux-form");

var _renderFields = require("./renderFields");

var _renderFields2 = _interopRequireDefault(_renderFields);

var _renderField = require("./renderField");

var _renderField2 = _interopRequireDefault(_renderField);

var _processSubmitErrors = require("./processSubmitErrors");

var _processSubmitErrors2 = _interopRequireDefault(_processSubmitErrors);

var _buildSyncValidation = require("./buildSyncValidation");

var _buildSyncValidation2 = _interopRequireDefault(_buildSyncValidation);

var _compileSchema = require("./compileSchema");

var _compileSchema2 = _interopRequireDefault(_compileSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseForm = function BaseForm(props) {
  var schema = props.schema,
      handleSubmit = props.handleSubmit,
      theme = props.theme,
      error = props.error,
      submitting = props.submitting,
      context = props.context;

  return _react2.default.createElement(
    "form",
    { onSubmit: handleSubmit },
    (0, _renderField2.default)(schema, null, theme || _bootstrap2.default, "", context),
    _react2.default.createElement(
      "div",
      null,
      error && _react2.default.createElement(
        "strong",
        null,
        error
      )
    ),
    _react2.default.createElement(
      "button",
      { className: "btn btn-primary", type: "submit", disabled: submitting },
      "Submit"
    )
  );
};

var Liform = function Liform(props) {
  props.schema.showLabel = false;
  var schema = (0, _compileSchema2.default)(props.schema);
  var formName = props.formKey || props.schema.title || "formhahaha";
  var FinalForm = (0, _reduxForm.reduxForm)(_extends({
    form: formName,
    validate: props.syncValidation || (0, _buildSyncValidation2.default)(schema, props.ajv),
    initialValues: props.initialValues,
    context: _extends({}, props.context, { formName: formName })
  }, props.reduxFormOptions))(props.baseForm || BaseForm);
  return _react2.default.createElement(FinalForm, _extends({
    renderFields: _renderField2.default.bind(undefined)
  }, props, {
    schema: schema
  }));
};

Liform.propTypes = {
  ajv: _propTypes2.default.object,
  baseForm: _propTypes2.default.func,
  context: _propTypes2.default.object,
  formKey: _propTypes2.default.string,
  initialValues: _propTypes2.default.object,
  onSubmit: _propTypes2.default.func,
  reduxFormOptions: _propTypes2.default.object,
  schema: _propTypes2.default.object,
  syncValidation: _propTypes2.default.func
};

exports.default = Liform;
exports.renderFields = _renderFields2.default;
exports.renderField = _renderField2.default;
exports.processSubmitErrors = _processSubmitErrors2.default;
exports.DefaultTheme = _bootstrap2.default;
exports.setError = _buildSyncValidation.setError;