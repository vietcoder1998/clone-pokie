import { FormLabel, Grid } from "@mui/material";
import BaseInput from "../../../BaseInput";

export default function InputWithTitle(props) {
  return (
    <Grid container {...props?.gridProps}>
      <Grid item md={4}>
        <FormLabel
          for={props.inputProps.id}
          component="span"
          sx={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {props?.title}
        </FormLabel>
      </Grid>
      <Grid item md={8}>
        <BaseInput {...props.inputProps} fullWidth onChange={props.onChange} />
      </Grid>
    </Grid>
  );
}
