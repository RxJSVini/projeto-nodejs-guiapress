const bscryptjs = require('bcryptjs');

const hash = async (algumacoisa) => {
  const salt = await bscryptjs.genSalt(10);
  const shuffle = await bscryptjs.hash(algumacoisa, salt);
  console.log(shuffle);
}


console.log(hash("express"));