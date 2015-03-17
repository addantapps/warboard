module.exports = {
    getProducer: function(userId, callback) {
       ProducerUsers.query("Select ProducerName, ProducerID FROM Producers WHERE ProducerID=(SELECT ProducerID FROM ProducerUsers  WHERE UserID = '"+userId+"')",
            function(err, results) {
              callback(err,results[0]);  
            }
        );
    },

    getProducerClients: function(userId, callback) {
        ProducerUsers.query("Select ClientName, Clients.ClientID FROM Clients INNER JOIN ClientCommissions ON Clients.ClientID = ClientCommissions.ClientID WHERE ProducerID =(Select ProducerID FROM Producers WHERE ProducerID=(SELECT ProducerID FROM ProducerUsers  WHERE UserID = '"+userId+"'))",
            function(err, clients) {
                callback(err, clients);  
            }
        );
    }
};