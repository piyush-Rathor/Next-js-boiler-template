import * as React from "react";
import Box from "@mui/material/Box";
import { makeStyles, Typography, TextField } from "@material-ui/core";
import Image from "next/image";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { isEmailValid, isValidPassword } from "../../helpers/validation";
import { FormHelperText } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/Link";
import { useDispatch } from "react-redux";
import { postEmailSignUp } from "../../store/auth/authActionCreator";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  upperBox: {
    height: "100vh",
    maxHeight: "550px",
    width: "100vw",
    maxWidth: "650px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #000",
    borderRadius: 8,
    paddingTop: theme.spacing(2),
  },
  lowerBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "70%",
    width: "93%",
    justifyContent: "space-around",
  },
  avatarBox: {
    height: "30%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "93%",
  },
  avatar: {
    // margin: theme.spacing(1),
  },
  textField: {
    width: "100%",
    marginBottom: theme.spacing(3),
  },
  form: {
    width: "100%",
    height: "85%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor:"#123"
  },
  inputBox: {
    width: "100%",
    height: "75%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [valuesError, setValuesErrors] = React.useState({
    email: null,
    emailMessage: "",
    password: null,
    passwordMessage: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const handleChange = (props) => (event) => {
    if (props.toString() === "email") {
      if (!isEmailValid(event.target.value)) {
        setValuesErrors((valuesError) => ({
          ...valuesError,
          email: true,
          emailMessage: "Please Enter a value Email",
        }));
      } else {
        setValuesErrors((valuesError) => ({
          ...valuesError,
          email: null,
          emailMessage: "",
        }));
      }
    }
    if (props.toString() === "password") {
      if (!isValidPassword(event.target.value)) {
        setValuesErrors((valuesError) => ({
          ...valuesError,
          password: true,
          passwordMessage:
            "Please Enter a valid Password,Must Contain 1 uppercase letter,1 lowercase letter,1 number,1 special character,8-20 characters,Must not start or end with a special character",
        }));
      } else {
        setValuesErrors((valuesError) => ({
          ...valuesError,
          password: null,
          passwordMessage: "",
        }));
      }
    }
    setValues({ ...values, [props]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (!isEmailValid(values.email)) {
        setValuesErrors((valuesError) => ({
          ...valuesError,
          email: true,
          emailMessage: "Please Enter a value Email",
        }));
      }
      if (!isValidPassword(values.password)) {
        setValuesErrors((valuesError) => ({
          ...valuesError,
          password: true,
          passwordMessage:
            "Please Enter a valid Password,Must Contain 1 uppercase letter,1 lowercase letter,1 number,1 special character,8-20 characters,Must not start or end with a special character",
        }));
      }
      if (!isEmailValid(values.email) || !isValidPassword(values.password)) {
        return;
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    } catch (error) {}
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("This is Workingh");
    setIsLoading(true);
    try {
      if (!isEmailValid(values.email)) {
        setValuesErrors((valuesError) => ({
          ...valuesError,
          email: true,
          emailMessage: "Please Enter a value Email",
        }));
      }
      if (!isValidPassword(values.password)) {
        setValuesErrors((valuesError) => ({
          ...valuesError,
          password: true,
          passwordMessage:
            "Please Enter a valid Password,Must Contain 1 uppercase letter,1 lowercase letter,1 number,1 special character,8-20 characters,Must not start or end with a special character",
        }));
      }
      if (!isEmailValid(values.email) || !isValidPassword(values.password)) {
        setIsLoading(false);
        return;
      }
      dispatch(postEmailSignUp({ email: values.email, isLogin: true }));
      setTimeout(() => {
        router.push("/");
        setIsLoading(false);
      }, 1500);
    } catch (error) {}
  };
  return (
    <Box className={classes.paper}>
      <Box className={classes.upperBox}>
        <Box className={classes.avatarBox}>
          <Image
            src="/CardSe-Logo.png"
            alt="Card Se Lobo"
            width="170%"
            height="60%"
            className={classes.avatar}
          />
        </Box>
        <Box className={classes.lowerBox}>
          <form className={classes.form} onSubmit={submit}>
            <Box className={classes.inputBox}>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                className={classes.textField}
                onChange={handleChange("email")}
                disabled={isLoading}
                error={valuesError?.email}
                helperText={valuesError?.email && valuesError?.emailMessage}
              />
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  className={classes.textField}
                  disabled={isLoading}
                  error={valuesError?.password}
                  style={{ marginBottom: 0 }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                <FormHelperText
                  id="outlined-adornment-password"
                  error={valuesError?.password}
                  model=".email"
                  show="touched"
                  messages={{
                    required: "Email ID is required.\n",
                    validEmail: "Invalid Email Address",
                  }}
                >
                  {valuesError.password && valuesError.passwordMessage}
                </FormHelperText>
              </FormControl>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "100%",
                  alignItems: "center",
                  color: "blue",
                  margin: "4px",
                  marginTop: 10,
                }}
              >
                <Link href="/forgetpassword">Forget Password?</Link>
              </Box>
            </Box>

            <LoadingButton
              loading={isLoading}
              loadingPosition="start"
              type="submit"
              startIcon={<SaveIcon />}
              variant="outlined"
              color="error"
              size="large"
              style={{ width: "100%" }}
            >
              Login !
            </LoadingButton>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
export default Login;
