import issuer from 'openid-client';

const googleIssuer = await issuer.discover('https://accounts.google.com');
console.log('Discovered issuer %s %O', googleIssuer.issuer, googleIssuer.metadata);



