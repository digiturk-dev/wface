import * as React from 'react';
import { Field, FastField } from 'formik';

const WField = props => {
  const Component = subProps => (
    <div style={{ marginTop: 5, marginBottom: 5 }} {...subProps}>
      {props.component(subProps)}
    </div>
  )

  if (props.useFastField === false) {
    return (
      <Field
        {...props}
        render={Component}
      />
    );
  }
  else {
    return (
      <FastField
        {...props}
        render={Component}
      />
    );
  }


}

export default WField;