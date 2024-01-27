

const express=require('express');
const os= require('os')
const si = require('systeminformation');
const port =3000;
const app= express();

function memuse(){
    const totalmem= ((os.totalmem())/1024/1024)
    const freeme=((os.freemem())/1024/1024)
    const usedmem=(totalmem-freeme).toFixed(1)
    return {usedmemeory:usedmem,free:freeme.toFixed(1),tot:totalmem.toFixed(1)}
}
function cpuusage(){
    const x=os.cpus();
    total=0
    for(i=0;i<x.length;i++){
        
        const core=x[i].times
        const totaltime=core.idle+core.irq+core.user+core.sys+core.nice;
        
        const usage = (100-((core.idle/totaltime)*100))
        total=total+usage
    }
return {totalusage:total.toFixed(1)}
}


// Function to get network usage information
async function getNetworkUsage2() {
  try {
    const networkStats = await si.networkStats();
    console.log('Network Usage Information:');
    console.log(networkStats);
    let timetransfered=networkStats[0].tx_sec
    let timerecieced=networkStats[0].rx_sec
    let transferedmegaby=((networkStats[0].tx_bytes)/(1024*1024))
    let recivedmegaby= ((networkStats[0].rx_bytes)/(1024*1024))
    let tranfermbpersec=(transferedmegaby/timetransfered).toFixed(2)
    let recievedmbpersec=(recivedmegaby/timerecieced).toFixed(2)
console.log(tranfermbpersec,recievedmbpersec)

return {x:tranfermbpersec,y:recievedmbpersec}
  } catch (error) {
    console.error('Error fetching network usage information:', error);
  }
}
async function getNetworkUsage() {
    try {
      // Get network stats at the start
      const startNetworkStats = await si.networkStats();
  
      // Wait for a specific time interval (e.g., 1 second)
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      // Get network stats again after the time interval
      const endNetworkStats = await si.networkStats();
  
      // Calculate the rate of data transfer in bytes per second
      const bytesTransmitted = endNetworkStats[0].tx_bytes - startNetworkStats[0].tx_bytes;
      const bytesReceived = endNetworkStats[0].rx_bytes - startNetworkStats[0].rx_bytes;
  
      // Convert bytes to megabytes
      const megabytesTransmitted = bytesTransmitted / (1024 * 1024);
      const megabytesReceived = bytesReceived / (1024 * 1024);
  
      // Calculate the rate in MB/s
      const mbpsTransmitted = megabytesTransmitted / 1; // 1 second interval
      const mbpsReceived = megabytesReceived / 1; // 1 second interval
  
      console.log('Network Usage Information:');
      console.log(`Transmitted: ${mbpsTransmitted.toFixed(2)} MB/s`);
      console.log(`Received: ${mbpsReceived.toFixed(2)} MB/s`);
    //   return {send:mbpsTransmitted,res:mbpsReceived}
    } catch (error) {
      console.error('Error fetching network usage information:', error);
    }
  }

async function getdiskusage(){
    try{
        const startdiskusage=await si.fsStats()
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const enddiskusage=await si.fsStats()
        const write =(enddiskusage.wx-startdiskusage.wx)/(1024*1024)
        const read =(enddiskusage.rx-startdiskusage.rx)/(1024*1024)
        const readspeed=read/1
        const writespeed =write/1
        // console.log(startdiskusage)
        // console.log(enddiskusage)
        console.log(readspeed,writespeed)
        return {read:readspeed,write:writespeed}


    }
    catch(err){

    }
}




app.get("/",(req,res)=>{
  
    // res.json(cpuusage())
    console.log()
    res.send(os.networkInterfaces())
})
app.get("/network",(req,res)=>{
    
    res.send(getNetworkUsage2())
})
app.get("/mem",(req,res)=>{
    res.send(memuse())

})
app.get("/cpu",(req,res)=>{
    res.send(cpuusage())

})
app.get("/disk",(req,res)=>{
    res.send(getdiskusage())
})
app.listen(port,()=>{
    console.log(`app is kjds in ${port}`)
    
     setInterval(getdiskusage,5000)
    // setInterval(getNetworkUsage2,1000)
    
   
})