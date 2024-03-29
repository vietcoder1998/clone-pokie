import { Box, Grid, Typography } from "@mui/material";
import ListUI from "../../ListUI";
import SameCareerItem from "./SameCareerItem";

export default function SameCareer(props) {
  const { anotherCareerList, t } = props;

  return (
    <Box sx={{ my: 4 }}>
      <Box>
        <Typography component={"p"} sx={{fontSize: '1.1rem'}}>
          <b>{t("pages.career.anotherCareer")}</b>
        </Typography>
        <Box sx={{ mt: 2 }}>
          <ListUI hide={!anotherCareerList?.length}>
            <Grid container columnSpacing={2}>
              {anotherCareerList?.map((item, index) => (
                <Grid item md={12} key={['same_item', index].join('_')}>
                  <SameCareerItem {...item} />
                </Grid>
              ))}
            </Grid>
          </ListUI>
        </Box>
      </Box>
    </Box>
  );
}
