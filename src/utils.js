export const formateDate=(date)=>{
    const d=new Date(date);
    let month=`${d.getMonth()+1}`;
    let day=`${d.getDate()}`;
    const year=d.getFullYear();

    if(month.length<2){
        month=`0${month}`;
    }
    if(day.length<2){
        day=`0${day}`;
    }
    return [year,month,day].join('-');
}

export const findBarData = (transactions,type)=>{
    const months = ['Jan','Feb','March','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec']
    const indx = {'01':0,'02':1,'03':2,'04':3,'05':4,'06':5,'07':6,'08':7,'09':8,'10':9,'11':10,'12':11}
    var arr=[];
    for(let i=0;i<12;i++){
        arr[i]=0;
    }
    const filteredData=transactions.filter((t)=>t.type===type);

    const data = filteredData.map((t)=>[t.date.slice(5,7),t.amount]);

    for(let i=0;i<data.length;i++){
        arr[indx[data[i][0]]]+=data[i][1];
    }
    const barData={
        data:{
            labels:months,
            datasets:[{
                label:`Monthly ${type}`,
                data:arr,
                backgroundColor:type==='Income'?'green':'red'
            }]
        }
        ,
        options:{
            backgroundColor:'white'
        }
    }
    return barData
}



