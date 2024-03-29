import { Home, Search } from "@mui/icons-material";
import { Grid, Box } from "@mui/material";
import Image from "next/image";
import Logo from "../../assets/poki-log.png";

export function SearchBox() {
  return (
    <Box sx={{ display: "static", top: 100, width: "100%" }}>
      <Grid
        container
        sx={{
          height: "100%",
          width: "100%",
          backgroundColor: "white",
          borderRadius: "5px",
        }}
      >
        <Grid
          item
          md={10}
          sx={{
            backgroundColor: "white",
            borderRight: "solid gray 1px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src={Logo} width={60} height={28} />
        </Grid>
        <Grid item md={2}>
          <Grid container>
            <Grid
              item
              md={12}
              sx={{ display: "flex", justifyContent: "center", height: "50%" }}
            >
              <Home />
            </Grid>
            <Grid
              item
              md={12}
              sx={{ display: "flex", justifyContent: "center", height: "50%" }}
            >
              <Search />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
