import React, {useState } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { serverLink } from '../../serverLink';
import DownloadIcon from '@mui/icons-material/Download';
import axios from "axios";
import MenuItem from '@mui/material/MenuItem';
import GetAppIcon from '@mui/icons-material/GetApp';
import {TextField} from '@mui/material';
import fileDownload from 'js-file-download';
import { Button } from '@mui/material';
import Loader from "../Loader"
function RoundUpdateFiles(props) {
    const [isLoading,setisLoading]=useState(false);
    const [file,setFile]=useState(null);
    const [fileExists,setFileExists]=useState(props.isPresent);
    const [coap,setCoap]=useState("");
    const [candidateDecision,setCandidateDecision]=useState("");
    const [columnNames,setColumnNames]=useState(null);
    // const [loading,setIsLoading]=useState(false);    
    const handleFileSubmit=(e)=>{
        const file = e.target.files[0];
        if(file.name.split('.').pop() !== "xlsx"){
            alert("Invalid file type, please upload an xlsx file");
            return;
        }
        setFile(e.target.files[0]);

        // setFileExists(true);
        console.log(e.target.files[0]);
    }
    const getColumnNames = () => {
        setisLoading(true);
        const formData = new FormData();
        formData.append("name", file.name);
        formData.append("file", file);
        axios
          .post(`${serverLink}/api/rounds/getColumnNames`, formData)
          .then((res) => {
            console.log(res.data.result);
            setColumnNames(res.data.result);
            setisLoading(false);
          })
          .catch((err) => alert(err));
    };
    const uploadFile = () => {
        setisLoading(true);
        const formData = new FormData();
        formData.append("name", file.name);
        formData.append("file", file);
        formData.append("coap", coap);
        formData.append("candidateDecision", candidateDecision);
        console.log(file);
        console.log("inside upload");

        axios
          .post(`${serverLink}/api/rounds/putFile/${props.fileName}/${props.roundNumber}`,formData)
          .then((res) => {
            window.location.reload();
            alert("File Upload success");
            setFileExists(true);
            setisLoading(false);
          })
          .catch((err) => alert(err));
    };
    const handleDownload=()=>{
        axios
        .get(`${serverLink}/api/rounds/getFile/${props.fileName}/${props.roundNumber}`, {
            responseType: 'blob',
          },{
          withCredentials: false,
          headers: {
            responseType: 'blob',
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        })
        .then((res) => {
            console.log(res);
            
            fileDownload(res.data, `${props.fileName}.xlsx`)
        }).catch((err)=>{
          console.log(err);
        });
    } 
    return (
        <div className='flex flex-col max-w-[800px] min-w-[95%]  rounded-xl border-2'>
            <div className='flex justify-center items-center w-full h-11 bg-zinc-100 rounded-t-xl '>
                <p className='text-xl text-black'>{props.displayFileName}</p>
            </div>
            <div className='flex justify-center h-[fit-content]  rounded-b-xl items-center gap-2 p-2 box-border'>
            {!fileExists &&
                            
                <Button variant="contained" component="label" startIcon={<UploadFileIcon/>} className='w-[fit-content] p-[2px]' onChange={handleFileSubmit}>
                    <input type="file" hidden />
                    Choose File
                </Button>
            }
                {!fileExists && file===null &&<p className='text-xl text-grey'>No Files Uploaded</p>}
                {!fileExists && file!==null &&
                    <div className='flex justify-center items-center gap-7'>
                        <div className='flex  justify-center items-center shadow p-2 w-[300px] min-w-[200px] box-border h-15 '>
                            <p className='text-lg text-black truncate w-[fit-content]'><b className='text-zinc-500'>File Name : </b> {file.name}</p>
                        </div>
                        <div className='flex  justify-center items-center shadow p-2 w-[300px] box-border min-w-[200px] h-15'>
                            <div className='text-lg text-black truncate w-[fit-content]' ><b className='text-zinc-500'>Type : </b>{(file.type)}</div>
                        </div>
                    </div>
                }
                {fileExists &&
                    <div className='flex w-full justify-center items-center'>
                        <p className='text-xl w-[80%]'>File Has Been Uploaded</p>
                        <Button variant='contained' startIcon={<DownloadIcon/>} style={{margin:"auto",marginBottom:"5px"}} onClick={handleDownload}>Download</Button>
                    </div>
                }
            </div>
            {isLoading && <Loader></Loader>}
            {columnNames!=null && !isLoading &&
                <div className='flex justify-center flex-col items center w-full'>
                    <div className='w-full flex justify-center items-center'>
                        <p className='text-xl text-gray-400'>Please Match The Columns</p>
                    </div>
                    <div className='w-full flex justify-center items-center p-4 box-border gap-10'>
                        <div className='w-[300px] flex flex-col justify-center rounded-md p-2 shadow-md gap-3'>
                            <p className='text-md text-gray-400'>COAP Reg Id</p>
                            <TextField
                                select
                                value={coap}
                                label="COAP Reg Id"
                                onChange={(e)=>{
                                    setCoap(e.target.value)
                                }}
                                className='w-[100%]'
                            >
                                {columnNames!=null &&  columnNames.map((label,index)=>{
                                        return (
                                            <MenuItem key = {label} value={label}>{label}</MenuItem>
                                        )
                                    })}
                                <MenuItem key = {-1} value={""}>{""}</MenuItem>
                            </TextField>
                        </div>
                        <div className='w-[300px] flex flex-col justify-center rounded-md p-2 shadow-md gap-3'>
                            <p className='text-md text-gray-400'>{props.fileName==="IITGOfferedButNotInterested"?"Other Institute Decision":"Applicant Decision"}</p>
                            <TextField
                                select
                                value={candidateDecision}
                                label={props.fileName==="IITGOfferedButNotInterested"?"Other Institute Decision":"Applicant Decision"}
                                onChange={(e)=>{
                                    setCandidateDecision(e.target.value)
                                }}
                                className='w-[100%]'
                            >
                                {columnNames!=null &&  columnNames.map((label,index)=>{
                                        return (
                                            <MenuItem key = {label} value={label}>{label}</MenuItem>
                                        )
                                    })}
                                <MenuItem key = {-1} value={""}>{""}</MenuItem>

                            </TextField>
                        </div>

                    </div>
                </div>
            
            }
            {!fileExists && file!=null && columnNames==null &&  <Button variant='contained' startIcon={<GetAppIcon/>} style={{margin:"auto",marginBottom:"5px"}} onClick={getColumnNames}>get Column Names</Button>}
            {coap!=="" && candidateDecision!=="" && !isLoading &&
                <Button variant='contained' startIcon={<FileUploadIcon/>} style={{margin:"auto",marginBottom:"5px"}} onClick={uploadFile}>Update Decisions</Button>
            }
        
        </div>
    );
}

export default RoundUpdateFiles;
// <img src={downloadImage} alt="Not Found" style={{width:"150px",height:"75px"}}/>
            // {fileExists && <Button variant='contained' startIcon={<DownloadIcon/>} style={{margin:"auto",marginBottom:"5px"}} onClick={handleDownload}>Download the Uploaded File</Button>}
