import React from "react";
import { connect, useSelector } from "react-redux";
import { DELETE_RECORD } from "../redux/records/recordsActionType";

const EventList = ({ activeUser, deleteRecord, setActiveId }) => {
  const records = useSelector((state) => state.records);
  const totalPrice = records[activeUser.email]?.reduce((acc, obj) => {
    return acc + Number(obj.price);
  }, 0);

  return (
    <div className="events">
      <table className="event-table">
        <tbody>
          <tr>
            <th>name</th>
            <th>date</th>
            <th>description</th>
            <th>price</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
          {records[activeUser.email]?.map((record, index) => (
            <tr
              key={index}
              className={record.premium === "true" ? "primary" : ""}
            >
              <td>{record.name}</td>
              <td>{record.date}</td>
              <td>{record.description}</td>
              <td>{record.price}</td>
              <td onClick={() => deleteRecord(index, activeUser.email)}>
                Remove
              </td>
              <td onClick={() => setActiveId(index)}>Edit</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Price - {totalPrice ? totalPrice : 0}</p>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    activeUser: state.activeUser,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteRecord: (id, currentUser) =>
      dispatch({ type: DELETE_RECORD, data: { id, activeUser: currentUser } }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
