import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import header from "../services/httpServices";
import config from "../config.json";

const TokenCheck = () => {
  const { uidb64, token, mailType } = useParams();
  //   const [password, setPassword] = useState("");
  //   const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function handleTokencheck() {
      await header
        .get(`${config.apiUrl}/user/token_check/${uidb64}/${token}/${mailType}`)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            console.log(res.data.success);
            if (mailType === "password_reset") {
              navigate(`/set-new-password/${uidb64}/${token}`, {
                replace: true,
              });
            }
            if (mailType === "user_verification") {
              navigate("/login", { replace: true });
            }
          }
        });
    }

    handleTokencheck();
  }, []);

  //   console.log(uidb64, token, mailType);
  return <div>TokenCheck</div>;
};

export default TokenCheck;
