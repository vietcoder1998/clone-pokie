import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

export default function DataTable({
  columns,
  rows,
  onRowSelectionModelChange,
  loading,
  name,
}) {
  return (
    <div
      style={{
        height: `calc(100vh - 180px)`,
        maxWidth: "100vw",
        overflow: "auto",
        width: "100%",
      }}
    >
      <DataGrid
        sx={{ width: "100%" }}
        slots={{
          toolbar: GridToolbar,
        }}
        initialState={
          {
            // pagination: {
            //   paginationModel: { page: 0, pageSize: 10 },
            // },
          }
        }
        loading={loading}
        rows={rows}
        columns={columns}
        onRowSelectionModelChange={onRowSelectionModelChange}
        // pageSizeOptions={[10, 15]}
        checkboxSelection
      />
    </div>
  );
}
