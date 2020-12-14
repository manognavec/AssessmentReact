import React from 'react';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProjectDetails from '../Constant/ProjectData.json';
import { setProjectDetails, setProjectData } from '../Actions';

class ProjectData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            projectName: '',
            projects: this.props.projectList && this.props.projectList.length > 0 ? this.props.projectList : ProjectDetails
        }
    }
    createProject = () => {
        this.setState({ openModal: true })
    }
    addProject = () => {
        let projects = this.state.projects;
        projects[this.state.projects.length] = {id: this.state.projects.length + 1, name: this.state.projectName}
        console.log('@@@@', projects)
        this.props.setProjectDetails(projects)
        this.setState({ projects, projectName: '' })
    }
    setProjectName = (e) => {
        this.setState({ projectName: e.target.value })
    }

    getProjectDetails = (data) => {
        this.props.setProjectData(data);
    }
    render() {
        let userDetails = this.props.userDetails;
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
                name: 'Actions',
                selector: 'actions',
            }
          ];
        const data = this.state.projects && this.state.projects.length > 0 && this.state.projects.map((list)=>{
            return {
                id: list.id,
                name: list.name,
                actions: <Link to='/task' onClick={()=>this.getProjectDetails(list)}>Task List</Link>
            }
        })
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>{userDetails.name}</h2>
                <h2>Project List</h2>
                {userDetails.user_type === "Admin" ?
                <div className="col-md-12">
                    <button class="btn btn-info" data-toggle="modal" data-target="#show-modal" onClick={this.createProject}>Create Project</button>
                    <div className="modal" id="show-modal" display={this.state.openModal}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>Create New Project</h2>
                            </div>
                            <div className="modal-body">
                                <label>Project Name:</label>
                                <input type="text" className="form-control" onChange={(e)=>this.setProjectName(e)} value={this.state.projectName}/>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.addProject} disabled={this.state.projectName ? false : true}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                : null}
                <DataTable 
                columns={columns}
                data={data}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userDetails: state.userData,
        projectList: state.projectData
    }
}

export default connect(mapStateToProps,{setProjectDetails, setProjectData})(ProjectData);