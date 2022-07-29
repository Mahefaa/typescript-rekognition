import AWS from "aws-sdk";
//login information for Amazon Used Services
AWS.config.region = process.env.REACT_APP_REGION; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.REACT_APP_POOL_ID as string
});