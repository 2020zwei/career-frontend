import React, { useEffect, useState } from "react";
import { Spin, message, Button, TimePicker, Modal, Select } from "antd";
import {
  getApiWithAuth,
  postApiWithAuth,
  deleteApiWithAuth,
  putApiWithAuth,
} from "../../utils/api";
import {
  MyCareerGuidanceButton,
  MyCareerGuidanceInputField,
} from "../commonComponents";
import { useNavigate, useLocation } from "react-router-dom";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import dayjs from "dayjs";
import { API_URL } from "../../utils/constants";
import "./Mystudy.css";
const isMobile = window.innerWidth <= 768;
const MyStudy = () => {
  const { Option } = Select;

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataTime, setDatatime] = useState([]);
  const [calenderData, setCalenderData] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [title, setTitle] = useState("");
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [openBooking, setOpenBooking] = useState(false);
  const [deleteBooking, setDeleteBooking] = useState(false);
  const [deleteHandler, setDeleteHandler] = useState(false);
  const [openViewBooking, setOpenViewBooking] = useState(false);
  const [viewData, setViewData] = useState({});
  const [btnDisabled, setBtnDisabled] = useState(true);
  const handleOpenBooking = () => setOpenBooking(true);
  const handleCloseBooking = () => setOpenBooking(false);
  const handleCloseBooking2 = () => setDeleteBooking(false);

  const handleOpenViewBooking = () => setOpenViewBooking(true);
  const handleCloseViewBooking = () => setOpenViewBooking(false);
  const optionArray = [
    { label: "06:00 AM", value: "06:00 AM" },
    { label: "06:30 AM", value: "06:30 AM" },
    { label: "07:00 AM", value: "07:00 AM" },
    { label: "07:30 AM", value: "07:30 AM" },
    { label: "08:00 AM", value: "08:00 AM" },
    { label: "08:30 AM", value: "08:30 AM" },
    { label: "09:00 AM", value: "09:00 AM" },
    { label: "09:30 AM", value: "09:30 AM" },
    { label: "10:00 AM", value: "10:00 AM" },
    { label: "10:30 AM", value: "10:30 AM" },
    { label: "11:00 AM", value: "11:00 AM" },
    { label: "11:30 AM", value: "11:30 AM" },
    { label: "12:00 PM", value: "12:00 PM" },
    { label: "12:30 PM", value: "12:30 PM" },
    { label: "01:00 PM", value: "01:00 PM" },
    { label: "01:30 PM", value: "01:30 PM" },
    { label: "02:00 PM", value: "02:00 PM" },
    { label: "02:30 PM", value: "02:30 PM" },
    { label: "03:00 PM", value: "03:00 PM" },
    { label: "03:30 PM", value: "03:30 PM" },
    { label: "04:00 PM", value: "04:00 PM" },
    { label: "04:30 PM", value: "04:30 PM" },
    { label: "05:00 PM", value: "05:00 PM" },
    { label: "05:30 PM", value: "05:30 PM" },
    { label: "06:00 PM", value: "06:00 PM" },
    { label: "06:30 PM", value: "06:30 PM" },
    { label: "07:00 PM", value: "07:00 PM" },
    { label: "07:30 PM", value: "07:30 PM" },
    { label: "08:00 PM", value: "08:00 PM" },
    { label: "08:30 PM", value: "08:30 PM" },
    { label: "09:00 PM", value: "09:00 PM" },
    { label: "09:30 PM", value: "09:30 PM" },
    { label: "10:00 PM", value: "10:00 PM" },
    { label: "10:30 PM", value: "10:30 PM" },
    { label: "11:00 PM", value: "11:00 PM" },
    { label: "11:30 PM", value: "11:30 PM" },
  ];

  useEffect(() => {
    getCalanderData();
  }, []);

  const getCurrentWeek = () => {
    var currentDate = moment();
    var weekStart = currentDate.clone().startOf("week");
    var days = [];
    for (var i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, "days").format("ddd MMMM DD YYYY"));
    }
    setDatatime(days);
  };

  const setShowData = (dayCount, AllArray) => {
    return AllArray[dayCount];
  };

  useEffect(() => {
    let check = [];
    check = data.map((item) => {
      return {
        title: item.title,
        id: item.day,
        start: new Date(`${setShowData(item.day, dataTime)} ${item.timeslot}`),
        end: new Date(`${setShowData(item.day, dataTime)} ${item.endslot}`),
        backgroundColor: "rgba(41, 204, 57, 0.05)",
        extendedProps: {
          title: item.title,
          id: item.day,
          selectID: item.id,
          start: new Date(
            `${setShowData(item.day, dataTime)} ${item.timeslot}`
          ),
          end: new Date(`${setShowData(item.day, dataTime)} ${item.endslot}`),
        },
      };
    });
    setCalenderData(check);
  }, [dataTime]);

  const getCalanderData = async () => {
    setLoading(true);
    const response = await getApiWithAuth(`timetable/list-timeslot/`);
    if (response.data.status === 200) {
      setData(response.data.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (data.length !== 0) {
      getCurrentWeek();
    }
  }, [data]);
  function renderEventContent(eventInfo) {
    return (
      <>
        <div className="showDateData">
          <b className="showDateData2">{eventInfo.timeText}</b>
          <b className="showDateData2">{eventInfo.event._def.title}</b>
        </div>
      </>
    );
  }

  const handleDateSelect = (selectInfo) => {
    setWeekDay(dayjs(selectInfo.start).format("d"));
    // setSelectedTime(dayjs(selectInfo.start));
    setSelectedTime(dayjs(selectInfo.start).locale("en").format("hh:mm A"));
    // setSelectedEndTime(dayjs(selectInfo.end));
    setSelectedEndTime(dayjs(selectInfo.end).locale("en").format("hh:mm A"));

    handleOpenBooking();
  };
  const createNewEvent = async () => {
    setLoadingBooking(true);
    // let startTime = dayjs(selectedTime.$d).format("HH:mm:ss");
    // let endTime = dayjs(selectedEndTime.$d).format("HH:mm:ss");
    let startTime = dayjs(selectedTime, "hh:mm A").format("hh:mm:ss");
    let endTime = dayjs(selectedEndTime, "hh:mm A").format("hh:mm:ss");
    const response = await postApiWithAuth(API_URL.ADDSLOTTABLE, {
      timeslot: startTime,
      endslot: endTime,
      day: weekDay,
      title: title,
    });

    if (response.data.status === 201) {
      message.success("Booking Added");
      setSelectedTime("");
      setSelectedEndTime("");
      setWeekDay("");
      setTitle("");
      setOpenBooking(false);
      setLoadingBooking(false);
      setData([]);
      setDatatime([]);
      getCalanderData();
    } else {
      setLoadingBooking(false);
      message.error(response.data.message[0]);
    }
  };
  const handleDelete = async () => {
    setDeleteHandler(true);
    const respose = await deleteApiWithAuth(`timetable/reset-timeslot/`);
    if (respose.data.data.success) {
      message.success("Reset Data succesfully");
      setSelectedTime("");
      setSelectedEndTime("");
      setWeekDay("");
      setTitle("");
      setOpenBooking(false);
      setLoadingBooking(false);
      setData([]);
      setDatatime([]);
      getCalanderData();
      setDeleteHandler(false);
    } else {
      setDeleteHandler(false);
      message.error(respose.data.message);
    }
  };

  const handleEventClick = (clickInfo) => {
    setViewData(clickInfo.event._def.extendedProps);
    handleOpenViewBooking();
  };

  const deleteCurrent = async (id) => {
    setDeleteHandler(true);
    const respose = await deleteApiWithAuth(`timetable/delete-timeslot/${id}`);
    if (respose.data.status === 204) {
      message.success("Delete Data succesfully");
      setOpenBooking(false);
      setLoadingBooking(false);
      getCalanderData();
      handleCloseViewBooking();
      setData([]);
      setDatatime([]);
      setDeleteHandler(false);
      setDeleteBooking(false);
    } else {
      setDeleteHandler(false);
      message.error(respose.data.message);
    }
  };

  const handleChangeViewData = (e) => {
    setBtnDisabled(false);
    const { name, value } = e.target;
    setViewData({ ...viewData, [name]: value });
  };

  const handleChangeStartTime = (e, d) => {
    setBtnDisabled(false);
    setViewData({ ...viewData, start: e?.$d });
  };

  const handleChangeEndTime = (e, d) => {
    setBtnDisabled(false);
    setViewData({ ...viewData, end: e?.$d });
  };

  const handleEdit = async (id) => {
    setUpdateLoading(true);
    let startTime = moment(viewData.start).format("hh:mm:ss");
    let endTime = dayjs(viewData.end).format("hh:mm:ss");
    // let dataarr = []
    // data.map((e,i)=>(
    //   dataarr.push(e.day)
    // ))
    setBtnDisabled(true);
    const response = await putApiWithAuth(`timetable/update-timeslot/${id}`, {
      timeslot: startTime,
      endslot: endTime,
      day: viewData.id,
      title: viewData.title,
    });
    if (response.data.success === true) {
      message.success("Booking Updated Successfully");
      setUpdateLoading(false);
      getCalanderData();
      setOpenViewBooking(false);
    }
    if (response.data.success === false) {
      message.error(response.data.message);
    }
  };
  function handleChange(value) {
    setSelectedTime(value);
  }

  function handleChange2(value) {
    setSelectedEndTime(value);
  }
  return (
    <>
      <div className="educationalGuidanceMainDiv">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="welcomeHaddingText pb-4">My Study Timetable</div>
          <Button
            className="viewResultButton"
            type="primary"
            loading={deleteHandler}
            onClick={handleDelete}
          >
            Reset all
          </Button>
        </div>
        {loading ? (
          <Spin className="spinStyle" />
        ) : (
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "",
              center: "",
              right: "",
            }}
            initialView={isMobile ? "timeGridDay" : "timeGridWeek"}
            events={calenderData}
            eventContent={renderEventContent} // this function print data
            eventClick={handleEventClick} //when we select data this function called
            select={handleDateSelect}
            selectable={true}
            allDaySlot={false}
            height="100vh"
            dayMaxEventRows={isMobile ? 1 : 5}
            dayHeaderContent={(args) => {
              const date = args.date;
              const dayOfWeek = date.toLocaleString("default", {
                weekday: "long",
              });
              return `${dayOfWeek}`;
            }}
            slotMinTime="06:00:00"
          />
        )}
      </div>

      <Modal
        className="modalStyleClass"
        bodyStyle={{
          background: "none",
          width: "97%",
        }}
        open={openBooking}
        onCancel={handleCloseBooking}
        footer={[]}
      >
        <div className="mt-5 pt-5 ps-2">
          <MyCareerGuidanceInputField
            placeholder="Add Title"
            type="input"
            name="full_name"
            onChange={(e) => setTitle(e.target.value)}
            inputValue={title}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Select
              placeholder="Select time"
              onChange={handleChange}
              value={selectedTime}
              className="inputFieldStyle"
            >
              {optionArray.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
            {/* <TimePicker
              onChange={(e) => setSelectedTime(e)}
              value={selectedTime}
              use12Hours={true}
              minuteStep={15}
              format="h:mm a"
              style={{ width: 200 }}
              className="inputFieldStyle"
            /> */}
            {/* <TimePicker
              onChange={(e) => setSelectedEndTime(e)}
              value={selectedEndTime}
              use12Hours={true}
              minuteStep={15}
              format="h:mm a"
              className="inputFieldStyle"
              style={{ width: 200 }}
            /> */}

            <Select
              placeholder="Select end Time"
              onChange={handleChange2}
              value={selectedEndTime}
              className="inputFieldStyle"
            >
              {optionArray.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>
          <div
            className="mt-3"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <MyCareerGuidanceButton
              label={"Create"}
              className="takebutton"
              type="button"
              htmlType="button"
              onClick={createNewEvent}
              loading={loadingBooking}
            />
          </div>
        </div>
      </Modal>

      <Modal
        className="modalStyleClass"
        bodyStyle={{
          background: "none",
          width: "97%",
        }}
        open={deleteBooking}
        onCancel={handleCloseBooking2}
        footer={[]}
      >
        <div className="mt-5 pt-5 ps-2">
          <div>
            <span className="warnText">
              Are you sure you want to Delete this?
            </span>
          </div>
          <div
            className="mt-3"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <MyCareerGuidanceButton
              label={"Cancel"}
              className="viewResultButton mr-2"
              type="button"
              htmlType="button"
              onClick={() => setDeleteBooking(false)}
            />
            <MyCareerGuidanceButton
              label={deleteHandler ? <Spin size="small" /> : "Delete"}
              className="takebutton deleteBtn"
              type="button"
              htmlType="button"
              onClick={() => {
                deleteCurrent(viewData.selectID);
              }}
              loading={loadingBooking}
            />
          </div>
        </div>
      </Modal>

      <Modal
        className="modalStyleClass"
        bodyStyle={{
          background: "none",
          width: "97%",
        }}
        open={openViewBooking}
        onCancel={handleCloseViewBooking}
        footer={[]}
      >
        <div className="mt-5 pt-5 ps-2">
          <MyCareerGuidanceInputField
            placeholder="Add Title"
            type="input"
            name="title"
            inputValue={viewData.title}
            onChange={handleChangeViewData}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <Select
              placeholder="Select time"
              onChange={(value) => {
                setBtnDisabled(false);
                setViewData({ ...viewData, start: value });
              }}
              value={dayjs(viewData.start).locale("en").format("hh:mm A")}
              className="inputFieldStyle"
            >
              {optionArray.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
            <Select
              placeholder="Select End time"
              onChange={(value) => {
                setBtnDisabled(false);
                setViewData({ ...viewData, end: value });
              }}
              value={dayjs(viewData.end).locale("en").format("hh:mm A")}
              className="inputFieldStyle"
            >
              {optionArray.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
            {/* <TimePicker
              value={dayjs(viewData.start)}
              use12Hours={true}
              minuteStep={15}
              format="h:mm a"
              style={{ width: 200 }}
              className="inputFieldStyle"
              onChange={(e, s) => handleChangeStartTime(e, s)}
            />
            <TimePicker
              value={dayjs(viewData.end)}
              use12Hours={true}
              minuteStep={15}
              format="h:mm a"
              className="inputFieldStyle"
              style={{ width: 200 }}
              onChange={(e, d) => handleChangeEndTime(e, d)}
            /> */}
          </div>
          <div
            className="mt-3"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <MyCareerGuidanceButton
              label={"Delete"}
              className="takebutton deleteBtn"
              type="button"
              htmlType="button"
              onClick={() => {
                setOpenViewBooking(false);
                setDeleteBooking(true);
              }}
              loading={loadingBooking}
            />
            <MyCareerGuidanceButton
              label={updateLoading ? <Spin size="small" /> : "Edit"}
              disabled={btnDisabled}
              className={
                btnDisabled ? "disabledBtnStyle" : "viewResultButton editBtn"
              }
              type="button"
              htmlType="button"
              onClick={() => handleEdit(viewData.selectID)}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MyStudy;
