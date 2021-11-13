import { PageHeader, Space, Divider, Button, Tooltip, Badge } from "antd"
import { Calendar } from '../../../components'
import { useSelector, useDispatch } from "react-redux"
import dayjs from "dayjs"
import React, { useEffect } from 'react'
import { getEmployeeList } from '../../../features/employee/employeeSlice';
import { setLoadingFalse } from '../../../features/loading/loadingSlice';
import { AiOutlineUnorderedList, AiOutlineUserAdd } from 'react-icons/ai'
import { RiCakeLine } from "react-icons/ri";
import { IoAirplaneOutline } from "react-icons/io5";
import { FiBriefcase } from "react-icons/fi"
import { Link } from "react-router-dom"

export default function Dashboard() {
  const employeeData = useSelector(state => state.employee.employeeList)
  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(getEmployeeList({}))
      dispatch(setLoadingFalse({}))
    }, 3000);
  }, [dispatch])

  function getListData(value) {
    let listData;
    let birth = [];
    let listStartVacation = []
    let listEndVacation = []
    employeeData.forEach(item => {
      if (dayjs(item.birth).get('date') === value.date()
        && dayjs(item.birth).get('month') === value.month())
        birth.push(item.id);
      if (dayjs(item.startDate).get('date') === value.date()
        && dayjs(item.startDate).get('month') === value.month()
        && dayjs(item.startDate).get('year') === value.year())
        listStartVacation.push(item.id)
      if (dayjs(item.endDate).get('date') === value.date()
        && dayjs(item.endDate).get('month') === value.month()
        && dayjs(item.endDate).get('year') === value.year())
        listEndVacation.push(item.id)
    })
    listData = {
      birth,
      listStartVacation,
      listEndVacation
    }
    return listData || {};
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events flex">
        {listData ?
          <>
            {listData.birth && listData.birth.length ?
              <Tooltip
                placement='top'
                color='blue'
                title={
                  listData.birth.map(e => {
                    return (
                      <div key={`birth-${e}`}>{employeeData[employeeData.findIndex(a => a.id === e)]["name"]}</div>
                    )
                  })
                }>
                <Badge
                  count={listData.birth.length}
                  offset={[-5, 5]}
                  overflowCount={99}>
                  <li className='event-item flex-center'><RiCakeLine className='event-icon' /></li>
                </Badge>
              </Tooltip>
              : null}
            {listData.listStartVacation && listData.listStartVacation.length ?
              <Tooltip
                placement='top'
                color='red'
                title={
                  listData.listStartVacation.map(e => {
                    return (
                      <div key={`start-${e}`}>{employeeData[employeeData.findIndex(a => a.id === e)]["name"]}</div>
                    )
                  })
                }>
                <Badge
                  count={listData.listStartVacation.length}
                  offset={[-5, 5]}
                  overflowCount={99}>
                  <li className='event-item flex-center'><IoAirplaneOutline className='event-icon' /></li>
                </Badge>
              </Tooltip>
              : null}
            {listData.listEndVacation && listData.listEndVacation.length ?
              <Tooltip
                placement='top'
                color='green'
                title={
                  listData.listEndVacation.map(e => {
                    return (
                      <div key={`end-${e}`}>{employeeData[employeeData.findIndex(a => a.id === e)]["name"]}</div>
                    )
                  })
                }>
                <Badge
                  count={listData.listEndVacation.length}
                  offset={[-5, 5]}
                  overflowCount={99}>
                  <li className='event-item flex-center'><FiBriefcase className='event-icon' /></li>
                </Badge>
              </Tooltip>
              : null}
          </>
          :
          null
        }
      </ul>
    );
  }

  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }

  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

  return (
    <div className='page-dashboard flex-column'>
      <PageHeader
        className="content-page-header flex-center"
        title='DASHBOARD'>
      </PageHeader>
      <Space className='button-navi-list flex-center' split={<Divider type="vertical" />}>
        <Link className='button-wrapper' to='/employees'>
          <Tooltip placement="top" title='List employee'>
            <Button className='navi-button flex-center'>
              <AiOutlineUnorderedList />
            </Button>
          </Tooltip>
        </Link>
        <Link className='button-wrapper' to='/add-employee'>
          <Tooltip placement="top" title='List employee'>
            <Button className='navi-button flex-center'>
              <AiOutlineUserAdd />
            </Button>
          </Tooltip>
        </Link>
      </Space>
      <Space className='calendar-note flex-center' split={<Divider type="vertical" />}>
        <div className='flex align-center'>
          <RiCakeLine /> <span>Birthday</span>
        </div>
        <div className='flex align-center'>
          <IoAirplaneOutline /> <span>Go on vacation</span>
        </div>
        <div className='flex align-center'>
          <FiBriefcase /> <span>Back from vacation</span>
        </div>
      </Space>
      <Calendar
        className='calendar'
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
      />
    </div>
  )
}
