import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import DefaultTheme from './themes/bootstrap3';

class Liform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {theme: props.theme || DefaultTheme}
    }

    renderFields() {
        return _.map(this.props.schema.properties, (schema, fieldName) => {
            return React.createElement(this.state.theme[schema.type], {key: {fieldName}, schema});
        });
    }

    render() {
        return (
            <div>
                {this.renderFields()}
            </div>
        );
    }
}

Liform.propTypes = { schema: PropTypes.object.isRequired };

export default Liform;