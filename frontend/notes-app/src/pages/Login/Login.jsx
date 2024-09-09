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

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const changingEmail = (e) => {
    setData({ ...data, email: e.target.value });
  };
  const changingPassword = (e) => {
    setData({ ...data, password: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(data.email)) {
      console.log(data.email);
      setError("please enter a valid email address");
      return;
    }
    if (!data.password) {
      setError("please enter the password");
      return;
    }
    // setError("")
    // login api call
    try {
      const response= await axiosInstance.post("/api/users/login",{email:data.email,password:data.password})
      // handle success login response
      if(response.data && response.data.error){
        setError(response.data.message)
        return;
      }
      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        navigate("/dashboard")
      }
    } catch (error) {
      // handle login error
      if(error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message)
      }else{ 
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
              Login
            </Typography>
            <form action="" onSubmit={handleLogin}>
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
                  Login
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
                  <span>Not Registered yet?</span>
                  <Link
                    to="/signUp"
                    className="font-medium text-primary underline"
                  >
                    Create an Account
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

export default Login;
