import styles from "../styles/Home.module.css";
import { Grid } from "@material-ui/core";
import Column from "../components/Charts/Column";
import AnimatedChart from "../components/Charts/Animated";

export default function Home() {
  return (
    <Grid container spacing={3}>
      <Grid item lg={4} md={6} xs={12} sm={12}>
        <Column />
      </Grid>
      <Grid item lg={4} md={6} xs={12} sm={12}>
        <AnimatedChart />
      </Grid>
      <Grid item lg={4} md={6} xs={12} sm={12}>
        <Column />
      </Grid>
    </Grid>
  );
}
