import * as React from "react";
import Box from "@mui/material/Box";
import { makeStyles, TextField } from "@material-ui/core";
import Image from "next/image";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { isEmailValid } from "../../helpers/validation";
import { useRouter } from "next/router";
import Link from "next/Link";

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
    maxHeight: "480px",
    width: "100vw",
    maxWidth: "600px",
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
    height: "33%",
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
    marginBottom: theme.spacing(2),
  },
  form: {
    width: "100%",
    height: "54%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputBox: {
    width: "100%",
    height: "75%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const ForgetPassword = () => {
  const router = useRouter();
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: "",
  });
  const [valuesError, setValuesErrors] = React.useState({
    email: null,
    emailMessage: "",
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
    setValues({ ...values, [props]: event.target.value });
  };

  const submit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if (!isEmailValid(values.email)) {
        setValuesErrors((valuesError) => ({
          ...valuesError,
          email: true,
          emailMessage: "Please Enter a value Email",
        }));
        return;
      }

      setTimeout(() => {
        setIsLoading(false);
        router.push("/otp");
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
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  width: "100%",
                  alignItems: "center",
                  color: "blue",
                  margin: "4px",
                }}
              >
                <Link href="/login">Login?</Link>
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
              Get Otp
            </LoadingButton>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
export default ForgetPassword;
