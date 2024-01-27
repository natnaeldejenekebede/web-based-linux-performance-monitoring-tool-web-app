export default function memuse(){
    const totalmem= ((os.totalmem())/1024/1024)
    const freeme=((os.freemem())/1024/1024)
    const usedmem=(totalmem-freeme).toFixed(1)
    return {usedmemeory:usedmem,free:freeme,tot:totalmem}
}
export default function cpuusage(){
    const x=os.cpus();
    total=0
    for(i=0;i<x.length;i++){
        
        const core=x[i].times
        const totaltime=core.idle+core.irq+core.user+core.sys+core.nice;
        
        const usage = (100-((core.idle/totaltime)*100))
        total=total+usage
        
        

    }}
// export {memuse,cpuusage}
function parseNetworkInfo(data) {
    const lines = data.split('\n').slice(2); // Skip the header lines
    const interfaces = {};
  
    lines.forEach(line => {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 17) {
        const interfaceName = parts[0].replace(/:/, '');
        interfaces[interfaceName] = {
          rxBytes: parseInt(parts[1]),
          txBytes: parseInt(parts[9]),
        };
      }
    });
  
    return interfaces;
  }
  