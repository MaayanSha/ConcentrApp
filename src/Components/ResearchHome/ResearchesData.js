import * as React from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {Box, useTheme} from "@mui/material";
import NewResearchModal from "./NewResearchModal";
import ConfirmRemovalModal from "./ConfirmRemovalModal";


export default function ResearchesData({researches, resetState}) {

    const theme = useTheme();


    const rows = researches.map((research, index) => ({
        id: index + 1,
        research_num:research.id,
        name: research.name,
        description: research.description,
        created_at: research.created_at.slice(0, 10),
    }));


    const columns = [
        { field: 'research_num', headerName: 'Serial', width: 80 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'description', headerName: 'Description', width: 200 },
        { field: 'created_at', headerName: 'Creation Date', width: 150 },
        { field: 'edit', headerName: '', width: 100 ,renderCell: (research) => {return <NewResearchModal
                create={false}
                research={research}
                resetState={resetState}
            />}},
        { field: 'delete', headerName: '', width: 100 , renderCell: (research) => {
                return <ConfirmRemovalModal
                    id={research.id}
                    resetState={resetState}
                />
            }},

    ];
    return (
        <div style={{ height: 300, width: '100%' }}>
            <Box>
            <DataGrid sx={{boxShadow: 4,
                border: 0,
                fontFamily:"karla, sans-sarif",
                fontSize:15,
                borderColor: 'lightgray',
                '& .MuiDataGrid-cell:hover': {
                    color: 'rgb(21, 67, 96)',
                },}} rows={rows} columns={columns} getRowId={(row) => row.id}
                      slots={{ toolbar: GridToolbar }}/>
            </Box>
        </div>
    );
}
