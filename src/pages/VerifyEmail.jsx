import React, { useEffect } from "react";
import LastHome from "../components/LastHome";
import { verify_email } from "../utils/api/user_api";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNotification } from "../utils/slicers/notificationSlice";
function VerifyEmail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();

  useEffect(() => {
    const emailVerfication = async () => {
      if (token) {
        const response = await verify_email({token});

        if (response?.status) {
          dispatch(
            addNotification({
              type: "success",
              title: "Email Verification Successful!",
              description: response?.message,
            })
          );
          navigate('/login');
        } else {
          dispatch(
            addNotification({
              type: "error",
              title: "Operation Failed!",
              description: response?.message,
            })
          );
        }
      } else {
        dispatch(
          addNotification({
            type: "error",
            title: "Operation Failed!",
            description: "Token is invalid!",
          })
        );
      }

    };

    emailVerfication();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
    
    </div>
  );
}

export default VerifyEmail;
