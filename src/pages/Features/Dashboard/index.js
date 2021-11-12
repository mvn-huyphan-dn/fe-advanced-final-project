import { PageHeader, Space, Divider, Button, Tooltip } from "antd"
import { Calendar } from '../../../components'
import { useSelector, useDispatch } from "react-redux"
import dayjs from "dayjs"
import React, { useEffect } from 'react'
import { getEmployeeList } from '../../../features/employee/employeeSlice';
import { setLoadingFalse } from '../../../features/loading/loadingSlice';
import { birthFormat, dateFormat } from "../../../core/constants"
import { AiOutlineUnorderedList, AiOutlineUserAdd } from 'react-icons/ai'
import { HiOutlineCake, HiOutlineOfficeBuilding } from "react-icons/hi";
import { IoAirplaneOutline } from "react-icons/io5";
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
    const dayInMonth = dayjs().daysInMonth()
    for (let i = 0; i <= 11; i++) {
      for (let j = 1; j <= dayInMonth; j++) {
        if (value.month() === i && value.date() === j) {
          let birth = [];
          let listStartVacation = []
          let listEndVacation = []
          employeeData.forEach(item => {
            if (dayjs(item.birth, birthFormat).day() === j
              && dayjs(item.birth, birthFormat).month() === i)
              birth.push(item.id);
            if (dayjs(item.startDate, dateFormat).day() === j
              && dayjs(item.startDate, dateFormat).month() === i)
              listStartVacation.push(item.id)
            if (dayjs(item.endDate, dateFormat).day() === j
              && dayjs(item.startDate, dateFormat).month() === i)
              listEndVacation.push(item.id)
          })
          listData = {
            birth,
            listStartVacation,
            listEndVacation
          }
        }
      }
    }
    return listData || {};
  }

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events flex-column">
        {listData ?
          <>
            {listData.birth && listData.birth.length ?
              <li className='flex align-center'><HiOutlineCake /> <span className='cell-count'>{listData.birth.length}</span> </li>
              : null}
            {listData.listStartVacation && listData.listStartVacation.length ?
              <li className='flex align-center'><IoAirplaneOutline /> <span className='cell-count'>{listData.listStartVacation.length}</span> </li>
              : null}
            {listData.listEndVacation && listData.listEndVacation.length ?
              <li className='flex align-center'><HiOutlineOfficeBuilding /> <span className='cell-count'>{listData.listEndVacation.length}</span>  </li>
              : null}
          </>
          :
          null}
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
          <HiOutlineCake /> <span>Birthday</span>
        </div>
        <div className='flex align-center'>
          <IoAirplaneOutline /> <span>Go on vacation</span>
        </div>
        <div className='flex align-center'>
          <HiOutlineOfficeBuilding /> <span>Back from vacation</span>
        </div>
      </Space>
      <Calendar
        className='calendar'
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        validRange={[dayjs().subtract(2, 'year').set('date', 1).set('month', 1), dayjs().add(2, 'year').set('date', 31).set('month', 12)]}
      />
    </div>
  )
}
