import add from "../../assets/add.svg";
import React, { useEffect, useState } from "react";
import { API_URL } from "../../utils/constants";
import { getApiWithAuth, postApiWithAuth,patchApiWithAuth, deleteApiWithAuth } from "../../utils/api";
import {
  MyCareerGuidanceButton,
  MyCareerGuidanceInputField,
} from "../../components/commonComponents";
import { Modal, Select, Image } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { Space, Table, Row, Col, message, Form } from "antd";
const { Column, ColumnGroup } = Table;
const optionsItem = [
  {
    key: "1",
    label: "Edit",
  },
  {
    key: "2",
    label: "Delete",
  },
];
const MyChoicesEdit = () => {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const location = useLocation();
  const { dataa } = location.state || {};
  const [loadingFirst, setLoadingFirst] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columns, setColums] = useState([]);
  const [data, setData] = useState([]);
  const [editDataRow, setEditDataRow] = useState({});
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);
  const [addDataRow, setAddDataRow] = useState({});

  useEffect(() => {
    getChoiceRecord();
    getTableRecord();
  }, [dataa]);

  const getChoiceRecord = async () => {
    setLoadingFirst(true);
    const response = await getApiWithAuth(
      `choices/column-names/?choice=${dataa.id}`
    );
    if (response.data.status === 200) {
      setColums(response.data.data);
      setLoadingFirst(false);
    } else {
      setLoadingFirst(false);
    }
  };

  const getTableRecord = async () => {
    const response = await getApiWithAuth(`choices/${dataa.id}/`);
    if (response.data.status === 200) {
      setData(response.data.data);
      setLoadingFirst(false);
    } else {
      setLoadingFirst(false);
    }
  };

  const showModalAdd = () => {
    setIsModalAddOpen(true);
  };
  const handleCancelAdd = () => {
    form.resetFields();
    setAddDataRow({})
    setIsModalAddOpen(false);

  };
  const showModal = (record) => {
    setEditDataRow(record);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditDataRow({ ...editDataRow, [name]: value });
  };
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setAddDataRow({ ...addDataRow, [name]: value });
  };
  const handleUpdate = async () => {
    const respose = await patchApiWithAuth(`choices/update-${dataa.id}/${editDataRow.id}/`, editDataRow);

    if (respose.data.status === 200) {
      message.success("Row update succesfully");
      form2.resetFields();
      setEditDataRow({})
      getChoiceRecord();
      getTableRecord();
      handleCancel()
    } else {
       message.error(respose.data.message);
    }

 
  };
  const handleDelete = async (item) => {
    const respose = await deleteApiWithAuth(`choices/delete-${dataa.id}/${item.id}/`);
    if (respose.data.status === 204) {
      message.success("Row delete succesfully");
      getChoiceRecord();
      getTableRecord();
    } else {
       message.error(respose.data.message);
    }
  };
  const handleAddRow = async (e) => {
    const respose = await postApiWithAuth(`choices/${dataa.id}/`, addDataRow);
    if (respose.data.status === 200) {
      message.success("Row add succesfully");

      getChoiceRecord();
      getTableRecord();
      handleCancelAdd();
     
    } else {
       message.error(respose.data.message);
    }

  
  };
  return (
    <>
      <div className="caoMainDiv">
        <div style={{ background: "white" }}>
          <div className="coaInnerf8fafcDiv">
            <div className="welcomeHaddingText py-3">{dataa.name}</div>
            <div className="w-100 p-3">
              <div className="w-100">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="welcomeHaddingText">Maintain your Record</div>
                  <MyCareerGuidanceButton
                    label="+ Add New Row"
                    className="logoutButton"
                    type="primary"
                    htmlType="button"
                    onClick={showModalAdd}
                  />
                </div>
                {/*  */}

                <Table pagination={false} dataSource={data}>
                  {columns.map((item) => {
                    return <Column title={item} dataIndex={item} key={item} />;
                  })}
                  <Column
                    title="Object"
                    key="Object"
                    dataIndex={"Object"}
                    render={(_, record) => (
                      <Space size="middle">
                        <a onClick={() => showModal(record)}>Edit</a>
                        <a onClick={() => handleDelete(record)}>Delete</a>
                      </Space>
                    )}
                  />
                  {/* <Column
                  title={"Object"}
                  dataIndex={"Object"}
                  key={"Object"}
                  render={() => (
                    <Space size="middle">
                      <Dropdown
                        menu={{
                          optionsItem,
                        }}
                      >
                        <a>...</a>
                      </Dropdown>
                    </Space>
                  )}
                /> */}
                </Table>
                {/*  */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="modalStyleClass2"
        width={800}
        bodyStyle={{
          background: "none",
          display: "flex",
          justifyContent: "center",
        }}
        open={isModalOpen}
        footer={[]}
        title={
          <div style={{ display: "flex", justifyContent: "center" }}>Edit</div>
        }
        visible={true}
        onCancel={handleCancel}
      >
        <Form layout="vertical" onFinish={handleUpdate} form={form2}>
          <Row gutter={[16, 0]} justify="center" className="mt-4">
            {Object.keys(editDataRow).map((item, index) => {
              if (item !== "id" && item!== 'choice') {
                return (
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={item}
                      name={`${item} ${index}`}
                      className="eduItemLable"
                      rules={[
                        {
                          required: editDataRow[item] ? false : true,
                          message: `Please input your ${item}!`,
                        },
                      ]}
                    >
                      <MyCareerGuidanceInputField
                        placeholder={item}
                        type="input"
                        name={item}
                        onChange={(e) => handleChange(e)}
                        inputValue={editDataRow[item]}
                        isPrefix={false}
                      />
                    </Form.Item>
                  </Col>
                );
              }
            })}
          </Row>
          <div className="mt-5" style={{ display: "flex" }}>
            <MyCareerGuidanceButton
              label="Save"
              className="takebutton"
              type="primary"
              htmlType="submit"
            />
            <MyCareerGuidanceButton
              label="Cancel"
              className="viewResultButton"
              type="button"
              htmlType="button"
              onClick={handleCancel}
            />
          </div>
        </Form>
      </Modal>

      <Modal
        className="modalStyleClass2"
        width={800}
        bodyStyle={{
          background: "none",
          display: "flex",
          justifyContent: "center",
        }}
        open={isModalAddOpen}
        footer={[]}
        title={
          <div style={{ display: "flex", justifyContent: "center" }}>
            Add New
          </div>
        }
        visible={true}
        onCancel={handleCancelAdd}
      >
        <Form layout="vertical" onFinish={handleAddRow} form={form}>
          <Row gutter={[16, 0]} justify="center" className="mt-4">
            {columns.map((item, index) => {
              if (item !== "id") {
                return (
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={item}
                      name={`${item} ${index}`}
                      className="eduItemLable"
                      rules={[
                        {
                          required: true,
                          message: `Please input your ${item}!`,
                        },
                      ]}
                    >
                      <MyCareerGuidanceInputField
                        placeholder={item}
                        type="input"
                        name={item}
                        onChange={(e) => handleChange2(e)}
                        inputValue={addDataRow[item]}
                        isPrefix={false}
                      />
                    </Form.Item>
                  </Col>
                );
              }
            })}
          </Row>
          <div className="mt-5" style={{ display: "flex" }}>
            <MyCareerGuidanceButton
              label="Save"
              className="takebutton"
              type="primary"
              htmlType="submit"
            />
            <MyCareerGuidanceButton
              label="Cancel"
              className="viewResultButton"
              type="button"
              htmlType="button"
              onClick={handleCancelAdd}
            />
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default MyChoicesEdit;
