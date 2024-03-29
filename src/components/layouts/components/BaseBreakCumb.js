import { Breadcrumbs } from "@mui/material";
import Link from 'next/link'

export default function BaseBreakCrumb() {
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ my: 2 }}>
      <Link underline="hover" color="inherit" href="/">
        Home
      </Link>
    </Breadcrumbs>
  );
}
