const app = require('./app');
app.listen(8080, (error) => {
  if (error) {
    console.log(error)
  } else {
    console.log(`O servidor está rodando na porta 8080`)
  }
});