module.exports = {
    index: function(req, res) {
        var stringify = require('node-stringify');
        var navItems = [
            {url: '/messages', cssClass: 'fa fa-comments', title: 'Chat'},
            {url: '/about', cssClass: 'fa fa-infoc-circle', title: 'About'}
        ];

        if (req.isAuthenticated()) {
            navItems.push({url: '/logout', cssClass: 'fa fa-comments', title: 'Logout'});
        }
        else {
            navItems.push({url: '/register', cssClass: 'fa fa-briefcase', title: 'Register'});
            navItems.push({url: '/login', cssClass: 'fa fa-comments', title: 'Login'});
        }

        var ProcessFrontEndView = function(err, result){ 
            var producer = (!err) ? result : null;
            res.view({
                title: 'Home',
                producer : producer,
                navItems: navItems,
                currentUser: req.user,
             });
        }
        ProducerUsers.getProducer(req.user.UserID, ProcessFrontEndView); 
    },

    getClients: function(req, res) {
        var sendData = function(err, result){ 
            if(!err) { 
                res.send(result); 
            } else {
                res.send(404); 
            } 
        }
        ProducerUsers.getProducerClients(req.user.UserID, sendData); 
    }    

};