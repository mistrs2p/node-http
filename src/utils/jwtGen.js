const crypto =require('node:crypto')

// const secretKey = crypto.randomBytes(32).toString('hex');
const secret = 'areYou wan na loremipsu m %$$#PPPs;;;s.z11234 dasdfییصثقششثیب';
const hash = crypto.createHmac('sha256', secret)
               .update('I love cupcakes')
               .digest('hex');
console.log(hash);
// console.log(secretKey);