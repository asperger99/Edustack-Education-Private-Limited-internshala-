import React from 'react'
import { Button} from '@material-ui/core';
import {Link} from "react-router-dom"
import "./Page3.css"
import { UseStateValue } from "./StateProvider";
import{auth} from "./firebase"
function Page3() {
    const [{ user,data,globalChapter,updatedData }, dispatch] = UseStateValue();


    const objectToCsv = (data) => {
        const csvRows = []

        const headers = Object.keys(data[0])
        csvRows.push(headers.join(','))
        for(const row of data){
            const values = headers.map(header => {
                const escaped = (''+row[header]).replace(/"/g, '\\"')
                return `"${escaped}`
            });
            csvRows.push(values.join(','));
        }
        return csvRows.join('\n')
    }


    const download = function(Data,format) {
        const blob = new Blob([Data], { type: 'text/csv/json'})
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a')
        a.setAttribute('hidden', '')
        a.setAttribute('href', url)
        a.setAttribute('download', `file.${format}`)
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }
    const getCSV = async function(){
        const csvData= objectToCsv(updatedData);
        console.log(csvData);
        download(csvData,'csv');
    }

    const objectToJson = (data) => {
      return JSON.stringify(data);
    }

    const getJSON = async function(){
        const jsonData = objectToJson(updatedData);
        console.log(jsonData);
       download(jsonData,'json');
    }
    



    return (
        <>
         <div className="page3">
        <div className="page3__heading">
        <h1>{user?.displayName}</h1>
        </div>
       <div className="page3__buttons">
            <Button className="page3__button" color="primary" variant="contained" onClick={getCSV}>Download CSV</Button>
             <Button className="page3__button" color="primary" variant="contained" onClick={getJSON}>Download JSON</Button>
             <Link style={{textDecoration:"none"}} to="/">
             <Button className="page3__button" color="primary" variant="outlined" onClick={e => {
                 auth.signOut()
                 dispatch({
                  type: "UPDATE_USER",
                  item: null,
                  });
                 }}>Sign out</Button>
             </Link>
       </div>

             
             
        </div>
        </>
    )
}

export default Page3
