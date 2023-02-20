const express = require("express");
const bodyParser = require("body-parser")
const app = express();
require('dotenv').config()
require('./shared/mongodbConnect')
const auth=require('./shared/tokenMiddleware')
const {moviesAuthentication,userAuthentication}=require("./shared/tokenMiddleware")
const indeRouter=require('./router/index')
// ................middleware.........../
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
// ..................jwt authentication........///
app.use("/movies/",moviesAuthentication)
app.use("/user/",userAuthentication)

app.use('',indeRouter)
//.............. PORT...........//
const PORT = process.env.PORT || 4000;
// ........swagger..............//
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");


const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "netflix",
			version: "1.0.0",
			description: "movies",
		},
		servers: [
			{
				url: "http://localhost:4000",
			},
		],
	},
	apis: [`${__dirname}/router/user.js`,`${__dirname}/router/movies.js`]
};

const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
//............................................................//

app.listen(PORT,()=>{
  console.log(`server running ${PORT}`)
})