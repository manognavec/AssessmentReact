import React from 'react';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TaskDetails from '../Constant/TaskData.json';
import { setTaskDetails } from '../Actions';

class TaskData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            assignModal: false,
            taskName: '',
            assigned: '',
            status: '',
            assignData: '',
            newTaskList: [],
            tasks: this.props.taskDetails && this.props.taskDetails.length>0 ? this.props.taskDetails : TaskDetails
        }
    }
    createTask = () => {
        this.setState({ openModal: true, assignModal: false, assignData: '', assigned: '', status: '' })
    }
    assignTask = (e, data) => {
        e.preventDefault();
        this.setState({ assignModal: true, openModal: false, assignData: data, assigned: data.assigned_to, status: data.status })
    }
    addTask = (status) => {
        let { projectDetails } = this.props;
        let newTaskList = this.state.newTaskList;
        let tasks = this.state.tasks;
        let tasksList = this.state.tasks && this.state.tasks[projectDetails.id - 1] && this.state.tasks[projectDetails.id - 1][projectDetails.id];
        if(tasksList && tasksList.length > 0) {
            if(status === "create") {
                tasksList[tasksList.length] = {id: tasksList.length + 1, name: this.state.taskName, assigned_to: this.state.assigned, status: this.state.status}
            }else{
                tasksList = tasksList.map(list=>{
                    if(list.id === this.state.assignData.id) {
                        list.assigned_to = this.state.assigned ? this.state.assigned : list.assigned_to;
                        list.status = this.state.status ? this.state.status : list.status;
                    }
                    return list;
                })
            }
        }else {
            if(status === 'create') {
                newTaskList.push({id: newTaskList.length + 1, name: this.state.taskName, assigned_to: this.state.assigned, status: this.state.status})
            }else {
                newTaskList = newTaskList.map(list => {
                if(list.id === this.state.assignData.id) {
                    list.assigned_to = this.state.assigned ? this.state.assigned : list.assigned_to;
                    list.status = this.state.status ? this.state.status : list.status;
                }
                return list;
                })
            }
        }
        if(tasks[projectDetails.id - 1]){
            tasks[projectDetails.id - 1][projectDetails.id] = tasksList;
        }
        this.props.setTaskDetails(tasks)
        this.setState({ tasks, taskName: '',newTaskList })
    }
    handleChange = (e) => {
        let { name,value } = e.target;
        this.setState({ [name]: value })
    }
    render() {
        let { userDetails, projectDetails } = this.props;
        let { assignModal, openModal, tasks } = this.state;
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
                name: 'Assigned To',
                selector: 'assigned_to',
                sortable: true,
            },
            {
                name: 'Status',
                selector: 'status',
                sortable: true,
            },
            {
                name: 'Actions',
                selector: 'actions',
            }
          ];
        let taskList = tasks && tasks[projectDetails.id - 1] && tasks[projectDetails.id - 1][projectDetails.id] ? tasks[projectDetails.id - 1][projectDetails.id] : this.state.newTaskList;
        const data = taskList && taskList.length > 0 && taskList.map((list)=>{
            return {
                id: list.id,
                name: list.name,
                assigned_to: list.assigned_to,
                status: list.status,
                actions: <Link data-toggle="modal" data-target="#show-modal" onClick={(e)=>this.assignTask(e, list)}>{userDetails.user_type === "Manager" ? "Assign" : "Change Status"}</Link>
            }
        })
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>{projectDetails.name}</h2>
                <h2>Task List</h2>
                {userDetails.user_type === "Manager" ?
                <div className="col-md-12">
                    <button class="btn btn-info" data-toggle="modal" data-target="#show-modal" onClick={this.createTask}>Create Task</button>
                    
                </div>
                : null}
                <DataTable 
                columns={columns}
                data={data}
                />
                <div className="modal" id="show-modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>{assignModal ? "Assign" : "Create New Task"}</h2>
                            </div>
                            <div className="modal-body">
                                {openModal ?
                                <div className="form-group col-md-12">
                                    <label>Task Name</label>
                                    <input type="text" className="form-control" name="taskName" onChange={(e)=>this.handleChange(e)} value={this.state.taskName}/>
                                </div> : null}
                                {userDetails.user_type === "Manager" ? 
                                <div className="form-group col-md-12">
                                    <label>Assigned To</label>
                                    <input type="text" className="form-control" name="assigned" onChange={(e)=>this.handleChange(e)} value={this.state.assigned}/>
                                </div> : null}
                                <div className="form-group col-md-12">
                                    <label>Status</label>
                                    {userDetails.user_type === "Manager" ?
                                    <select value={this.state.status} name="status" onChange={(e)=>this.handleChange(e)}>
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Not Completed">Not Completed</option>
                                        <option value="Closed">Closed</option>
                                    </select> :
                                    <select value={this.state.status} name="status" onChange={(e)=>this.handleChange(e)}>
                                        <option value="Started">Started</option>
                                        <option value="Completed">Completed</option>
                                        <option value="End">End</option>
                                    </select> }
                                </div>
                            </div>
                            <div class="modal-footer">
                                {openModal ?
                                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={()=>this.addTask('create')} disabled={this.state.taskName ? false : true}>Add</button>
                                : <button  type="button" class="btn btn-primary" data-dismiss="modal" onClick={()=>this.addTask('update')} disabled={this.state.assigned || this.state.status ? false : true}>Update</button> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userDetails: state.userData,
        projectDetails: state.project,
        taskDetails: state.taskData
    }
}

export default connect(mapStateToProps,{setTaskDetails})(TaskData);