import MyAppBar from "./MyAppBar";
import MyDrawer from "./MyDrawer";
import clsx from "clsx";
import { Paper, useMediaQuery } from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";
import {
  makeStyles,
  ThemeProvider,
  createStyles,
  useTheme,
  createTheme,
} from "@material-ui/core/styles";
import { red, blue, blueGrey, pink } from "@material-ui/core/colors";
const drawerWidth = 240;

const Layout = (props) => {
  const [prefersDarkMode, setDark] = React.useState(false);
  const themeColor = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          background: {
            default: prefersDarkMode ? "#212121" : "#f2f2f2",
            paper: prefersDarkMode ? "#333333" : "#fff",
          },
          primary: {
            main: prefersDarkMode ? pink[700] : red[500],
          },
          // primary: blue,
          secondary: {
            main: prefersDarkMode ? blueGrey[900] : "#fff",
          },
          badge: blue,
        },
      }),
    [prefersDarkMode]
  );

  const useStyles = makeStyles((theme) =>
    createStyles({
      drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background,
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      contentShift: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
      },
    })
  );

  const classes = useStyles();
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleTheme = useCallback(async () => {
    try {
      setDark(!prefersDarkMode);
    } catch (err) {
      console.log(`SomeThing Went Wrong`, err);
    }
  }, [prefersDarkMode]);

  const [isSidebarOpen, setSidebarOpen] = useState(!smallScreen);

  useEffect(() => {
    setSidebarOpen(!smallScreen);
  }, [smallScreen]);

  function handleToggleSidebar(open) {
    setSidebarOpen(open);
  }

  return (
    <ThemeProvider theme={themeColor}>
      <MyDrawer
        isSidebarOpen={isSidebarOpen}
        handleToggleSidebar={handleToggleSidebar}
      />
      <MyAppBar
        toggleTheme={toggleTheme}
        isDark={prefersDarkMode}
        isSidebarOpen={isSidebarOpen}
        handleToggleSidebar={handleToggleSidebar}
      />
      <Paper
        className={clsx(classes.content, {
          [classes.contentShift]: isSidebarOpen && !smallScreen,
        })}
        paper
      >
        <div className={classes.drawerHeader} />
        {props.children}
      </Paper>
    </ThemeProvider>
  );
};

export default Layout;
