import { Button, Space, Table, Tooltip, PageHeader, Modal } from 'antd'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { equipmentList, defaultEmployeeList, employeeJob, employeeGender, employeeStatus, defaultAvatar } from '../../../core/constants';
import { useSelector, useDispatch } from "react-redux"
import { getEmployeeList, deleteEmployee, deleteMultipleEmployees } from '../../../features/employee/employeeSlice';
import { setLoadingTrue, setLoadingFalse } from '../../../features/loading/loadingSlice';
import { GenerateTag, openNotification } from '../../../utils';

import dayjs from 'dayjs';

const { confirm } = Modal

export default function Employees() {
  const data = useSelector(state => state.employee.employeeList)
  const loading = useSelector(state => state.loading.loading)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(getEmployeeList({}))
      dispatch(setLoadingFalse({}))
    }, 3000);
  }, [dispatch])

  const handleDelete = (e) => {
    confirm({
      title: 'Are you sure you want to delete this employee?',
      content: 'Press YES button to remove item from database! This action cannot be undone',
      okText: 'Yes',
      okType: 'danger primary',
      cancelText: 'No',
      onOk() {
        dispatch(setLoadingTrue({ tip: 'Loading database...' }))
        setTimeout(() => {
          dispatch(deleteEmployee(e))
          dispatch(setLoadingFalse({}))
          if (selectedRowKeys.includes(e)) setSelectedRowKeys(selectedRowKeys.filter(a => a !== e))
          openNotification('success', null, 'Delete employee successfully!!!')
        }, 2000);
      },
    });
  }

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: obj =>
        <div className='avatar-table-wrapper flex-center'>
          {obj ? <img src={obj} alt='avatar' />
            : <img src={defaultAvatar} alt='avatar' />}
        </div>
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: obj => employeeGender[employeeGender.findIndex(e => e.id === obj)]["name"],
      sorter: (a, b) => a.gender - b.gender,
      filters: [
        { text: 'Male', value: 1 },
        { text: 'Female', value: 2 }
      ],
      onFilter: (value, record) => record.gender === value,
    },
    {
      title: 'Birth',
      dataIndex: 'birth',
      key: 'birth',
      sorter: (a, b) => dayjs(a.birth) - dayjs(b.birth),
      filters: [
        { text: 'January', value: 0 },
        { text: 'February', value: 1 },
        { text: 'March', value: 2 },
        { text: 'April', value: 3 },
        { text: 'May', value: 4 },
        { text: 'June', value: 5 },
        { text: 'July', value: 6 },
        { text: 'August', value: 7 },
        { text: 'September', value: 8 },
        { text: 'October', value: 9 },
        { text: 'November', value: 10 },
        { text: 'December', value: 11 },
      ],
      onFilter: (value, record) => dayjs(record.birth).get('month') === value,
    },
    {
      title: 'Job',
      dataIndex: 'job',
      key: 'job',
      render: obj => employeeJob[employeeJob.findIndex(e => e.id === obj)]["name"],
      sorter: (a, b) => a.job - b.job,
      filters: [
        { text: 'FE Engineer', value: 1 },
        { text: 'PHP Engineer', value: 2 },
        { text: 'Mobile Developer', value: 3 },
        { text: 'Infra Engineer', value: 4 },
        { text: 'QC & Tester Engineer', value: 5 }
      ],
      onFilter: (value, record) => record.job === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: obj =>
        obj ? GenerateTag(employeeStatus[employeeStatus.findIndex(e => e.id === obj)]["name"]) : ""
      ,
      sorter: (a, b) => a.status - b.status,
      filters: [
        { text: 'NEW', value: 1 },
        { text: 'WORKING', value: 2 },
        { text: 'VACATION', value: 3 },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Equipment',
      dataIndex: 'equipment',
      key: 'equipment',
      render: object => object.length !== 0 ?
        object.map(e =>
          <div key={`acc.${e}`}>{equipmentList[equipmentList.findIndex(a => a.id === e)]["name"]}</div>
        )
        : 'None'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) =>
        <Space onClick={(e) => e.stopPropagation()}>
          <Link to={`/employees/${record.id}`}>
            <Button type='default'>View</Button>
          </Link>
          <Link to={`/edit-employee/${record.id}`}>
            <Button type='default'>Edit</Button>
          </Link>
          <Button danger type='primary' onClick={() => handleDelete(record.id)}>Delete</Button>
        </Space>
    }
  ];

  const selectRow = (record) => {
    const selectedRowKeys1 = [...selectedRowKeys];
    if (selectedRowKeys1.indexOf(record.id) >= 0) {
      selectedRowKeys1.splice(selectedRowKeys1.indexOf(record.id), 1);
    } else {
      selectedRowKeys1.push(record.id);
    }
    setSelectedRowKeys(selectedRowKeys1);
  }

  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;
  const handleDeleteMultiple = (e) => {
    confirm({
      title: 'Are you sure you want to delete these employees?',
      content: 'Press YES button to remove items from database! This action cannot be undone',
      okText: 'Yes',
      okType: 'danger primary',
      cancelText: 'No',
      onOk() {
        dispatch(setLoadingTrue({}))
        setTimeout(() => {
          dispatch(deleteMultipleEmployees(e))
          dispatch(setLoadingFalse({}))
          setSelectedRowKeys([])
          openNotification('success', null, 'Delete employees successfully!!!')
        }, 2000);
      },
    });
  }

  const loadDefaultDatabase = () => {
    localStorage.setItem('employee', JSON.stringify(defaultEmployeeList))
    dispatch(getEmployeeList({}))
  }

  return (
    <div className='page-employees'>
      <div className='div-wrapper flex'>
        <div className='loaddb-wrapper'>
          <Button
            type="primary"
            style={{ display: 'none' }}
          >
            LDB
          </Button>
        </div>
        <PageHeader
          className="content-page-header flex-center"
          title='EMPLOYEES LIST'
        ></PageHeader>
        <div className='loaddb-wrapper'>
          <div className='loaddb-inner'>
            <Tooltip
              placement="topLeft"
              title='Load default database'>
              <Button
                className='loaddb-button'
                type="primary"
                onClick={() => loadDefaultDatabase()}
              >
                LDB
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={{
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          position: ['bottomCenter'],
          showSizeChanger: true,
          showQuickJumper: true
        }}
        loading={{ spinning: loading.loading, delay: 500, tip: loading.tip }}
        rowSelection={rowSelection}
        onRow={(record) =>
        ({
          onClick: () => {
            selectRow(record);
          },
        })
        }
        title={() =>
          <div className='prop-list flex'>
            <Button
              danger
              type="primary"
              style={{ display: hasSelected ? 'unset' : 'none' }}
              onClick={() => handleDeleteMultiple(selectedRowKeys)}>
              Delete
            </Button>
            <span className='number-span flex-center'>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>
            <Link to='/add-employee' className='add-button-wrapper'>
              <Button
                type="primary"
              >
                Add Employee
              </Button>
            </Link>

          </div>}
        expandable={{
          // expandRowByClick: true,
          expandedRowRender: record => <p className='vacation-period'>Going vacation from {record.startDate} to {record.endDate}</p>,
          rowExpandable: record => record.status === 3,
        }}
      />
    </div>
  )
}
