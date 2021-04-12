const connection = require('../database/db');

it("Should Something", () => {
  const conn = () => {
    connection
      .authenticate()
      .then((response) => {
        return true;
      })
      .catch((err) => {
        return err;
      })
      console.log(conn())
  }

})