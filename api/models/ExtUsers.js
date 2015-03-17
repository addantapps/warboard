module.exports = {
    attributes: {
        ExtUsersID : {
            type: 'integer',
            primaryKey: true,
            required: true
        },
        UserID :{
            type: 'string',
            model:'ProducerUsers'
        }
    },
    autoPK:false
};