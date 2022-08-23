const date = (req, _res, next) => {
      console.log(`${req.method} ${req.url} - ${new Date().toLocaleString()}`);
      next();
    }

    let dates = {
        date,
    };
  
  module.exports = dates;