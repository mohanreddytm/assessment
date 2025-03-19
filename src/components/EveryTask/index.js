import './index.css'

const EveryTask = ({task}) => {

    return (
    <tr className='task-row'>
        <td><input type="checkbox"/></td>
        <td>{task.title}</td>
        <td>{task.priority}</td>
        <td>{task.dueDate}</td>
        <td>{task.associatedRecord}</td>
        <td>{task.assignedTo}</td>
    </tr>
)
}

export default EveryTask