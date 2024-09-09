// react router dom
import { Link,useNavigate } from "react-router-dom";

// material ui components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

// components
import PasswordInput from "../../components/Input/PasswordInput";
import { useState } from "react";
import Input from "../../components/Input/Input";
import { validateEmail } from "../../utils/helper";
import NavBar from "../../components/NavBar/NavBar"
// others
import axiosInstance from "../../utils/axiosInstace"

function SignUp() {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const handlingErrorMessage = () => {
    return;
  };
  const changingEmail = (e) => {
    setData({ ...data, email: e.target.value });
  };
  const changingPassword = (e) => {
    setData({ ...data, password: e.target.value });
  };
  const changingName = (e) => {
    setData({ ...data, name: e.target.value });
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    // the processing of the data is backend's responsibility
    // if (data.name.length === 0) {
    //   setError("please enter your name");
    //   return
    // }
    // if (!validateEmail(data.email)) {
    //   setError("please enter a valid email address");
    //   return
    // }
    // if (data.password.length === 0) {
    //   setError("please enter the password");
    //   return
    // }
    // signUp API call
    try {
      const response=await axiosInstance.post("/api/users/create-account",{fullName:data.name,email:data.email,password:data.password})
      // handle successful registration response
      if(response.data && response.data.accessToken) {
        localStorage.setItem("token",response.data.accessToken)
        navigate("/dashboard")
      }

    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }else {
        setError("An unexpected error occurred. Please try again")
      }
    }
    
  };
  return (
    <div>
      <NavBar disabledPage={true}></NavBar>
      <Container maxWidth="sm" sx={{ marginTop: "20vh" }}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h4" marginBottom={"20px"}>
              SignUp
            </Typography>
            <form action="" onSubmit={handleSignUp}>
              <Input
                value={data.name}
                onchange={changingName}
                placeholder={"name"}
              ></Input>
              <Input
                value={data.email}
                onchange={changingEmail}
                placeholder={"email"}
              ></Input>
              <PasswordInput
                value={data.password}
                onchange={changingPassword}
                placeholder={"password"}
              ></PasswordInput>
              {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
              <CardActions
                sx={{ display: "grid", placeItems: "center", rowGap: "10px" }}
              >
                <Button variant="contained" type="submit">
                  Create Account
                </Button>
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    gap: "4px",
                  }}
                >
                  <span>Already have an account?</span>
                  <Link
                    to="/login"
                    className="font-medium text-primary underline"
                  >
                    Login
                  </Link>
                </div>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default SignUp;
