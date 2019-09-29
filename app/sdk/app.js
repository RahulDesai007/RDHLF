  //***Template for NodeJs***//
//***Created BY Rahul M. Desai***//
    //***MOB- 9930831907 ***//
    const express = require('express');

    const bodyParser = require('body-parser');
    
    const feedRoutes = require('./gateway/routes/route');
    
    const app = express();
    
    // app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
    app.use(bodyParser.json()); // application/json
    // setting up CORS //
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });
    
    app.use('/route', feedRoutes);
    
    app.get('/',(req,res)=>{
      console.log("app is working fine")
    res.status(200).json({message:"app is working fine"})
    });
    
            app.listen(process.env.PORT || 8000)
            console.log("Server Started at post 8000...")
      
        //.catch(err => console.log(err));
    