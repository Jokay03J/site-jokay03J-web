import React, { useEffect, useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import superagent from "superagent";

const Hcaptcha = () => {

  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const captchaRef = useRef(null);

  const onSubmit = () => {
    // this reaches out to the hcaptcha library and runs the
    // execute function on it. you can use other functions as well
    // documented in the api:
    // https://docs.hcaptcha.com/configuration#jsapi
    captchaRef.current.execute();
  };

  const onExpire = () => {
    console.log("hCaptcha Token Expired");
  };

  const onError = (err) => {
    console.log(`hCaptcha Error: ${err}`);
  };

  const onVerifyToken = (token) => {
    setToken(token)
    console.log(token);

    superagent
      .post("http://jokay03j.test:8080/captcha/verify")
      .send({
        response: token,
      })
      .set("Access-Control-Allow-Origin", "*")
      .end((err, res) => {
        console.log(res);
      })

  }

  useEffect(() => {
    if (token) {
      // Token is set, can submit here
      console.log(`User Email: ${email}`);
      console.log(`hCaptcha Token: ${token}`);
    }
  }, [token, email]);

  return (
    <div>
      <HCaptcha
        // This is testing sitekey, will autopass
        // Make sure to replace
        sitekey="c1adedfc-2c21-461a-b6f0-50b839e467a3"
        size="normal"
        onVerify={(token) => onVerifyToken(token)}
        onError={onError}
        onExpire={onExpire}
        ref={captchaRef}
      />
    </div>
  );
};

export default Hcaptcha;