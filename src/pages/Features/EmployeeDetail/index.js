import { Card, Avatar, List, Divider, PageHeader, Row, Col } from 'antd';
import { useParams } from 'react-router';
import { AiOutlineEdit } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { setLoadingFalse, setLoadingTrue } from '../../../features/loading/loadingSlice';
import { defaultAvatar, employeeGender, employeeJob, employeeStatus, equipmentList } from '../../../core/constants';
import { GenerateTag } from '../../../utils';
import equipmentImg from '../../../assets/images/equipment'
import { Link } from 'react-router-dom'

const { Meta } = Card;

export default function EmployeeDetail() {
  const loading = useSelector(state => state.loading.loading)
  let params = useParams();
  const dispatch = useDispatch()
  const [employee, setEmployee] = useState({})
  const history = useHistory()
  const [activeTabKey, setActiveTabKey] = useState('job');
  const [equipmentData, setEquipmentData] = useState([])
  const onTabChange = key => {
    setActiveTabKey(key);
  };

  useEffect(() => {
    dispatch(setLoadingTrue({ tip: 'Loading...' }))
    const response = JSON.parse(localStorage.getItem('employee'))
    const index = response ? response.findIndex(e => e.id === +params.employeeId) : -1;
    if (response && index !== -1) {
      const item = response[index]
      setTimeout(() => {
        setEmployee(item)
        dispatch(setLoadingFalse({}))
      }, 3000);
    } else {
      history.replace('/404')
    }
  }, [params, dispatch, history])

  useEffect(() => {
    let tempData = []
    if (employee && employee.equipment && employee.equipment.length !== 0) {
      employee.equipment.forEach(e => {
        tempData.push(
          {
            title: `${equipmentList[equipmentList.findIndex(a => a.id === e)]["name"]}`
          })
      })
    }
    setEquipmentData(tempData)
  }, [employee])

  const tabList = [
    {
      key: 'job',
      tab: 'Job',
    },
    {
      key: 'status',
      tab: 'Status',
    },
    {
      key: 'equipment',
      tab: 'Equipment',
    }
  ];

  const contentList = {
    job: <p className='tab-content'>{employee.job ? employeeJob[employeeJob.findIndex(e => e.id === employee.job)]["name"] : null}</p>,
    status:
      <div className='flex-column'>
        <div className='card-status'>
          {employee.status ? GenerateTag(employeeStatus[employeeStatus.findIndex(e => e.id === employee.status)]["name"]) : ""}
        </div>
        {employee.status === 3 ?
          <div className='txt-center'>
            <Divider>From: </Divider>
            <p>
              {employee.startDate}
            </p>
            <Divider>To: </Divider>
            <p>
              {employee.endDate}
            </p>
          </div>
          : null
        }
      </div>
    ,
    equipment:
      <div className='equipment-tab'>
        {employee ?
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={equipmentData}
            renderItem={item => {
              let img = {}
              switch (item.title) {
                case 'Macbook':
                  img = equipmentImg.mac
                  break;
                case 'Windows Laptop':
                  img = equipmentImg.wlap
                  break;
                case 'iPhone':
                  img = equipmentImg.iphone
                  break;
                default:
                  img = equipmentImg.aphone
                  break;
              }
              return (
                <List.Item>
                  <Card
                    className='equipment-wrapper'
                    cover={
                      <img
                        alt="equipment cover"
                        src={img} />
                    }
                  >
                    <Meta title={item.title} />
                  </Card>
                </List.Item>
              )
            }
            }
          />
          :
          <div className='txt-center'>None</div>
        }
      </div>
  };

  return (
    <div className='page-employee-detail flex-center flex-column'>
      <PageHeader
        className="content-page-header flex-center"
        title='EMPLOYEE DETAIL'>
      </PageHeader>
      <Card
        headStyle={{ padding: '30px' }}
        loading={loading.loading}
        className='card-employee'
        tabList={tabList}
        title={
          <Meta
            className='card-cover'
            avatar={
              <Avatar
                className='cover-avatar-wrapper'
                src={employee.avatar ? employee.avatar : defaultAvatar}
                shape="square"
                size={200} />
            }
            description={
              <div
                className='cover-description'>
                <Row>
                  <Col span={12}>
                    <List.Item.Meta
                      className='list-item-description'
                      title={<div className='item-title'>Name: </div>}
                      description={<div className='item-description'>{employee.name}</div>}
                    />
                    <List.Item.Meta
                      className='list-item-description'
                      title={<div className='item-title'>Birth: </div>}
                      description={<div className='item-description'>{employee.birth} </div>}
                    />
                    <List.Item.Meta
                      className='list-item-description'
                      title={<div className='item-title'>Gender:  </div>}
                      description={
                        <div className='item-description'>
                          {employee.gender ? employeeGender[employeeGender.findIndex(e => e.id === employee.gender)]["name"] : ""}
                        </div>
                      }
                    />
                  </Col>
                  <Col span={12}>
                    <List.Item.Meta
                      title={<div className='item-title'>Email: </div>}
                      description={<div className='item-description'>{employee.email}</div>}
                    />
                  </Col>
                </Row>
              </div>
            }
          />
        }
        actions={[
          <Link to={`/edit-employee/${+employee.id}`}>
            <AiOutlineEdit key="edit" />,
          </Link>
        ]}
        onTabChange={key => {
          onTabChange(key)
        }}
      >
        <div className='card-content flex-center txt-center'>
          {employee ? contentList[activeTabKey] : ""}
        </div>
      </Card>
    </div>
  )
}
