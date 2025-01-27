import React, { useState, useEffect } from "react";
import { Paper, Tooltip, Stack } from "@mui/material";

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarFilterButton,
  getGridStringOperators,
} from "@mui/x-data-grid";
import TableLoadingSkeleton from "./components/Skeletons/TableLoadingSkeleton";
const CustomToolbar = ({ setFilterButtonEl }) => (
  <GridToolbarContainer>
    <GridToolbarFilterButton ref={setFilterButtonEl} />
  </GridToolbarContainer>
);

const ProjectTable = () => {
  const [data, setData] = useState([]);
  const rowsPerPage = 5;
  const headerClassName =
    "text-white bg-[#353935] rounded-none hover:bg-[#a7aba8] hover:text-black";
  const filterOperators = getGridStringOperators().filter(
    ({ value }) => value === "contains"
  );

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://440928f8-bcef-4c2e-a004-908a921f086a.mock.pstmn.io/sample-data"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columnsConfig = [
    {
      field: "slNo",
      headerName: "SL No.",
      headerClassName: headerClassName,
      type: "actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title={params.row["s.no"]}>
          <span className="truncate items-center justify-center">
            {params.row["s.no"]}{" "}
          </span>
        </Tooltip>
      ),
    },
    {
      field: "percentage.funded",
      headerName: "Percentage Funded",
      headerClassName: headerClassName,
      type: "string",
      filterOperators,
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <Tooltip title={params.row["percentage.funded"]}>
          <span className="truncate">{params.row["percentage.funded"]}</span>
        </Tooltip>
      ),
    },
    {
      field: "amt.pledged",
      headerName: "Amount Pledged",
      headerClassName: headerClassName,
      type: "string",
      filterOperators,
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <Tooltip title={params.row["amt.pledged"]}>
          <span className="truncate">{params.row["amt.pledged"]}</span>
        </Tooltip>
      ),
    },
  ];
  return (
    <>
      <Stack
        component={Paper}
        elevation={2}
        className="h-full my-10 mx-[20%] bg-slate-300"
      >
        <Stack>
          <DataGrid
            className="m-[2%] "
            rows={data}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: rowsPerPage,
                },
              },
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
            }}
            pageSizeOptions={[5]}
            rowHeight={50}
            getRowId={(row) => row["s.no"]}
            disableColumnSelector
            disableRowSelectionOnClick
            localeText={{ noRowsLabel: "" }}
            slots={{
              toolbar: CustomToolbar,
              loadingOverlay: TableLoadingSkeleton,
            }}
            columns={columnsConfig}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default ProjectTable;
