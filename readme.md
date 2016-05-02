# WrioCommon

Common routines for WRIO backend applications, backbone for new
wrio backend application. 
Contains essential code to create new WRIO backbone application, contains all auth
related code.
For minimalistic application, see sampleserver.js

Configuration is managed by nconf, make sure proper nconf file is loaded priror to app initialization.
All secure configuration will be taken from config.json file of your application.

To import library use 

```
import {server,db,utils,login} from 'wriocommon';
```

To connect to database

```
var dbInstance =  await db.init();
```

Then you can create express application

```
var app = server.initserv(dbInstance);
app.listen(nconf.get("server:port"));
```

To authentificate request you can use wrioAuth middleware
```
app.get('/wrio_test', login.wrioAuth, function (request, response) {
     console.log(request.user);
     response.send(JSON.stringify(request.user));
 });
``
If user is found, request.user variable will be set. You can check 
whether user is temporary by checking user.temporary flag.