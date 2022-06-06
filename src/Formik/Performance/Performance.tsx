import React from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import "./Performance.css";
import { Box, Grid, TextField } from "@mui/material";
import * as Yup from "yup";

const shapes = {
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  surname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(10, "Too Short!")
    .max(30, "Too Long!")
    .matches(/\d+/, { message: "Password no number" })
    .matches(/[a-z]+/, { message: "Password no lowercase" })
    .matches(/[A-Z]+/, { message: "Password no uppercase" })
    .matches(/[!@#$%^&*()-+]+/, {
      message: "Password no special char",
    })
    .required("Required"),
  age: Yup.number()
    .positive()
    .integer()
    .min(10, "Too yound!")
    .max(100, "Too old!")
    .required("Required"),
};

const defaultFields = [
  {
    id: "name",
    name: "name",
    label: "Name",
    initialValue: "",
  },
  {
    id: "surname",
    name: "surname",
    label: "Surname",
    initialValue: "",
  },
  {
    id: "email",
    name: "email",
    label: "Email Address",
    initialValue: "",
  },
  {
    id: "password",
    name: "password",
    label: "Password",
    initialValue: "",
  },
  {
    id: "age",
    name: "age",
    label: "Age",
    initialValue: "",
  },
];

const fields = [
  ...defaultFields,
  ...defaultFields,
  ...defaultFields,
  ...defaultFields,
  ...defaultFields,
  ...defaultFields,
  ...defaultFields,
  ...defaultFields,
  ...defaultFields,
  ...defaultFields,
  ...defaultFields,
  ...defaultFields,
];

const getInitialValues = (fields: any[]) => {
  const initialValues = {};
  fields.forEach(({ name, initialValue }, index) => {
    // @ts-ignore
    initialValues[`${name}-${index}`] = initialValue;
  });
  return initialValues;
};

const getSchema = (fields: any[]) => {
  let schema = {};
  fields.forEach(({ name }, index) => {
    // @ts-ignore
    schema = {
      ...schema,
      // @ts-ignore
      [`${name}-${index}`]: shapes[name],
    };
  });
  return Yup.object().shape(schema);
};

const SignupForm = () => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: getInitialValues(fields),
    validationSchema: getSchema(fields),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container alignItems="start" direction="row" spacing={2}>
        {fields.map(({ name, id, label }, index) => {
          return (
            <Grid item xs={6} sm={4} md={3}>
              <Box display="flex" alignItems="start" flexDirection="column">
                <TextField
                  id={`${id}-${index}`}
                  name={`${name}-${index}`}
                  label={`${label}-${index}`}
                  onChange={formik.handleChange}
                  // @ts-ignore
                  value={formik.values[`${name}-${index}`]}
                  // @ts-ignore
                  {...(formik.errors[`${name}-${index}`] && {
                    error: true,
                    // @ts-ignore
                    helperText: formik.errors[`${name}-${index}`],
                  })}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <Grid container alignItems="start" direction="row" spacing={2}>
        <Grid item mt={2}>

        <Button variant="contained" type="submit">
          Submit
        </Button>
        </Grid>
      </Grid>
    </form>
  );
};

function Performance() {
  return (
    <div className="App">
      <header className="App-header">Formik ADR</header>
      <body>
        <SignupForm />
      </body>
    </div>
  );
}

export default Performance;
