import React from "react";
import PropTypes from "prop-types";
import DefaultTheme from "./themes/bootstrap3";
import { reduxForm } from "redux-form";
import renderFields from "./renderFields";
import renderField from "./renderField";
import processSubmitErrors from "./processSubmitErrors";
import buildSyncValidation from "./buildSyncValidation";
import { setError } from "./buildSyncValidation";
import compileSchema from "./compileSchema";

const BaseForm = props => {
  const { schema, handleSubmit, theme, error, submitting, context } = props;
  return (
    <form onSubmit={handleSubmit}>
      {renderField(schema, null, theme || DefaultTheme, "", context)}
      <div>{error && <strong>{error}</strong>}</div>
      <button className="btn btn-primary" type="submit" disabled={submitting}>
        Submit
      </button>
    </form>
  );
};

const Liform = props => {
  props.schema.showLabel = false;
  const schema = compileSchema(props.schema);
  const formName = props.formKey || props.schema.title || "formhahahah";
  const validator = props.syncValidation || buildSyncValidation(schema, props.ajv);
  const FinalForm = reduxForm({
    form: formName,
    validate: validator,
    initialValues: props.initialValues,
    context: { ...props.context, formName },
    ...props.reduxFormOptions
  })(props.baseForm || BaseForm);

  return (
    <FinalForm
      renderFields={renderField.bind(this)}
      {...props}
      schema={schema}
    />
  );
};

Liform.propTypes = {
  ajv: PropTypes.object,
  baseForm: PropTypes.func,
  context: PropTypes.object,
  formKey: PropTypes.string,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  reduxFormOptions: PropTypes.object,
  schema: PropTypes.object,
  syncValidation: PropTypes.func,
};

export default Liform;

export {
  renderFields,
  renderField,
  processSubmitErrors,
  DefaultTheme,
  setError,
  buildSyncValidation,
  compileSchema,
};
