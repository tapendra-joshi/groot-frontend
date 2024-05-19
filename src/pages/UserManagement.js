import React, { useEffect, useState } from "react";
import InputFields from "../component/InputFields";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./UserManagement.css";
import UserListSection from "../component/UserListSectionComponent/UserListSection";
import axios from "axios";

let initialsValue = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  timezone: "",
  isNotificationEnabled: false,
  isNewDashboardEnabled: false
};

let intervalId;

let passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$"
);
let email = new RegExp(
  "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
);
let regex = new RegExp("^([a-zA-Z])*$");

let isvalidEmail = false

function UserManagement() {
  const [data, setData] = useState(initialsValue);
  const [error, setError] = useState({});
  const [searchId, setSearchId] = useState("");
  const [userList, setUserList] = useState([]);
  const [apiCall, setApicall] = useState(true);
  console.log("data:",data);
  const getUserList = () => {
    
    let temp = searchId != "" && isvalidEmail ? `/email?email=${searchId}`:"";

    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST_URL}/users${temp}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setUserList(res.data.data || []);
          setApicall(false);
        }
      });
  };

  useEffect(() => {
    if (apiCall) {
      getUserList();
    }
  }, [apiCall]);


  useEffect(() => {
    if (searchId && isvalidEmail) {
      getUserList();
    }
  }, [searchId]);

  const onChangehandler = (e) => {
    let tempError = { ...error };
    let { name, value } = e.target;
    console.log(name,typeof(value))
    if (name === "password") {
      if (value && !passwordRegex.test(value)) {
        tempError = {
          ...tempError,
          [name]:
            "Password should contain atleast 1 UpperCase 1 LowerCase 1 Special Character, 1 Number and must be of min 8 length ",
        };
      } else {
        delete tempError[name];
      }
    }

    if (name === "email") {
      if (value && !email.test(value)) {
        tempError = { ...tempError, [name]: "Please Enter valid email " };
      } else {
        delete tempError[name];
      }
    }

    if (name === "firstName" || name === "lastName") {
      if (value && !regex.test(value)) {
        tempError = { ...tempError, [name]: "Please Enter valid value " };
      } else {
        delete tempError[name];
      }
    }

    if (name === "isNewDashboardEnabled" || name === "isNotificationEnabled") {
      value = value == "false" ? true : false
    }


    setData({ ...data, [name]: value });
    setError({ ...tempError });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_HOST_URL}/users/`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 201) {
          alert("User added Successfully!");
          setData(initialsValue);
          setApicall(true);
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <InputFields
          type={"text"}
          name="firstName"
          label={"First Name"}
          id="firstName"
          onChange={onChangehandler}
          pattern={"[A-Za-z]"}
          value={data?.firstName}
          error={error}
        />
        <InputFields
          type={"text"}
          name="lastName"
          label={"Last Name"}
          id="lastName"
          onChange={onChangehandler}
          value={data?.lastName}
          error={error}
        />
        <InputFields
          type={"email"}
          label={"Email"}
          name="email"
          id="email"
          onChange={onChangehandler}
          value={data?.email}
          error={error}
        />
        <InputFields
          type={"password"}
          label={"Password"}
          name="password"
          id="password"
          onChange={onChangehandler}
          value={data?.password}
          error={error}
        />
        <InputFields
          type={"text"}
          label={"Timezone"}
          name="timezone"
          id="timezone"
          onChange={onChangehandler}
          value={data?.timezone}
          error={error}
        />
        <InputFields
          type={"checkbox"}
          label={"Notification Enabled"}
          name="isNotificationEnabled"
          id="isNotificationEnabled"
          required={false}
          onChange={onChangehandler}
          value={data?.isNotificationEnabled}
          error={error}
        />
        <InputFields
          type={"checkbox"}
          label={"Dashboard Enabled"}
          name="isNewDashboardEnabled"
          id="isNewDashboardEnabled"
          required={false}
          onChange={onChangehandler}
          value={data?.isNewDashboardEnabled}
          error={error}
        />
        <button disabled={Object.keys(error).length > 0} type="submit">Add User</button>
      </form>
      <div className="user-list-container">
        <div
        className="search-box"
        >
          <input
            
            type="text"
            placeholder="Search By email"
            value={searchId}
            onChange={(e) => {
                      
                    if (e.target.value && email.test(e.target.value)) {
                      isvalidEmail = true
                      
                    } else{
                      isvalidEmail = false
                    }
                    setSearchId(e.target.value)
                    if (e.target.value == ""){
                      setApicall(true)
                    }else {
                      setApicall(isvalidEmail)
                    }
            }}
          />
        </div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <div className="accordian-header">List Of User</div>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <UserListSection userList={userList} />
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}

export default UserManagement;
