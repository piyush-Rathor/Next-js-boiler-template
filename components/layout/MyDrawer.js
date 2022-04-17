import {
  List,
  ListItem,
  ListItemIcon,
  Divider,
  IconButton,
  ListItemText,
  Collapse,
  makeStyles,
} from "@material-ui/core";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons";
import Drawer from "@material-ui/core/Drawer";
import Image from "next/image";
import { useState } from "react";
import MailIcon from "@material-ui/icons/Mail";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
  },
  drawerHide: {
    width: 0,
  },
  drawerPaper: {
    backgroundColor: theme.palette.background.paper,
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 1),
    paddingLeft: theme.spacing(3),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
}));

export default function MyDrawer({ isSidebarOpen, handleToggleSidebar }) {
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const classes = useStyles();
  return (
    <Drawer
      className={clsx(classes.drawer, { [classes.drawerHide]: !isSidebarOpen })}
      variant="persistent"
      anchor="left"
      open={isSidebarOpen}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.drawerHeader}>
        <Image
          src="/CardSe-Logo.png"
          alt="Card Se"
          layout="intrinsic"
          width="100%"
          height="35%"
        />
        <IconButton onClick={() => handleToggleSidebar(false)}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem button onClick={() => setIsCollapsed(!isCollapsed)}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Explore" />
        {isCollapsed ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isCollapsed} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button style={{ paddingLeft: "40px" }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="A" />
          </ListItem>
          <ListItem button style={{ paddingLeft: "40px" }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="B" />
          </ListItem>
          <ListItem button style={{ paddingLeft: "40px" }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="C" />
          </ListItem>
        </List>
      </Collapse>
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
