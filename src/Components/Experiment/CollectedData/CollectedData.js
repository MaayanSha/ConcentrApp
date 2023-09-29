import * as React from 'react';
import {DataGrid, GridToolbar} from '@mui/x-data-grid';
import {Box, useTheme} from "@mui/material";


export default function CollectedData({data}) {


    const rows = data.map((item, index) => ({
        id: index + 1,
        participant:item.participant,
        context:item.context,
        question:item.question,
        answer:item.answer,
    }));


    const columns = [
        { field: 'id', headerName: 'Serial', width: 80 },
        { field: 'participant', headerName: 'Participant Code', width: 150 },
        { field: 'context', headerName: 'Question Tree', width: 130 },
        { field: 'question', headerName: 'Question', width: 350 },
        { field: 'answer', headerName: 'Answer', width: 150 },

    ];
    return (
        <div style={{ height: "auto", width: "auto", display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
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
