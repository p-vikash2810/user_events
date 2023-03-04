import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import CustomInput from "../components/CustomInput";
import EventList from "../components/EventList";
import { ADD_RECORD, UPDATE_RECORD } from "../redux/records/recordsActionType";

const Event = ({ activeUser, allRecords }) => {
  const [event, setEvent] = useState({
    name: "",
    date: "",
    description: "",
    price: 0,
    premium: false,
    term: false,
  });
  const [activeId, setActiveId] = useState(null);
  const dispatch = useDispatch();

  function handleChange(e) {
    const { type, name, value } = e.target;
    if (type === "checkbox") {
      setEvent({
        ...event,
        [name]: e.target.checked,
      });
    } else {
      setEvent({
        ...event,
        [name]: value,
      });
    }
  }

  function submitEvent(e) {
    e.preventDefault();
    if (activeId || activeId === 0) {
      dispatch({
        type: UPDATE_RECORD,
        data: { id: activeId, activeUser: activeUser.email, record: event },
      });
    } else {
      dispatch({
        type: ADD_RECORD,
        data: { activeUser: activeUser.email, record: event },
      });
    }
    setActiveId(null);
    setEvent({
      name: "",
      date: "",
      description: "",
      price: 0,
      premium: false,
      term: false,
    });
  }

  useEffect(() => {
    if (activeId || activeId === 0) {
      setEvent({
        ...allRecords[activeUser.email][activeId],
      });
    } else {
      setEvent({
        name: "",
        date: "",
        description: "",
        price: 0,
        premium: false,
        term: false,
      });
    }
  }, [activeId]);
  return (
    <div className="container">
      <div className="event-form">
        <CustomInput
          name="name"
          label="name"
          type="text"
          value={event.name}
          handleChange={handleChange}
          placeholder="Event Name"
        />
        <CustomInput
          name="date"
          label="date"
          type="date"
          value={event.date}
          handleChange={handleChange}
        />
        <CustomInput
          name="description"
          label="description"
          type="text"
          value={event.description}
          handleChange={handleChange}
          placeholder="Event description"
        />
        <CustomInput
          name="price"
          label="price"
          type="number"
          value={event.price}
          handleChange={handleChange}
          placeholder="Event price"
        />
        <div className="radio-buttons">
          <h3>Premium</h3>
          <CustomInput
            name="premium"
            label="Yes"
            type="radio"
            value={true}
            handleChange={handleChange}
            labelClass="inline"
          />
          <CustomInput
            name="premium"
            label="No"
            type="radio"
            value={false}
            handleChange={handleChange}
            labelClass="inline"
          />
        </div>

        <CustomInput
          name="term"
          label="terms and condition"
          type="checkbox"
          checked={event.term}
          handleChange={handleChange}
          labelClass="inline"
        />
        <button
          disabled={
            !event.name ||
            !event.date ||
            !event.description ||
            !event.price ||
            !event.term
          }
          onClick={submitEvent}
        >
          {activeId || activeId === 0 ? "Update" : "Submit"}
        </button>
      </div>
      <EventList setActiveId={setActiveId} />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    activeUser: state.activeUser,
    allRecords: state.records,
  };
}

export default connect(mapStateToProps)(Event);
