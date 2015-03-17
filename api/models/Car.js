module.exports = {
connection: 'sqlserver',
  attributes: {
    Name: {
        type: 'string',
    },
    Brand: {
        type: 'string'
    },
    Model: {
        type: 'string'
    },
    driver: {
        model: 'Driver',
        required: false
    }
  }
};