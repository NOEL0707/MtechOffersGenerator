import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import {serverLink} from "../../serverLink"
import Loader from '../Loader';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
function CandidateDisplay(props) {
    const [isLoading,setIsLoading]=React.useState(false);
    const [data,setData]=React.useState(null);
    const {coapid}=useParams()
    const [status, setStatus] = React.useState('');
    const row1=['FullName','ApplicationNumber','COAP']
    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    useEffect(() => {
        setIsLoading(true);
        axios
        .get(`${serverLink}/api/search/getinfo/${coapid}`, {
          withCredentials: false,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        })
        .then((res) => {
            setData(res.data.result);
            console.log(res.data.result);
            setIsLoading(false);
        }).catch((err)=>{
          console.log(err);
          alert(err.message);
          setIsLoading(false);
        });
    },[]);
    const handleUpdate=async ()=>{
        try {
            
            let res=await axios.post(`${serverLink}/api/candidate/manualUpdate`,{coap:coapid},{
                withCredentials: false,
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Credentials": true,
                },
              })
              window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='w-full'>
            {!isLoading && 
            <div className='flex flex-col w-[90%] justify-center items-center mt-10 m-auto'>
                <div className='w-full  bg-[#1B3058] text-white h-14 flex justify-center items-center text-2xl'>
                    Candidate Details
                </div>
                <div className='w-full flex flex-col'>
                    <div className='w-full flex-col'>
                        <div className='w-full flex justify-center'>
                        {  data!=null && row1.map((key)=>{
                            // console.log("x",key)
                            return(
                                <div className='flex flex-col w-[350px] justify-center items-center p-2 h-fit border-grey-200 border-[1px] box-border' key={key}>
                                    <p className=' text-2xl text-[#FFCB00]'>{key}</p>
                                    <p className=' text-black-400 overflow-clip text-xl'> {data[0][key]===null||data[0][key]===''?"NULL":data[0][key]}</p>
                                </div>
                            )

                        })}
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className='flex flex-wrap max-w-full h-fit shadow-lg  p-4 justify-center'>
                        {  data!=null && Object.keys(data[0]).map((key)=>{
                            // console.log("x",key)
                            if(!row1.includes(key)){
                                return(
                                    <div className='flex flex-col w-[200px] p-2 h-fit border-grey-200 border-[1px] box-border overflow-clip' key={key}>
                                        <p className='text-gray-400 text-lg '>{key}</p>
                                        <p className=' text-black-400 overflow-clip'> {data[0][key]===null||data[0][key]===''?"NULL":data[0][key]}</p>
                                    </div>
                                )
                            }
                            else{
                                return <div></div>;
                            }

                        })}
                    </div>
                </div>
                {data!=null && (data[0]['Accepted']==='Y' ||data[0]['Accepted']==='R' )&& 
                <div className='flex w-[50%] justify-center items-center gap-10  mt-10'>
                    <div className='flex w-fit justify-center items-center '>
                        <p className='text-2xl'>Update Status</p>
                    </div>
                    <Select
                    labelId="status"
                    id="status"
                    value={status}
                    label="status"
                    onChange={handleChange}
                    className='w-[400px]'
                  >
                    <MenuItem value={'N'}>Reject</MenuItem>
                  </Select>
                  <Button variant='contained' onClick={handleUpdate}>Update</Button>
                </div>}
            </div>}
            {isLoading && <Loader/> }
        </div>

    );
}

export default CandidateDisplay;