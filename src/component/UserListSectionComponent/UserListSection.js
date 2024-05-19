import React from "react";

function UserListSection({userList}) {
  return (
    <table className="" style={{width:"100%"}}>
      <thead>
        <tr style={{width:"100%"}} >
          <th style={{minWidth:"200px"}}>First Name </th>
          <th style={{minWidth:"200px"}}>Last Name</th>
          <th style={{minWidth:"200px"}}>Email</th>
          <th style={{minWidth:"200px"}}>Notification Enabled</th>
          <th style={{minWidth:"100px"}}>NewDashboard Enabled</th>
          <th style={{minWidth:"100px"}}>Timezone</th>
        </tr>
      </thead>
      <tbody style={{width:"100%"}}>
{userList && userList.length > 0 ?
userList.map((item,index) => {
  return <tr>
          <td>{item.firstName} </td>
          <td>{item.lastName}</td>
          <td>{item.email}</td>
          <td>{item.isNotificationEnabled ? "Yes":"No"} </td>
          <td>{item.isNewDashboardEnabled ? "Yes":"No"}</td>
          <td>{item.timezone}</td>
        </tr>
}):
        <tr style={{marginTop:"10px"}}>
           <td colSpan={5}> No User Added </td>
        </tr>
        }
      </tbody>
    </table>
  );
}

export default UserListSection;
