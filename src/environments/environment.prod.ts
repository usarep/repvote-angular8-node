export const environment = {
  production: true,
  // server: "http://localhost:8080", // this is the java server
  server: "https://api.compararep.com",
  imgServer: "https://www.compararep.com", // serves rep photos

  // client side key for reCaptcha V3. supply your own
  reCaptchaV3ClientKey: '6LfzjGoUAAAAAI3AQKhMdItGds9RbSKlK5gEqrex',

  debug: {
    RECAPTCHA_V3: true,
  }

};
