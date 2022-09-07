import React from "react";
import Button from "@mui/material/Button";
import { Box, Grid, TextField } from "@mui/material";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .min(2, "Too Short!")
    .max(50, "Too Long!"),
  surname: Yup.string()
    .required("Required")
    .min(2, "Too Short!")
    .max(50, "Too Long!"),
  email: Yup.string().required("Required").email("Invalid email"),
  password: Yup.string()
    .required("Required")
    .min(10, "Too Short!")
    .max(30, "Too Long!")
    .matches(/\d+/, { message: "Password no number" })
    .matches(/[a-z]+/, { message: "Password no lowercase" })
    .matches(/[A-Z]+/, { message: "Password no uppercase" })
    .matches(/[!@#$%^&*()-+]+/, {
      message: "Password no special char",
    }),
  age: Yup.number()
    .required("Required")
    .positive()
    .integer()
    .min(10, "Too yound!")
    .max(100, "Too old!"),
});

type FormValues = {
  email: string;
  name: string;
  surname: string;
  password: string;
  age?: string;
};

const SignupForm = () => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: "",
      name: "",
      surname: "",
      password: "",
      age: undefined,
    },
    resolver: yupResolver(SignupSchema),
  });

  const onSubmit = (values: FormValues) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container alignItems="start" direction="row" spacing={2}>
        <Grid item xs={6} sm={4} md={3}>
          <Box display="flex" alignItems="start" flexDirection="column">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Name"
                  {...field}
                  {...(error && {
                    error: true,
                    helperText: error.message,
                  })}
                />
              )}
            />
          </Box>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Box display="flex" alignItems="start" flexDirection="column">
            <Controller
              name="surname"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Surname"
                  {...field}
                  {...(error && {
                    error: true,
                    helperText: error.message,
                  })}
                />
              )}
            />
          </Box>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Box display="flex" alignItems="start" flexDirection="column">
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Email Address"
                  {...field}
                  {...(error && {
                    error: true,
                    helperText: error.message,
                  })}
                />
              )}
            />
          </Box>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Box display="flex" alignItems="start" flexDirection="column">
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Password"
                  type="password"
                  {...field}
                  {...(error && {
                    error: true,
                    helperText: error.message,
                  })}
                />
              )}
            />
          </Box>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Box display="flex" alignItems="start" flexDirection="column">
            <Controller
              name="age"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Age"
                  {...field}
                  {...(error && {
                    error: true,
                    helperText: error.message,
                  })}
                />
              )}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container alignItems="start" direction="row" spacing={2} mt={2}>
        <Grid item>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

function RHFMaterial() {
  return (
    <div className="App">
      <header className="App-header">RHF ADR: Material</header>
      <SignupForm />
    </div>
  );
}

export default RHFMaterial;