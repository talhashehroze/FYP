import React from 'react';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { CopyBlock, solarizedLight, dracula } from "react-code-blocks";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
const ApiDoc = ({ endpoint, response, description, queryParams }) => {
  return (
      <Paper elevation={3} sx={{ padding: '1rem', marginBottom: '1rem' }}>
         <CopyBlock
            language={'text'}
            text={endpoint}
            showLineNumbers={false}
            theme={dracula}
          wrapLines={true}
          codeBlock
        />
      {/* <Typography variant="h5" component="h2">{endpoint}</Typography> */}
      <Typography sx={{ paddingTop: '3rem',paddingBottom: '3rem', }} variant="body1">{description}</Typography>
        <Typography variant="h4" component="h3">Response:</Typography>
        <SyntaxHighlighter language="json" style={docco}>
      {JSON.stringify(response, null, 2)}
    </SyntaxHighlighter>
     
      {/* <pre>{JSON.stringify(response, null, 2)}</pre> */}
      {queryParams && (
        <div>
          <Typography sx={{ paddingTop: '1rem',paddingBottom: '1rem', }}  variant="h4" component="h3">Query Parameters:</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6" component="h3">Name</Typography></TableCell>
                <TableCell><Typography variant="h6" component="h3">Type</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {queryParams.map(({name, type}) => (
                <TableRow key={name}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Paper>
  );
};

export default ApiDoc;
