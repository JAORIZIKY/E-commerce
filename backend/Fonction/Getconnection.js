let reponse 
class connex{

    
}
function Getconnection(res, query, values, db, log, status, messageStatus,  message, direct){
    function getconnect(res, query, values, db, log, status, messageStatus,  message, direct){
        db.query(query, values, (err, results) => {
            if(err){
                console.error(message[0], err);
                return res.status(status[0]).json({message: messageStatus[0]})
            }

            if (results.length === 0) {
                return res.status([1]).json({ message: messageStatus[1]})
            }
            if(direct === "json"){
                res.json(results[0])
            }else {
                console.log("results: ",results);
                reponse = results
                console.log("1 ",reponse);      
            }
            
        })
    }
    getconnect(res, query, values, db, log, status, messageStatus,  message, direct)
    console.log("2",reponse);
    
}

module.exports = Getconnection