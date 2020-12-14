import React from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import userData from '../Constant/UserData.json';
import { connect } from 'react-redux';
import { setUserDetails } from '../Actions';

class UserData extends React.Component {

    userDetails = (data) => {
        this.props.setUserDetails(data);
    }
    render() {
        const columns = [
            {
                name: 'ID',
                selector: 'id',
                sortable: true,
            },
            {
                name: 'Name',
                selector: 'name',
                sortable: true,
            },
            {
                name: 'User Type',
                selector: 'user_type',
                sortable: true,
            },
            {
                name: 'Actions',
                selector: 'actions',
            }
          ];
          const data = userData && userData.length > 0 && userData.map((list)=>{
              return {
                  id: list.id,
                  name: list.name,
                  user_type: list.user_type,
                  actions: <Link to='/project' onClick={()=>this.userDetails(list)}>Login</Link>
              }
          })
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>User List</h2>
                <DataTable 
                columns={columns}
                data={data}
                />
            </div>
        )
    }
}

export default connect(null,{setUserDetails})(UserData);