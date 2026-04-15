'use strict';
const express=require('express');const cors=require('cors');const app=express();const PORT=process.env.PORT||3037;
app.use(cors());app.use(express.json());app.use('/',require('./routes/health'));app.use('/',require('./routes/onboarding'));
app.get('/',(_,r)=>r.json({service:'hive-onboarding-agent',version:'1.0.0',description:'Guided agent onboarding — tutorial flows, credential provisioning, integration setup, first-execution hand-holding',endpoints:{execute:'POST /v1/onboarding/execute',record:'GET /v1/onboarding/record/:id',stats:'GET /v1/onboarding/stats',records:'GET /v1/onboarding/records',health:'GET /health',pulse:'GET /.well-known/hive-pulse.json',ai:'GET /.well-known/ai.json'}}));
const hc=require('./services/hive-client');
app.listen(PORT,async()=>{console.log(`[hive-onboarding-agent] Listening on port ${PORT}`);try{await hc.registerWithHiveTrust()}catch(e){}try{await hc.registerWithHiveGate()}catch(e){}});
module.exports=app;
